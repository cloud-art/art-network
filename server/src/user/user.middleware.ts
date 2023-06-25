import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class updateTokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.method === 'Options') next();
        try {
            const accessToken = (req.headers as any).authorization.split(' ')[1];
            if (!accessToken) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.UNAUTHORIZED,
                        message: 'Пользователь не авторизован'
                    },
                    HttpStatus.UNAUTHORIZED
                );
            }
            const user = jwt.verify(accessToken, 'secretKey');
            (req.body as any) = user;
            next();
        } catch (e) {
            console.log(e);
            throw new HttpException(
                {
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: 'Пользователь не авторизован'
                },
                HttpStatus.UNAUTHORIZED
            );
        }
    }
}
