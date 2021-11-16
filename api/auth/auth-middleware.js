const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/");
const Users = require("../users/model");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ status: 401, message: "Token required" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next({ status: 401, message: "Token invalid" });
    }
    req.decodedJwt = decoded;
    console.log(req.decodedJwt);
    next();
  });
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const user = await Users.findBy({ username: req.body.username });
    if (!user.length) {
      next({ status: 401, message: "Invalid credentials" });
    } else {
      req.user = user[0];
      next();
    }
  } catch (error) {
    next(error);
  }
};

const only = (role_name) => (req, res, next) => {
  if (req.decodedJwt.role_name !== role_name) {
    next({ status: 403, message: "This is not for you" });
  } else {
    next();
  }
};

module.exports = {
  restricted,
  checkUsernameExists,
  only,
};
