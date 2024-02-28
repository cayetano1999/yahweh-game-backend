import { registerAs } from '@nestjs/config';
export default registerAs('keycloak', () => ({
  client: process.env.KEYCLOAK_CLIENT,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  user: process.env.KEYCLOAK_USER_NAME,
  password: process.env.KEYCLOAK_USER_PASSWORD,
  realm: process.env.KEYCLOAK_REALM,
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY
}));
