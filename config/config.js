require("dotenv-expand").expand(require("dotenv").config());

module.exports = {
  development: {
    username: process.env.DB_DEVELOPMENT_USER,
    password: process.env.DB_DEVELOPMENT_PASSWORD,
    database: process.env.DB_DEVELOPMENT,
    host: process.env.DB_DEVELOPMENT_HOST,
    port: parseInt(process.env.DB_DEVELOPMENT_PORT || "5432"),
    dialect: process.env.DB_DEVELOPMENT_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    migrationStorageTableName: "SequelizeMeta",
    logging: console.log,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  },
  test: {
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.DB_TEST_HOST,
    port: parseInt(process.env.DB_TEST_PORT || "5432"),
    dialect: process.env.DB_TEST_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    migrationStorageTableName: "SequelizeMeta",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData",
    migrationStorageTableName: "SequelizeMeta",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  },
};
