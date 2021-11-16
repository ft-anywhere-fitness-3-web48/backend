const express = require("express");
const { checkUserId } = require("./users-middleware");
const router = express.Router();
const Users = require("./users-model");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkUserId, (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", checkUserId, async (req, res, next) => {
  try {
    const { username, password, role_id } = req.body;
    const hash = bcrypt.hashSync(password, 6);
    const updatedUser = await Users.updateUser(req.params.id, {
      username,
      password: hash,
      role_id,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await Users.deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something went wrong inside the users routers",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
