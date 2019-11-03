export const CONFIG = {
  // set to true when in production mode
  IN_PROD: false,

  // application port
  PORT: 4000,

  // database connection info
  DB_HOST: "localhost",
  DB_PORT: 27015,
  DB_USER: "admin",
  DB_PASS: "pass",
  DB_NAME: "test",

  // JWT Authentication
  JWT_ACCESS_TOKEN_SECRET: "Sdqwrqwrasdsw",
  JWT_ACCESS_TOKEN_EXPIRE: "15m",
  JWT_REFRESH_COOKIE_NAME: "jwt.refresh",
  JWT_REFRESH_COOKIE_EXPIRE: 1000 * 60 * 60 * 24 * 7, // refresh token cookie exire time
  JWT_REFRESH_TOKEN_SECRET: "qwerqwrqwrasqr",
  JWT_REFRESH_TOKEN_EXPIRE: "7d"
};
