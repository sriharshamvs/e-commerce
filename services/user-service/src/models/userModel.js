const db = require("../config/db");
const bcrypt = require("bcrypt");
const {
  REGISTER_QUERY,
  LOGIN_USERNAME_QUERY,
  PROFILE_GET_USER_DETAILS_QUERY,
  UPDATE_PROFILE_USER_DETIALS_QUERY,
} = require("../utils/queries");

const createUser = async (user) => {
  const { email, firstname, lastname, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(REGISTER_QUERY, [
    email,
    firstname,
    lastname,
    hashedPassword,
  ]);
  return result.rows[0];
};

const findPasswordHashByEmail = async (email) => {
  const result = await db.query(LOGIN_USERNAME_QUERY, [email]);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await db.query(PROFILE_GET_USER_DETAILS_QUERY, [email]);
  return result.rows[0];
};

const updateDetailsUserByEmail = async (
  firstname,
  lastname,
  address,
  mobileNumber,
  email
) => {
  await db.query(UPDATE_PROFILE_USER_DETIALS_QUERY, [
    firstname,
    lastname,
    address,
    mobileNumber,
    email,
  ]);
};

const findUserById = async (id) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findPasswordHashByEmail,
  findUserByEmail,
  updateDetailsUserByEmail,
  findUserById,
};
