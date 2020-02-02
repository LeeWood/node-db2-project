const express = require('express');
const db = require('../data/db-config.js');

const router = express.Router();

// * GET

router.get('/', async (req, res) => {

  try {
    const cars = await db('cars');
    res.status(200).json(cars);
  }catch(err) {
    res.status(500).json({
      message: "Failed to retrieve cars data.",
      error: err
    });
  }
});

router.get('/:id', validateId, (req, res) => { //GET indivudual
  res.status(200).json(req.car);
});

// * POST

router.post('/', validateCar, async (req, res) => {

  const carData = req.body;

  try {
    const newCarData = await db('cars').insert(carData);
    res.status(201).json({
      recordNo: newCarData[0]
    });
  }catch(err) {
    res.status(500).json({
      message: "Failed to add data.",
      error: err
    });
  }
});

// * PUT

{/*
  router.put('/:id', async (req, res) => {
  
    const { id } = req.params;
    const updatedInfo = req.body;
  
    db('cars').where('id', id).update(updatedInfo)
      .then(updatedCar => {
        res.status(200).json({
          updated: updatedCar
        })
        .catch(err => {
          res.status(500).json({
            message: "Failed to update car data.",
            error: err
          });
        });
      });
  }); 
*/}

{/*
//! With this version of the query, I was getting an error: 
Unhandled rejection TypeError: res.status(...).json(...).catch is not a function
at db.where.update.then.updatedCar (C:\Users\Aleesha\LAMBDA_PROJECTS\nodedb22\node-db2-project\cars\cars-router.js:71:13)
//* it WAS still functional, but with an error I couldn't fix...switching to try/catch/await does not result in error.
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
      message: "Failed to update car data.",
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
      message: "Failed to delete car data.",
      error: err
    });
  }
});

// * MIDDLEWARE

async function validateId(req, res, next) { //checking if record with id exists

  const { id } = req.params;

  try {
    const [car] = await db('cars').where('id', id);
    if(car) {
      req.car = car;
      next();
    }else {
      res.status(404).json({
        message: "A record with that ID could not be found."
      })
    }
  }catch(err) {
    res.status(500).json({
      message: "Failed to get car data.",
      error: err
    });
  }
}

async function validateCar(req, res, next) { //checking if query submission passes restraint checks

  const carData = req.body;
  
  if(!carData.VIN && !carData.make && !carData.model && !carData.mileage ) {
    res.status(400).json({
      message: "Please add car data."
    });
  } else if(!carData.VIN) {
    res.status(400).json({
      message: "Please add car VIN."
    });
  } else if(!carData.make) {
    res.status(400).json({
      message: "Please add car make."
    });
  } else if(!carData.model) {
    res.status(400).json({
      message: "please add car model."
    });
  } else if(!carData.mileage) {
    res.status(400).json({
      message: "please add car milage."
    });
  } else {
    next();
  }
}

module.exports = router;