/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("settings").del();
  await knex("settings").insert([
    {
      title: "LogChimp",
      description: "Track user feedback to build better products",
      accentColor: "020202",
      logo: "/freshworks.svg",
      icon: "/freshworks.svg",
      isPoweredBy: true,
    },
  ]);
};
