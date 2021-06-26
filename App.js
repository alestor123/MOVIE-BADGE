const axios = require('axios')
module.exports = async (username, token, tmdb, limit) => {
  if (!(typeof (username && token && tmdb) === 'string' && typeof limit === 'number')) throw Error('Please enter a valid input')
  const data = (await axios.get('https://api.trakt.tv/users/' + username + '/' + '/watching?limit=' + limit || 300, {
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': token
    }
  })).data
  //   console.log(data)
  //   console.log(data[data.type].ids.tmdb)
  if (typeof data === 'object') {
    const main = (await axios.get(`https://api.themoviedb.org/3/${(data.type === 'show' ? 'tv' : data.type)}/${data[data.type].ids.tmdb}?api_key=${tmdb}`)).data
    data.coverImage = 'https://image.tmdb.org/t/p/original' + main.poster_path
    data.imdbUrl = 'https://www.imdb.com/title/' + data[data.type].ids.imdb
    return data
  } else return 'nothing'
}
