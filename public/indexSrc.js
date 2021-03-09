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

//retrieve data from database and update to index
fetch("/getStatus")
  .then((response) => response.json())
  .then((response) => {
    const data = response;
    let status = data["status"];
    let contributor = data["name"];
    let reason = data["reason"];
    let date = data["submitted"];

    //if it is working, hide reason
    if (status) {
      document.getElementById("rowReason").style.display = "none";
      document.getElementById("status").style.color = "green";
      document.getElementById("status").textContent = "Working";
    } else {
      document.getElementById("rowReason").style.display = "block";
      document.getElementById("status").style.color = "red";
      document.getElementById("status").textContent = "Not Working";
    }
    document.getElementById("contributor").textContent = contributor;
    document.getElementById("dateTime").textContent = date.replace("T", " ");
  })
  .catch((err) => {
    console.log("Error:", error);
  });

function feedback() {
  //Show/Hide feedback form
  var foot = document.querySelector("footer").style;

  if (foot.display === "none") {
    foot.display = "block";
  } else {
    foot.display = "none";
  }
}
