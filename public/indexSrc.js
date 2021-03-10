document
  .getElementsByClassName("indexButton")[0]
  .addEventListener("click", feedback);

function reson() {
  //Show/Hide reason
  var foot = document.querySelector("footer").style;

  if (foot.display === "none") {
    foot.display = "block";
  } else {
    foot.display = "none";
  }
}

  firebase.initializeApp(firebaseConfig);
  var db = firebase.database();
  var usersRef = db.ref("status");
  usersRef
.orderByChild("submitted")
.limitToLast(1)
.on(
  "value",
  function (snapshot) {
    var item = Object.values(snapshot.val())[0];
    updateList(item);
  },
  function (err) {
    console.log("The read failed: " + err);
  }
);


// database.on('value', (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });

function updateList(item){
  const data = item;
    let status = data["status"];
    let contributor = data["name"];
    let reason = data["reason"];
    let date = data["submitted"];

    //if it is working, hide reason
    if (status === "Working") {
      document.getElementById("rowReason").style.display = "none";
      document.getElementById("status").style.color = "green";
    } else {
      console.log(reason);
      document.getElementById("rowReason").style.display = "block";
      document.getElementById("reason").textContent = reason;
      document.getElementById("status").style.color = "red";
    }
    document.getElementById("status").textContent = status;
    document.getElementById("contributor").textContent = contributor;
    document.getElementById("dateTime").textContent = date.replace("T", " ");
}
// //retrieve data from database and update to index
// fetch("/getStatus")
//   .then((response) => response.json())
//   .then((response) => {
//     const data = response;
//     let status = data["status"];
//     let contributor = data["name"];
//     let reason = data["reason"];
//     let date = data["submitted"];

//     //if it is working, hide reason
//     if (status === "Working") {
//       document.getElementById("rowReason").style.display = "none";
//       document.getElementById("status").style.color = "green";
//     } else {
//       console.log(reason);
//       document.getElementById("rowReason").style.display = "block";
//       document.getElementById("reason").textContent = reason;
//       document.getElementById("status").style.color = "red";
//     }
//     document.getElementById("status").textContent = status;
//     document.getElementById("contributor").textContent = contributor;
//     document.getElementById("dateTime").textContent = date.replace("T", " ");
//   })
//   .catch((err) => {
//     console.log("Error:", error);
//   });

function feedback() {
  //Show/Hide feedback form
  var foot = document.querySelector("footer").style;

  if (foot.display === "none") {
    foot.display = "block";
  } else {
    foot.display = "none";
  }
}
