
exports.up = async function(knex) {
    return knex.schema.createTable('foods', tbl => {
        tbl.increments();
    
        tbl.string('name', 255).notNullable();
      });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('foods');
};
