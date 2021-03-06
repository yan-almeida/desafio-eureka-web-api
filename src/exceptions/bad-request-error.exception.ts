import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  constructor(entityClassName: any, criterio: string | number) {
    super(
      `Dado já existente na entidade ${entityClassName.name}. Criterio: ${criterio}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
