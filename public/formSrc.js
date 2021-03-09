document
  .getElementsByTagName("fieldset")[0]
  .addEventListener("click", reasonVisibile);
//Check whether 'notWorking' is selected

//set max dateTime for last check
function setMaxDate() {
  let n = new Date();
  n = n.toLocaleString("sv-SE").replace(" ", "T").slice(0, -3);
  console.log(n);
  document.getElementById("inputDate").max = n;
}
setMaxDate();

//submit form to database
document.forms["statusForm"].addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(event.target.action, {
    method: "POST",
    body: new URLSearchParams(new FormData(event.target)),
    // event.target is the form
  })
    .then((res) => {
      document.getElementById("returnForm").textContent =
        "Thank you for your submission!";
      document.getElementById("returnForm").style.color = "green";
      setTimeout(() => window.close(), 2000);
    })
    .catch((error) => {
      document.getElementById("returnForm").textContent = "Error has occurred!";
      document.getElementById("returnForm").style.color = "red";
    });
});

function reasonVisibile() {
  //display and set reason to required if notWorking is selected and removed them if it is not

  x = document
    .getElementsByTagName("fieldset")[0]
    .getElementsByTagName("input")[1];

  if (x.checked) {
    document.getElementsByTagName("fieldset")[1].style.display = "flex";
    document.getElementsByTagName("input")[3].required = true;
  } else {
    document.getElementsByTagName("fieldset")[1].style.display = "none";
    x.required = false;
  }
}
