import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {error} from '@apap/messages';
import { Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response
    .status(status)
      .json(
        error({
          code:'500',
          message:'ocurrio un error interno en la ruta',
          errors:[
            {
              details: JSON.stringify(exception),
              message:'ocurrio un error interno con la peticion'
            },
          ],
        }),
      );
  }
}
