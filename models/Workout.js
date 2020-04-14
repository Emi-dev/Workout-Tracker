const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },

  exercises: [
    {
      type: {
        type: String
      },
      name: {
        type: String,
        trim: true,
        required: "Exercise name is required."
      },
      distance: Number,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

// Mongoose virtual property, "totalDuration" which will not be stored in MongoDB.
WorkoutSchema.virtual("totalDuration").get(function() {
  let totalDuration = 0;
  this.exercises.forEach(exercise => {
    totalDuration += exercise.duration;
  });
  return totalDuration;
});

// Since virtuals are not included by default when passing a document to Express' res.json() function, the toJSON schema option needs to be set to { virtuals: true }.
WorkoutSchema.set('toJSON', { virtuals: true });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;