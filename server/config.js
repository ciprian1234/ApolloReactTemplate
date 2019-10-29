export const CONFIG = {
  // set to true when in production mode
  IN_PROD: false,

  // application port
  PORT: 3000,

  // database connection info
  DB_HOST: "localhost",
  DB_PORT: 27015,
  DB_USER: "admin",
  DB_PASS: "pass",
  DB_NAME: "test",

  // session config
  SESSION_NAME: "login.sid",
  SESSION_SECRET: "12dqwqwrqwrqw",
  SESSION_LIFETIME: 1000 * 60 * 60 * 2 // 2h
};
