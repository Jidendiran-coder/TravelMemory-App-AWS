const express = require('express')
const routes = express.Router()
const Trip = require('../models/trip.model'); // Ensure this path matches your model
const tripDetails = require('../controllers/trip.controller')

routes.post('/', tripDetails.tripAdditionController)
routes.get('/', tripDetails.getTripDetailsController)
routes.get('/:id', tripDetails.getTripDetailsByIdController)
routes.put('/:id', async (req, res) => {
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedTrip);
    } catch (err) {
      res.status(404).json({ message: "Trip not found or update failed!" });
    }
  });


module.exports = routes;