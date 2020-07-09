
exports.up = function(knex) {
   return knex.schema.createTable('notes', (table)=>{


        table.increments();

        table.string('title');
        table.string('description').notNullable();
        
        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};
