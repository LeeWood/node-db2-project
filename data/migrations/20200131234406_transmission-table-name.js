
exports.up = function(knex) {
  return knex.schema.table('cars', tbl => {
    tbl.renameColumn('transmission type', 'transmission_type');
  })
};

exports.down = function(knex) {
  return knex.schema.table('cars', tbl => {
    tbl.renameColumn('transmission_type', 'transmission type');
  })
};
