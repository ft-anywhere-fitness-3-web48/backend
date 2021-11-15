exports.seed = async function (knex) {
  await knex("users").insert([
    { username: "bob", password: "password", role_id: 1 },
    { username: "sally", password: "password", role_id: 2 },
    { username: "jim", password: "password", role_id: 1 },
    { username: "betty", password: "password", role_id: 2 },
  ]);
};
