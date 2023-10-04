const CREATE_USER_TABLE_QUERY = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(255),
  address VARCHAR(255),
  mobile_number NUMERIC(10,0)
);
`;

const REGISTER_QUERY = `INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4)`;

const LOGIN_USERNAME_QUERY = `SELECT password FROM users WHERE email = $1`;

const PROFILE_GET_USER_DETAILS_QUERY = `SELECT * FROM users WHERE email = $1`;

const UPDATE_PROFILE_USER_DETIALS_QUERY = `UPDATE users SET firstname = $1, lastname = $2, address = $3, mobile_number = $4 WHERE email = $5`;

module.exports = {
  CREATE_USER_TABLE_QUERY,
  REGISTER_QUERY,
  LOGIN_USERNAME_QUERY,
  PROFILE_GET_USER_DETAILS_QUERY,
  UPDATE_PROFILE_USER_DETIALS_QUERY,
};
