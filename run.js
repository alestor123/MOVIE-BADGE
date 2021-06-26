const movies = require('./App');
(async () => {
  const data = await movies('alestor123', process.env.TRAK, process.env.TMDB, 300)
  console.log(data)
})()
// console.log(process.env.TMDB)
