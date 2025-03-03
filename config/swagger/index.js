const { version, description, license } = require("../../package.json");
const config = require("..");
const commonErrors = require("./common-errors");

const servers = [
  {
    url: `${config.url}/${config.prefix}`,
    description: `${process.env.NODE_ENV} server`,
  },
];

const securitySchemes = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
};

const requestBodies = {};

const responses = {
  commonErrors,
};

const tags = [
  {
    name: "Readme",
    description: "Readme management",
  },
  {
    name: "Users",
    description: "Users management",
  },
  {
    name: "Companies",
    description: "Companies management",
  },
  {
    name: "Contacts",
    description: "Contacts management",
  },
];

const security = [{ bearerAuth: [] }];

const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Test API js backend",
    description,
    license,
    version,
  },
  components: {
    securitySchemes,
    requestBodies,
    responses,
  },
  security,
  tags,
  servers,
  paths: {
    ...require("../../routes/readme/readme.docs"),
    ...require("../../routes/users/users.docs"),
    ...require("../../routes/companies/companies.docs"),
    ...require("../../routes/contacts/contacts.docs"),
  },
};

module.exports = { swaggerOptions };
