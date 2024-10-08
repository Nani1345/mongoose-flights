import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

function newFlight(req, res) {
    res.render('flights/new', {
      title: 'Add Flight'
    })
  }


async function create(req, res){
    try {
        const flight = await Flight.create(req.body)
        res.redirect(`/flights/${flight._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/flights') 
    }
}

async function index(req, res){
    try {
        const flights = await Flight.find({})
        res.render('flights/index', {
        title: 'All Flights',
        flights
    })  
    } catch (error) {
        console.log(error)
        res.redirect('/')  
    }
    
}


async function show(req, res) {
    try {
      const flight = await Flight.findById(req.params.flightId).populate('meal')
      const meals = await Meal.find({ _id: { $nin: flight.meal } });
      res.render('flights/show', {
        flight,
        title: 'Flight Detail' ,
        meals
      })
    } catch (error) {
      console.log(error)
      res.redirect('/flights')
    }
  }

  async function deleteFlight(req, res) {
    try {
      await Flight.findByIdAndDelete(req.params.flightId)
      res.redirect('/flights')
    } catch (error) {
      console.log(error)
      res.redirect('/flights')
    }
  }

async function edit(req, res){
  try {
    //find ther flight by flight._id(req.params.flightId)
    const flight = await Flight.findById(req.params.flightId)
    // render a flights/edit view and pass the flight and title to it
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight'
    })
  
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
  
}





async function update(req, res) {
  try {
    for (let key in req.body) {
      if(req.body[key] === "") delete req.body[key]
    }
    
    const flight = await Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}



async function createTicket(req, res) {
  try {
    const flight = await Flight.findById(req.params.flightId)
    flight.tickets.push(req.body)
    await flight.save()
    console.log(req.body)
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}


async function addMeal(req, res) {
  try {
    const flight = await Flight.findById(req.params.flightId)
    flight.meal.push(req.body.mealId)
    await flight.save()
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(err)
    res.redirect("/flights")
  }
}


  export{
    newFlight as new,
    create,
    index,
    show,
    deleteFlight as delete,
    edit,
    update,
    createTicket,
    addMeal
  }