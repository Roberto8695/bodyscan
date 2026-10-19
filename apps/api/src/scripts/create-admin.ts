import 'dotenv/config';
import { UserRole } from '../generated/prisma/client';
import { PasswordService } from '../auth/password.service';
import { PrismaService } from '../database/prisma.service';

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const fullName = process.env.ADMIN_FULL_NAME?.trim() || 'Administrador';

  if (!email || !password || password.length < 8) {
    throw new Error(
      'Configura ADMIN_EMAIL y ADMIN_PASSWORD (mínimo 8 caracteres)',
    );
  }

  const prisma = new PrismaService();
  const passwords = new PasswordService();
  await prisma.$connect();

  try {
    const passwordHash = await passwords.hash(password);
    const user = await prisma.user.upsert({
      where: { email },
      update: { fullName, passwordHash, isActive: true },
      create: { email, fullName, passwordHash },
    });

    await prisma.userRoleAssignment.upsert({
      where: { userId_role: { userId: user.id, role: UserRole.ADMIN } },
      update: {},
      create: { userId: user.id, role: UserRole.ADMIN },
    });

    console.log(`Administrador listo: ${email}`);
  } finally {
    await prisma.$disconnect();
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
