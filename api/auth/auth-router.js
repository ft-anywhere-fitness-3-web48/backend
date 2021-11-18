const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const {
  checkUsernameExists,
  validateRole,
  checkUsernameUnique,
} = require("./auth-middleware");
const { tokenBuilder } = require("./token-builder");

router.post(
  "/register",
  checkUsernameUnique,
  validateRole,
  async (req, res, next) => {
    const { username, password, role_id } = req.body;
    const hash = bcrypt.hashSync(password, 6);
    try {
      const newUser = await Users.addUser({
        username,
        password: hash,
        role_id,
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", checkUsernameExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = tokenBuilder(req.user);
    res.json({
      status: 200,
      message: `${req.user.username} is back!`,
      token,
    });
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
});

router.use((err, req, res, next) => {
  //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "something went wrong inside the auth router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
