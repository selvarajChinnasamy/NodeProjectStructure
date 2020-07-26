const configuration = {};
configuration.db = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOSTNAME
};
configuration.logLevel = process.env.LOG_LEVEL;

module.exports = configuration;
