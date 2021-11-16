const db = require("../data/db-config");
const Users = require("./users-model");

const checkUserId = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      next({ message: "User not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    next(error);
  }
  return db("users");
};

const validateUsers = (req, res, next) => {
  return db("users");
};

module.exports = {
  checkUserId,
  validateUsers,
};
