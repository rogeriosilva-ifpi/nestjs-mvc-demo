import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthenticatedUserMiddleware implements NestMiddleware {
  use(req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
      res.locals.isLoggedIn = true;
    }
    next();
  }
}
