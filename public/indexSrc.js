document
  .getElementsByClassName("indexButton")[0]
  .addEventListener("click", feedback);

function updateList(item) {
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

function feedback() {
  //Show/Hide feedback form
  var foot = document.querySelector("footer").style;

  if (foot.display === "none") {
    foot.display = "block";
  } else {
    foot.display = "none";
  }
}

document.forms["feedbackForm"].addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(event.target.action, {
    method: "POST",
    body: new URLSearchParams(new FormData(event.target)),
    // event.target is the form
  })
    .then((res) => {
      document.getElementById("returnFeedback").textContent = "Thank you for your feedback!";
    })
    .catch((error) => {
      document.getElementById("returnFeedback").textContent = "Error has occurred!";
      document.getElementById("returnFeedback").style.color = "red";
    });
});