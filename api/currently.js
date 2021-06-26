const { current, mainDt } = require('../api')

module.exports = async (req, res) => {
  if (req.query.type === 'svg') {
    res.setHeader('Content-Type', 'image/svg+xml')
    res.send((await current(req.query.id || process.env.ID)))
  } else if (req.query.type === 'redirect') res.redirect((await mainDt(req.query.id || process.env.ID)).imdbUrl)
  else res.json(await mainDt(req.query.id || process.env.ID))
}
