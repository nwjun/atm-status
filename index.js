const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
const DataStore = require('nedb');
const { response } = require('express');

app
  .use(express.json())
  .use(express.urlencoded( {extended: true} ))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const database = new DataStore('database.db');
database.loadDatabase();

app.post('/upload', (req, res)=>{
  const data = req.body;
  // if (data.status === "notWorking"){
  //   atmStatus = false;
  // }else{
  //   atmStatus = true;
  // }
  const row ={
    name: data.name,
    status: data.status,
    reason: data.reason,
    submitted: data.submitted,
  }
  database.insert(row);
  res.status(200).send({msg:'Inserted'});
})