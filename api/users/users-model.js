const db = require("../data/db-config");

function find() {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id", "r.role_name", "u.username", "u.password");
}
function findBy(filter) {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id", "u.username", "u.password", "r.role_name")
    .where(filter);
}

function findById(user_id) {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name")
    .where("u.user_id", user_id)
    .first();
}
async function addUser(user) {
  const [newUserObject] = await db("users").insert(user, [
    "user_id",
    "username",
    "password",
  ]);
  return newUserObject;
}

async function updateUser(user_id, user) {
  await db("users").update(user).where("user_id", user_id);
  return findById(user_id);
}

async function deleteUser(user_id) {
  const deletedUser = await db("users").where("user_id", user_id).del();
  return deletedUser;
}
module.exports = {
  addUser,
  find,
  findBy,
  findById,
  deleteUser,
  updateUser,
};
