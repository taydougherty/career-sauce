require('dotenv').config()

module.exports = {
  development: {
    username: "postgres",
    password: process.env.DB_password,
    database: "jobtracker",
    host: "127.0.0.1",
    port: process.env.DB_PORT,
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  production: {
    username: "",
    password: "",
    database: "",
    host: "",
    port: 5432,
    dialect: "postgres",
    use_env_variable: "DATABASE_URL"
  },
  secret: 'supersecret',
  // port: process.env.PORT || 5433,
  sessionKey: process.env.sessionKey || "jobtracker",
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
