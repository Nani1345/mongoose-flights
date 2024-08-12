import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

// GET localhost:3000/users
router.get('/', flightsCtrl.index)

// GET /flights/new
router.get('/new', flightsCtrl.new)

// GET /flights/:flightId
router.get('/:flightId', flightsCtrl.show)

// POST /flights
router.post('/', flightsCtrl.create)

// localhost:3000/flights/:flightId
router.delete("/:flightId", flightsCtrl.delete)

// Get loclahost:3000/flights/:flightId/edit
router.get('/:flightId/edit', flightsCtrl.edit)

// PUT localhost:3000/flights/:flightId
router.put("/:flightId", flightsCtrl.update)

router.post('/:flightId/tickets', flightsCtrl.createTicket)

router.post('/:flightId/meals', flightsCtrl.addMeal)






export { router }