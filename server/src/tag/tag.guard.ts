import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RifleRepository } from 'src/rifle/rifle.repository';

@Injectable()
export class TagEnableGuard implements CanActivate {
  constructor(private readonly _rifleRepository: RifleRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const rifleId = request.body.tagId;

    if (!rifleId) {
      throw new ForbiddenException('Unknown tag');
    }

    const rifle = await this._rifleRepository.findOne(rifleId);

    if (!rifle || !rifle.enable) {
      throw new ForbiddenException('The tag is disabled.');
    }

    return true;
  }
}
