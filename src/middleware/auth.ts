import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const config = require('config');
const jwt = require('jsonwebtoken');

@Injectable()
export class authMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token,authorization denied' });
    }
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      req.user = decoded.user;
      console.log('req.user', req.user);
    } catch (error) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    next();
  }
}
