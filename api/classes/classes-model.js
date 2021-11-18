const db = require("../data/db-config");

function find() {
  return db("classes as c").join(
    "class_types as ct",
    "c.class_type_id",
    "=",
    "ct.class_type_id"
  );
}
function findClassTypes() {
  return db("class_types");
}
function findBy(filter) {
  return db("classes as c")
    .join("class_types as ct", "c.class_type_id", "=", "ct.class_type_id")
    .where(filter);
}

function findById(class_id) {
  return db("classes as c")
    .join("class_types as ct", "c.class_type_id", "=", "ct.class_type_id")
    .where("class_id", class_id);
}

async function addClass(newClass) {
  return await db("classes").insert(newClass, [
    "name",
    "class_type_id",
    "start_time",
    "duration",
    "intensity_level",
    "location",
    "registered_attendees",
    "max_size",
  ]);
}

async function addClassType(newType) {
  return await db("class_types").insert(newType, ["class_type_id"]);
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
  addClassType,
  find,
  findClassTypes,
  findBy,
  findById,
  deleteClass,
  updateClass,
};
