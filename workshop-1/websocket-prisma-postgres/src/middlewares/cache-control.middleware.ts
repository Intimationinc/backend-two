// src/middleware/cache-control.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CacheControlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('req path', req.originalUrl);
    // Check if the request is for user-related routes
    if (req.originalUrl.startsWith('/users')) {
      // Set headers for users routes
      res.set('Cache-Control', 'public, max-age=300'); // Cache user data for 5 minutes
    } else {
      // Default cache control
      res.set('Cache-Control', 'no-store'); // No caching for other routes
    }

    next();
  }
}
