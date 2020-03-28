const textsample = "text sample output";
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let submitBtn = document.getElementById("submit");
let theForm = document.getElementById("theform");
let thePolls = document.getElementById("polls");
let theToken = document.getElementById("token");
var content = document.querySelector("#token");
let usernameHard = "danielvt@gmail.com";
let passwordHard = "123123";
let signOut = document.createElement("div");
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

var fnGetPolls = function(token) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://prueba3.com/api/viewPolls", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.setRequestHeader("Authorization", "Bearer " + token);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:

      // # Clone the template
      let thePollsDiv = document.getElementById("thePollsHTML");
      let clone = thePollsDiv.content.cloneNode(true);
      // document.getElementById("polls").innerHTML =
      //   "<h3>Wait 'til you see </h3>";

      // # build the answers response with the XHR or ajx response
      let objresponse = JSON.parse(xhr.responseText);
      let answers = "";

      objresponse.data[0].pollanswers.map(function(item) {
        answers += `<div class="form-check">
                <label class="form-check-label" for="radio1">
                    <input type="radio" class="form-check-input" style="margin-left:-10px" id="answer${item.myElemId}" name="optradio" value="${item.id}" >&nbsp;${item.answer}
                  </label>
                </div>`;
      });

      //     objresponse.data[0].pollanswers.forEach(element => {
      //         this.myElemId = element.id;

      //         answers += `<div class="form-check">
      //   <label class="form-check-label" for="radio1">
      //       <input type="radio" class="form-check-input" style="margin-left:-10px" id="answer${this.myElemId}" name="optradio" value="${element.id}" >&nbsp;${element.answer}
      //     </label>
      //   </div>`;

      // clone.getElementById("question").innerHTML = objresponse.data[0].question;
      clone.getElementById("questions").dataset.pollId = objresponse.data[0].id;
      globalPollId = objresponse.data[0].id;
      document.getElementById("pollsBtn").style.display = "none";
      clone.getElementById("answers2").innerHTML = answers;

      document.body.append(clone);

      document.getElementsByName("optradio").forEach(e => {
        e.addEventListener("click", fnPostPoll);
      });

      document.getElementsByName("optradio2").forEach(e => {
        e.addEventListener("click", fnPostPoll);
      });

      let questions = document.getElementById("questions");

      setTimeout(() => {
        questions.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };
  xhr.send();
};

var fnNextPoll = function() {
  // let pollId = document.getElementById("questions").dataset.pollId;
  console.log("globalPollId: " + globalPollId);
  let token = localStorage.getItem("token");
  var xhr = new XMLHttpRequest();

  let newPollId = parseInt(globalPollId) + 1;

  xhr.open("GET", "https://prueba3.com/api/viewPoll/" + newPollId, true);

  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.setRequestHeader("Authorization", "Bearer " + token);
  xhr.addEventListener("load", function() {
    let responseObject = JSON.parse(this.response);
    console.log(responseObject);
  });

  console.log("going to send");
  xhr.send();
};

function getChecked(elem) {
  console.log("something");
  if (elem.checked) {
    alert("checked");
  }
}
var fnPostPoll = function(e) {
  let pollId = document.getElementById("questions").dataset.pollId;
  let pollAnswerId = e.target.value;
  let token = localStorage.getItem("token");
  var sendObject;
  var sendObject = JSON.stringify({
    pollId: pollId,
    pollAnswerId: pollAnswerId
  });
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "https://prueba3.com/api/postPolls", true);

  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.setRequestHeader("Authorization", "Bearer " + token);
  xhr.addEventListener("load", function() {
    let responseObject = JSON.parse(this.response);
    let answers2 = document.getElementById("answers2");
    console.log("pollId: " + pollId);
    console.log("globalPollId: " + globalPollId);

    answers2.innerHTML = "";
    Object.entries(responseObject).forEach(function(key, value) {
      // console.log("key0  " + key[0]);
      // console.log(key[1]);
      // console.log(key[1].sum);
      // console.log(key[1].answer);
      if (key[1].sum) {
        answers2.innerHTML =
          answers2.innerHTML +
          `<strong>${key[1].answer}</strong><span class="pull-right">${parseInt(
            key[1].sum * 100
          )}</span>
    <div class="progress progress-danger active">
      <div class="bar" style="width:${parseInt(key[1].sum * 100)}%;"></div>
    </div>`;
      }
    });
  });

  console.log(sendObject);
  console.log("going to send");
  xhr.send(sendObject);
  let nextPollBtn = document.getElementById("nextPollBtn");

  setTimeout(() => {
    console.log("scrolling into view");
    nextPollBtn.scrollIntoView({ behavior: "smooth" });
  }, 333);

  nextPollBtn.addEventListener("click", fnNextPoll);
};

var fnPostLogin = function() {
  usernameInput = document.getElementById("username").value;
  passwordInput = document.getElementById("password").value;
  var xhr = new XMLHttpRequest();

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
      thePolls.style.display = "block";
      theToken.style.display = "block";
      signOut.className = "signout";
    } else {
      content.innerHTML = "No token received";
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
  document.getElementById("pollsBtn").style.display = "block";
  signOut.appendChild(document.createTextNode("Close"));
  document.getElementById("body").prepend(signOut);
  // theToken.style.display = "block";
  signOut.className = "signout";
};

var fnSignOut = function(token) {
  xhr.open("POST", "https://prueba3.com/api/logout", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.setRequestHeader("Authorization", "Bearer " + token);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      document.getElementById("polls").innerHTML = xhr.responseText;
    }
  };
  xhr.send();

  localStorage.removeItem("token");

  document.location.replace("https://danielvt.com/thePolls.html");
};

var fnAddEventListeners = function() {
  signOut.addEventListener("click", fnSignOut);
  submitBtn.addEventListener("click", fnPostLogin);
  thePolls.addEventListener("click", function() {
    fnGetPolls(localStorage.getItem("token"));
  });
  signOut.addEventListener("click", function() {
    fnSignOut(localStorage.getItem("token"));
  });
};

if (localStorage.getItem("token") !== null) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://prueba3.com/api/user", true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let jsonResponse = JSON.parse(xhr.responseText);
      theToken.innerHTML = `Name: ${jsonResponse.success.name} &nbsp;  &nbsp; Email:${jsonResponse.success.email}`;
      console.log(jsonResponse);
      theForm.style.display = "none";
    }
  };
  xhr.send();

  console.log("thepolls display block");
  document.getElementById("pollsBtn").style.display = "block";
  signOut.appendChild(document.createTextNode("Close"));
  document.getElementById("body").prepend(signOut);
  theToken.style.display = "block";
  signOut.className = "signout";
}

fnAddEventListeners();
