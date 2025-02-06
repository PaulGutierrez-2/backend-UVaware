import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';  // Asegúrate de importar esto

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: { email: string; password: string }, res: Response) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (!admin) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

    const token = this.jwtService.sign({ id: admin.idadmin, email: admin.email });

    // Guardar token en una cookie HTTP-only y segura
    res.cookie('token', token, {
      httpOnly: false, // Asegura que la cookie no sea accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Usa HTTPS en producción
      sameSite: 'lax', // Importante para evitar bloqueos en navegadores modernos
      maxAge: 3600000, // 1 hora (ajusta según sea necesario)
    });

    return res.json({ message: 'Login successful' });
  }

  async logout(res: Response) {
    // Elimina el token de la cookie cuando el usuario cierre sesión
    res.clearCookie('token'); // Borra la cookie 'token'
    res.clearCookie('PHPSESSID'); // Borra cualquier otra cookie de sesión

    return res.json({ message: 'Logged out successfully' });
  }
}

