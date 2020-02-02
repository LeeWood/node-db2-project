const express = require('express');
const db = require('../data/db-config.js');

const router = express.Router();

// * GET

router.get('/', (req, res) => {

  db('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve cars.",
        error: err
      });
    });
});

router.get('/:id', (req, res) => { //GET indivudual

  const { id } = req.params;

  db('cars').where({ id }).first()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to retrieve car",
        error: err
      });
    });
});

// * POST

router.post('/', (req, res) => {

  const carData = req.body;

  db('cars').insert(carData)
    .then(ids => {
      db('cars').where({ id: ids[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to add data",
        error: err
      });
    });
});

// * PUT

// router.put('/:id', async (req, res) => {

//   const { id } = req.params;
//   const updatedInfo = req.body;

//   db('cars').where('id', id).update(updatedInfo)
//     .then(updatedCar => {
//       res.status(200).json({
//         updated: updatedCar
//       })
//       .catch(err => {
//         res.status(500).json({
//           message: "Failed to update car data.",
//           error: err
//         });
//       });
//     });
// }); 

{/*
//! With this version of the query, I was getting an error: 
Unhandled rejection TypeError: res.status(...).json(...).catch is not a function
at db.where.update.then.updatedCar (C:\Users\Aleesha\LAMBDA_PROJECTS\nodedb22\node-db2-project\cars\cars-router.js:71:13)
//* it WAS still functional, but with an error i couldn't fix...switching to try/catch/await does not result in error.
*/}

router.put('/:id', async (req, res) => {

  const { id } = req.params;
  const updatedInfo = req.body;

  try {
    const rowsUpdated = await db('cars').where('id', id).update(updatedInfo);
    res.status(200).json({
      updated: rowsUpdated
    });
  }catch(err) {
    res.status(500).json({
      message: "Failed to update car data",
      error: err
    });
  }
});

// * DELETE

router.delete('/:id', async (req, res) => {

  const { id } = req.params;

  try {
    const rowsDeleted = await db('cars').where('id', id).del();
    res.status(200).json({
      deletedRecords: rowsDeleted
    });
  }catch(err) {
    res.status(500).json({
      message: "Failed to delete car data",
      error: err
    });
  }
});

module.exports = router;