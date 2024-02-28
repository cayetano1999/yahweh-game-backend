import { UnauthorizedException } from '@nestjs/common';
export function extractJwt({ authorization }: Record<string, string>): string {
  if (!authorization) {
    throw new UnauthorizedException();
  }
  const [type, payload] = authorization.split(' ');
  if (type.toLowerCase() !== 'bearer') {
    throw new UnauthorizedException();
  }
  return payload;
}