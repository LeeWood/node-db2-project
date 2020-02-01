
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { 
          VIN: '1C3CDZCB3CN117845', 
          make: 'Buick', 
          model: 'Encore GX', 
          mileage: 10000,
          transmission_type: 'AT',
          status: 'used'
        },
        { 
          VIN: '3FAFP313X2R107596', 
          make: 'Adui', 
          model: 'R8', 
          mileage: 25,
          transmission_type: 'AT',
          status: 'new'
        },
        { 
          VIN: 'SALVT2BG4EH955582', 
          make: 'Ford', 
          model: 'Transit 150 Van', 
          mileage: 5030
        },
        { 
          VIN: 'JT5FG02T9X0086377', 
          make: 'Kia', 
          model: 'Soul', 
          mileage: 12800,
          transmission_type: 'AM'
        },
        { 
          VIN: '5NPDH4AE3BH082954', 
          make: 'Volvo', 
          model: 'XC60', 
          mileage: 15,
          transmission_type: 'CVT',
          status: 'new'
        },
      ]);
    });
};
