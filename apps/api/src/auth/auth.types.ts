import { UserRole } from '../generated/prisma/client';

export type AuthenticatedUser = {
  id: string;
  email: string;
  fullName: string;
  roles: UserRole[];
  sessionId: string;
};
