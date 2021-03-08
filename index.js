const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.post('/db', (req,res)=>{
  console.log(req.body);
  const data = req.body;
  res.json({
      status:'success',
      latitude: data.lat,
      longitiude: data.lon,
  })
});

