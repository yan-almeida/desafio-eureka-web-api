import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ClearEverythingNotNumber implements PipeTransform {
  transform(value: any) {
    return value.replace(/\D+/g, '');
  }
}
