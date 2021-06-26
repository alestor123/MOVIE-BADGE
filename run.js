const movies = require('./App');
(async () => {
  const data = await movies('macbudy', process.env.TRAK, process.env.TMDB, 300)
  console.log(data)
})()
// console.log(process.env.TMDB)
