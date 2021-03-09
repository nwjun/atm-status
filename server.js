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

//upload data to database
app.post('/upload', (req, res)=>{
  const data = req.body;

// Get a database reference to our blog
  const db = admin.database();
  var ref = db.ref("status");

  var usersRef = ref.child("users");

  if(data.status){
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
  var userId = usersRef.push(row);
  database.insert(row);

  res.status(200).send({msg:'Inserted', id: userId});
})

  const db = admin.database();
  const ref = db.ref("status/users")
  ref.orderByChild("submitted").limitToLast(1).on("value", function(snapshot){
    console.log(snapshot.val());

  }, function(err){
    console.log("The read failed: " + err);
  })
