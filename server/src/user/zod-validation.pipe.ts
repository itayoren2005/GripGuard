import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private _schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this._schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException({
          message: error.errors[0].message,
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}
