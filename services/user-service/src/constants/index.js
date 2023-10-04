const HTTP_STATUS = {
  OK: {
    CODE: 200,
    MESSAGE: "OK",
  },
  CREATED: {
    CODE: 201,
    MESSAGE: "Created",
  },
  BAD_REQUEST: {
    CODE: 400,
    MESSAGE: "Bad Request",
  },
  UNAUTHORIZED: {
    CODE: 401,
    MESSAGE: "Unauthorized"
  },
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: "Not Found",
  },
  INTERNAL_SERVER_ERROR: {
    CODE: 500,
    MESSAGE: "Internal Server Error",
  },
};

module.exports = { HTTP_STATUS };
