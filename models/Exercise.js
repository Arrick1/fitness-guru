const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    exercise: [Object]
})

module.exports = mongoose.model('Exercise', ExerciseSchema)