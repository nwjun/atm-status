const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
const DataStore = require('nedb');

app  
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded( {extended: true} ))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const database = new DataStore('database.db');
database.loadDatabase();
const admin = require("firebase-admin");

const serviceAccount = require("C:/Users/user/Desktop/atm status/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://statuslist-a643b-default-rtdb.firebaseio.com"
});

app.post('/upload', (req, res)=>{
  const data = req.body;

// Get a database reference to our blog
  const db = admin.database();
  var ref = db.ref("status");

  var usersRef = ref.child("users");
  console.log(data.status)

  if(data.status){
    console.log("hi")
    var row ={
      name: data.name,
      status: data.status,
      submitted: data.submitted,
    }
  }
  else{
    var row ={
      name: data.name,
      status: data.status,
      reason: data.reason,
      submitted: data.submitted,
}
}
  console.log(data);
  var userId = usersRef.push(row);
  database.insert(row);
  res.status(200).send({msg:'Inserted', id: userId});
})



