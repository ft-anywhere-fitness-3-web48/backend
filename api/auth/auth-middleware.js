const jwt = require("jsonwebtoken");
const { JWT_SECRET, INSTRUCTOR_SECRET } = require("../secrets/");
const Users = require("../users/users-model");

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

const validateRole = (req, res, next) => {
  const { role_id } = req.body;
  if (!role_id) {
    next({ status: 418, message: "Please select a role" });
  } else if (role_id === 1 && req.body.auth === INSTRUCTOR_SECRET) {
    req.body.role_id = role_id;
    next();
  } else if (role_id === 1 && !req.body.auth) {
    next({ status: 403, message: "Instructor Code Required" });
  } else if (role_id === 1 && req.body.auth !== INSTRUCTOR_SECRET) {
    next({ status: 403, message: "Invalid Instructor Code" });
  } else {
    next();
  }
};
// const restricted = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return next({ status: 401, message: "Token required" });
//   }
//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return next({ status: 401, message: "Token invalid" });
//     }
//     req.decodedJwt = decoded;
//     console.log(req.decodedJwt);
//     next();
//   });
// };
// const only = (role_name) => (req, res, next) => {
//   if (req.decodedJwt.role_name !== role_name) {
//     next({ status: 403, message: "This is not for you" });
//   } else {
//     next();
//   }
// };

module.exports = {
  checkUsernameExists,
  validateRole,
};
