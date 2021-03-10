const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
require("dotenv").config();

app
  .use(express.static(path.join(__dirname, "public")))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// Get a database reference to our blog
const db = admin.database();
var usersRef = db.ref("status");

//upload data to database
app.post("/upload", (req, res) => {
  const data = req.body;
  if (data.status == "Working") {
    var row = {
      name: data.name,
      status: data.status,
      submitted: data.submitted,
    };
  } else {
    var row = {
      name: data.name,
      status: data.status,
      reason: data.reason,
      submitted: data.submitted,
    };
  }
  usersRef.push(row);
  res.status(200).send({ msg: "Inserted" });
});

app.get("/getStatus", (req, res) => {
  usersRef
    .orderByChild("submitted")
    .limitToLast(1)
    .on(
      "value",
      function (snapshot) {
        var item = Object.values(snapshot.val())[0];
        res.send(item);
      },
      function (err) {
        console.log("The read failed: " + err);
      }
    );
});

//sending feedback message
var API_KEY = process.env.MAILGUN_API_KEY
var DOMAIN = process.env.MAILGUN_DOMAIN
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

app.post("/feedback", (req, res) => {
  const msg = req.body;
  console.log(msg);
const data = {
  from: msg.emailAddress,
  to: 'helloworldisagurl@gmail.com',
  subject: 'KMM-ATM-STATUS feedback',
  text: msg.message,
};
console.log(data);
  mailgun.messages().send(data, function (error, body) {
	console.log(body);
  console.log(error);
});
  res.status(200).send({ msg: "Inserted" });
})