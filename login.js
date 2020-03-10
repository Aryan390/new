let usernameInput = document.getElementById("uemail");
let passwordInput = document.getElementById("password");
let submitBtn = document.getElementById("submit");
let theToken = document.getElementById("token");
let theForm = document.getElementById("theform");
let theBody = document.getElementById("body");
let theMain = document.getElementById("main");
let signOut = document.getElementById("closeBtn");
let mainNav = document.getElementById("main-nav__items");
let usernameHard = "danielvt@gmail.com";
let passwordHard = "123123";
let registerLnk = document.querySelector("#register");
let loginSection = document.getElementById("login");
// START
let sponsoremail = document.getElementById("sponsoremail");
let useremail = document.getElementById("useremail");
let username = document.getElementById("username");
let userpassword = document.getElementById("userpassword");
let submitInviteBtn = document.getElementById("submitBtn");
let theurl = "https://prueba3.com/api/register";
let invite2 = document.getElementById("invite2");
let together = document.getElementById("together");

// alert("hello");

function xhrsignup() {
  var xhr = new XMLHttpRequest();

  xhr.open("POST", theurl, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );

  var sendObject = JSON.stringify({
    name: username.value,
    email: useremail.value,
    password: userpassword.value,
    password_confirmation: userpassword.value,
    sponsor: sponsoremail.value
  });

  xhr.send(sendObject);

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let jsonResponse = JSON.parse(xhr.responseText);
      let theForm = document.getElementById("invite2");
      // theForm.replace
      theForm.innerHTML = "<div style='height:500px'><h2>good to go</h2></div>";
      // theuser.innerHTML = `${jsonResponse.success.name}`;
      // theToken.innerHTML = `Name: ${jsonResponse.success.name} &nbsp;  &nbsp; Email:${jsonResponse.success.email}`;
      console.log(jsonResponse);
      // theForm.style.display = "none";
      console.log("done registering!");

      setTimeout(function() {
        document.location.replace("https://nflchallenge.club");
      }, 2000);
    }
  };

  // console.log(xhr.send()).
}

submitInviteBtn.addEventListener("click", function(e) {
  e.preventDefault();
  xhrsignup();
});
// END

// let signOut = document.createElement("div");
let globalPollId = "";

/* Prevent defaults, its necessary, dunno why */
// Like $('a'), gets all the <a> elements in the document.
var aElements = document.getElementsByTagName("button");
// Create one function object instead of one per <a> element.
// The calling convention is the same for jQuery as for regular JS.
function preventDefaultListener(e) {
  e.preventDefault();
}
// For each a element,
for (var i = 0, n = aElements.length; i < n; ++i) {
  // register the listener to be fired on click.
  aElements[i].addEventListener("click", preventDefaultListener);
}

function getChecked(elem) {
  console.log("something");
  if (elem.checked) {
    alert("checked");
  }
}

var fnPostLogin = function() {
  // console.log("hey");
  // return;
  usernameInput = document.getElementById("uemail").value;
  passwordInput = document.getElementById("password").value;
  var xhr = new XMLHttpRequest();
  console.log("username email: " + usernameInput);

  xhr.open("POST", "https://prueba3.com/api/login", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.addEventListener("load", function() {
    var responseObject = JSON.parse(this.response);
    console.log(responseObject);
    if (responseObject.access_token) {
      theToken.innerHTML =
        "Accepted user " + responseObject.access_token.slice(0, 19) + "....";
      localStorage.setItem("token", responseObject.access_token);
      theForm.style.display = "none";
      // thePolls.style.display = "block";
      // theToken.style.display = "block";
      // signOut.style.display = "inline-block";
      setTimeout(function() {
        mainHeaderOpen();
      }, 500);
      // mainHeaderOpen();
      signOut.style.display = "inline-block";
      // mainNav.style.display = "inline-block";
    } else {
      // content.innerHTML = "No token received";
    }
  });

  var sendObject = JSON.stringify({
    email: usernameInput,
    password: passwordInput
  });

  xhr.send(sendObject);

  // console.log("going to send");
  // signOut.appendChild(document.createTextNode("Close"));
  // document.getElementById("body").prepend(signOut);
  // signOut.className = "signout";

  // console.log("thepolls display block");
  // document.getElementById("thepolls").style.display = "block";
  // signOut.appendChild(document.createTextNode("Close"));
  document.getElementById("body").prepend(signOut);
  // theToken.style.display = "block";
  // signOut.className = "signout";
  console.log("end the login process");
};

var fnSignOut = function(token) {
  console.log("Sign out");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://prueba3.com/api/logout", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.setRequestHeader("Authorization", "Bearer " + token);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      // document.getElementById("polls").innerHTML = xhr.responseText;
    }
  };
  xhr.send();

  localStorage.removeItem("token");

  // document.location.replace("http://127.0.0.1:5500/index.html");
};

var fnAddEventListeners = function() {
  signOut.addEventListener("click", fnSignOut);
  submitBtn.addEventListener("click", fnPostLogin);
  // thePolls.addEventListener("click", function () {
  //     fnGetPolls(localStorage.getItem("token"));
  // });
  // signOut.addEventListener("click", function () {
  //     fnSignOut(localStorage.getItem("token"));
  // });
};

function mainHeaderOpen() {
  let mainH = document.querySelector(".main-header");
  let mainHb = document.querySelector(".main-header button");
  let mainHba = document.querySelector(".main-header a");
  let jumbotron = document.querySelector(".jumbotron");

  mainH.style.display = "flex";
  jumbotron.style.display = "block";
  // mainHb.style.display = "inline-block";
  // mainHba.style.display = "inline-block";
}

if (localStorage.getItem("token") !== null) {
  theForm.style.display = "none";
  mainHeaderOpen();
  // console.log("inside looking for the token...");
  // var xhr = new XMLHttpRequest();

  // xhr.open("GET", "https://prueba3.com/api/user", true);
  // xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  // xhr.setRequestHeader(
  //     "Authorization",
  //     "Bearer " + localStorage.getItem("token")
  // );

  // xhr.onreadystatechange = function () {
  //     if (this.readyState == 4 && this.status == 200) {
  //         let jsonResponse = JSON.parse(xhr.responseText);
  //         // theToken.innerHTML = `Name: ${jsonResponse.success.name} &nbsp;  &nbsp; Email:${jsonResponse.success.email}`;
  //         console.log(jsonResponse);
  //         // theForm.style.display = "none";
  //     }
  // };
  // xhr.send();

  console.log("thepolls display block");
  // document.getElementById("thepolls").style.display = "block";
  // signOut.appendChild(document.createTextNode("Close"));
  // document.getElementById("body").prepend(signOut);
  // theToken.style.display = "block"; t
  // signOut.className = "signout";
  // mainNav.style.display = "inline-block";
  signOut.style.display = "inline-block";
  theMain.style.height = "100%";
} else {
}
fnAddEventListeners();

registerLnk.addEventListener("click", function() {
  // alert("hello");
  let loginSection = document.getElementById("login");
  let invite2 = document.getElementById("invite2");

  loginSection.style.display = "none";
  invite2.style.display = "block";
});
