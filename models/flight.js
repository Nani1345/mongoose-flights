//Define a basic schema for a flight model
import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat:{type:String,match: /[A-F][1-9]\d?/},
  price:{type:Number, min:0}
  }, {timestamps: true}
)

//define the basic schema for the flight model
const flightSchema = new Schema({
    airline: {type: String, enum: ['American', 'Southwest', 'United']},
    airport: {type: String, enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']},
    flightNo: {type: Number, required: true, min: 10, max: 9999},
    departs: {type: Date, defaut: function(){return new Date().getFullYear()}},
    tickets: [ticketSchema],
    meal:[{type:Schema.Types.ObjectId, ref:'Meal'}]
  }, 
  {timestamps: true}
)
//Compile the schema into a model and export it
const Flight = mongoose.model('Flight', flightSchema)

export{
    Flight
}