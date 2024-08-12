import { Meal } from "../models/meal.js"

async function newMeals(req, res) {
    try {
      const meals = await Meal.find({})
      res.render('meals/new', {
        title: 'Add Meals',
        meals,
      })
    } catch (error) {
      console.log(error)
      res.redirect('/flights')
    }
  }


  async function create(req, res) {
    try {
      const meal = await Meal.create(req.body) //performer variable isn't needed, but get in the habit for React!
      res.redirect('/meals/new') 
    } catch (error) {
      console.log(error)
      res.redirect('/meals/new') 
    }
  }


export {
newMeals as new,
create
}