import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/user/models/user.model';

@Controller()
export class DashboardController {
  @Get('/dashboard')
  dashboard(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json({ message : 'Unauthorized'});
    }

    const { role } = user;
    if (role === 'admin' || role === 'manager') {
      return res.redirect('/dashboard');
    } else if (role === 'client') {
      return res.redirect('/dashboard-client');
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}