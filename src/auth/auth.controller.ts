import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';  // 👈 Asegúrate de importar esto

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }, @Res() res: Response) {
    const result = await this.authService.login(loginDto, res);
    return res.send(result);  // 👈 Asegura que la respuesta se envía correctamente
  }
  
  @Post('logout')
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}


   