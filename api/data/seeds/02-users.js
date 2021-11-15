exports.seed = async function (knex) {
  await knex("users").insert([
    { username: "bob", password: "password", role: "client" },
    { username: "sally", password: "password", role: "instructor" },
    { username: "jim", password: "password", role: "client" },
    { username: "betty", password: "password", role: "instructor" },
  ]);
};
