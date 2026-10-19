import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/database/prisma.service';
import { randomUUID } from 'node:crypto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = app.get(PrismaService);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({ service: 'bodyscan-api', status: 'ok' });
  });

  it('returns the empty public catalog', async () => {
    await request(app.getHttpServer()).get('/courses').expect(200).expect([]);
    await request(app.getHttpServer()).get('/articles').expect(200).expect([]);
    await request(app.getHttpServer())
      .get('/institutional/specialties')
      .expect(200)
      .expect([]);
  });

  it('registers, authenticates and revokes a student session', async () => {
    const email = `e2e-${randomUUID()}@example.com`;
    const password = 'prueba-segura-123';

    const registration = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password, fullName: 'Estudiante E2E' })
      .expect(201);

    const token = String(
      (registration.body as unknown as { token: unknown }).token,
    );
    expect(token).toBeTruthy();

    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(({ body }: { body: { email: string; roles: string[] } }) => {
        expect(body.email).toBe(email);
        expect(body.roles).toEqual(['STUDENT']);
      });

    await request(app.getHttpServer())
      .get('/admin/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    await request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);

    await prisma.user.delete({ where: { email } });
  });

  afterEach(async () => {
    await app.close();
  });
});
