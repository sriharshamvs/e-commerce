const {
  findUserByEmail,
  updateDetailsUserByEmail,
} = require("../models/userModel");
const { HTTP_STATUS } = require("../constants");

const getUserProfile = async (req, res) => {
  try {
    const requestBody = req.body;
    const email = requestBody.email;
    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND.CODE)
        .json({ error: HTTP_STATUS.NOT_FOUND.MESSAGE });
    }
    const userDetails = {
      userID: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    res
      .status(HTTP_STATUS.OK.CODE)
      .json({ message: HTTP_STATUS.OK.MESSAGE, userDetails });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
      .json({ error: HTTP_STATUS.INTERNAL_SERVER_ERROR.MESSAGE });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const requestBody = req.body;
    const email = requestBody.email;

    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND.CODE)
        .json({ error: HTTP_STATUS.NOT_FOUND.MESSAGE });
    }

    const firstname = requestBody.firstname;
    const lastname = requestBody.lastname;
    const address = requestBody.address;
    const mobileNumber = requestBody.mobileNumber;

    await updateDetailsUserByEmail(
      firstname,
      lastname,
      address,
      mobileNumber,
      email
    );
    const updated_user = await findUserByEmail(email);
    const userDetails = {
      userID: updated_user.id,
      email: updated_user.email,
      firstname: updated_user.firstname,
      lastname: updated_user.lastname,
      mobileNumber: updated_user.mobileNumber,
      email: updated_user.email,
    };
    res
      .status(HTTP_STATUS.OK.CODE)
      .json({ message: HTTP_STATUS.OK.MESSAGE, userDetails });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
      .json({ error: HTTP_STATUS.INTERNAL_SERVER_ERROR.MESSAGE });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
