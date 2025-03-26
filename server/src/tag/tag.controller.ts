import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { Distances } from './dto/distances.dto';
import { TagService } from './tag.service';
import { TagGateway } from './gateway';
import { TriangleLengthDto } from './dto/triangleLength.dto';
import { TagEnableGuard } from './tag.guard';

@Controller('tag')
export class TagController {
  constructor(
    private _tagService: TagService,
    private _tagGateway: TagGateway,
  ) {}

  @UseGuards(TagEnableGuard)
  @Post()
  calcSolider(@Body() distances: Distances) {
    const position = this._tagService.calcSolider(distances);
    this._tagService.pushPositionToList(position);
    this._tagGateway.sendPosition(position);

    const isAiming = this._tagService.isAiming();
    this._tagGateway.sendAlerts(this._tagService.getAlerts());
    if (isAiming) {
      this._tagService.createIncident();
    }
  }

  @Post('/length')
  setTriangleLength(@Body() { triangleLength }: TriangleLengthDto) {
    this._tagGateway.sendPosition(
      this._tagService.updatePositionToTringleLength(
        this._tagService.findLastPosition(1),
        triangleLength,
      ),
    );
    this._tagGateway.sendPosition(
      this._tagService.updatePositionToTringleLength(
        this._tagService.findLastPosition(2),
        triangleLength,
      ),
    );
    this._tagService.triangleLength = triangleLength;
  }

  @Post('/reset')
  setReset(): void {
    this._tagService.resetIncidentArray();
  }

  @Get('alert/:id')
  getIncidentsByDate(@Param('id') id: string) {
    return this._tagService.alertTag(Number(id));
  }
}
