const db = require("../data/db-config");

function find() {
  return db("classes as c");
}

function findBy(filter) {
  return db("classes").where(filter);
}

function findById(class_id) {
  return db("classes").where("class_id", class_id);
}

async function addClass(newClass) {
  await db("classes").insert(newClass);
}

async function updateClass(class_id, classDetails) {
  await db("classes").update(classDetails).where("class_id", class_id);
  return findById(class_id);
}

async function deleteClass(class_id) {
  const deletedClass = await db("classes").where("class_id", class_id).del();
  return deletedClass;
}

module.exports = {
  addClass,
  find,
  findBy,
  findById,
  deleteClass,
  updateClass,
};
