
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments(); //good for quick query search/testing
    tbl.text('VIN', 17).unique().notNullable();
    tbl.text('make', 50).notNullable();
    tbl.text('model', 50).notNullable();
    tbl.decimal('mileage').notNullable();
    tbl.text('transmission type', 3);
    tbl.text('status', 50);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
