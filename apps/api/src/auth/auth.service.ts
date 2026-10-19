import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, randomBytes } from 'node:crypto';
import { UserRole } from '../generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './password.service';
import { AuthenticatedUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwords: PasswordService,
  ) {}

  async register(input: RegisterDto) {
    const email = input.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });

    if (existing) {
      throw new ConflictException('El correo ya está registrado');
    }

    const passwordHash = await this.passwords.hash(input.password);
    const user = await this.prisma.user.create({
      data: {
        email,
        fullName: input.fullName.trim(),
        passwordHash,
        roles: { create: { role: UserRole.STUDENT } },
      },
    });

    return this.createSession(user.id);
  }

  async login(input: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.trim().toLowerCase() },
    });

    if (
      !user ||
      !user.isActive ||
      !(await this.passwords.verify(input.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.createSession(user.id);
  }

  async authenticate(rawToken: string): Promise<AuthenticatedUser> {
    const session = await this.prisma.userSession.findUnique({
      where: { tokenHash: this.hashToken(rawToken) },
      include: { user: { include: { roles: true } } },
    });

    if (
      !session ||
      session.revokedAt ||
      session.expiresAt <= new Date() ||
      !session.user.isActive
    ) {
      throw new UnauthorizedException('Sesión inválida o vencida');
    }

    return {
      id: session.user.id,
      email: session.user.email,
      fullName: session.user.fullName,
      roles: session.user.roles.map(({ role }) => role),
      sessionId: session.id,
    };
  }

  async logout(sessionId: string): Promise<void> {
    await this.prisma.userSession.updateMany({
      where: { id: sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  private async createSession(userId: string) {
    const rawToken = randomBytes(32).toString('base64url');
    const ttlDays = Number(process.env.SESSION_TTL_DAYS ?? 30);
    const expiresAt = new Date(Date.now() + ttlDays * 86_400_000);

    const session = await this.prisma.userSession.create({
      data: {
        userId,
        tokenHash: this.hashToken(rawToken),
        expiresAt,
      },
      include: { user: { include: { roles: true } } },
    });

    return {
      token: rawToken,
      expiresAt,
      user: {
        id: session.user.id,
        email: session.user.email,
        fullName: session.user.fullName,
        roles: session.user.roles.map(({ role }) => role),
      },
    };
  }

  private hashToken(rawToken: string): string {
    return createHash('sha256').update(rawToken).digest('hex');
  }
}
