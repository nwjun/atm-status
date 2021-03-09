const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
require('dotenv').config();

app  
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded( {extended: true} ))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Get a database reference to our blog
const db = admin.database();
var usersRef = db.ref("status");

//upload data to database
app.post('/upload', (req, res)=>{
  const data = req.body;
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

usersRef.push(row);
  res.status(200).send({msg:'Inserted'}); 
})

app.get('/getStatus',(req,res)=>{
  usersRef.orderByChild("submitted").limitToLast(1).once("value", function(snapshot){
    var item=Object.values(snapshot.val())[0];
    res.send(item);
  }, function(err){
    console.log("The read failed: " + err);
  })
})
