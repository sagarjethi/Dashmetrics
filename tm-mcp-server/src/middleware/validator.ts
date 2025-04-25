import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '@/middleware/errorHandler';

export function validateRequest(schema: z.ZodType<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.query);
      req.query = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
        next(new AppError(400, `Validation error: ${errorMessage}`));
      } else {
        next(error);
      }
    }
  };
} 