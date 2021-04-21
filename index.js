const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/movieApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Open"))
  .catch((err) => console.log(err));

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);

// const darkKnight = new Movie({
//   title: "The Dark Knight",
//   year: 2008,
//   score: 9.0,
//   rating: "PG-13",
// });
// const yourName = new Movie({
//   title: "君の名は",
//   year: 2016,
//   score: 8.4,
//   rating: "PG",
// });
// darkKnight.save();
// yourName.save();

// Movie.insertMany([
//   { title: "Skyfall", year: 2012, score: 7.8, rating: "PG-13" },
//   { title: "Toy Story 3", year: 2010, score: 8.2, rating: "G" },
//   { title: "Superbad", year: 2007, score: 7.6, rating: "R" },
//   { title: "Parasite", year: 2019, score: 8.6, rating: "R" },
// ]);
