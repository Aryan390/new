let globalPollId = "";
let thetoken = localStorage.getItem("token");
let token = document.getElementById("thetoken");
token.innerHTML = thetoken;
let data = { poll: [{ question: "", answers: "" }] }

let templatequestion = function () {
  if (data.poll.question == "") {
    return "<h2>Dummy question?</h2><div>Dummy answers</div>";
  }

  return "<h2>" + data.poll.question + "</h2><div>" + data.poll.answers + "</div>";
}

let templateanswers = function () {
  if (data.poll.answers == "") {
    return "There are no available choices... loading...";

  }
  return "<div>" + data.poll.answers.map(function (answer) {
    return "<div>" + answer + "</div>";
  }).join("") + "</div>";
}

var render = function () {
  let thequestion = document.getElementById("thequestion");
  let theanswers = document.getElementById("theanswers");
}

// console.log(localStorage.getItem("token"));
// # Clone the template
var fnPostPoll = function (e) {
  let pollId = document.getElementById("thequestion").dataset.pollId;
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
  xhr.addEventListener("load", function () {

    let responseObject = JSON.parse(this.response);
    let answers2 = document.getElementById("theanswers");
    console.log("pollId: " + pollId);
    console.log("globalPollId: " + globalPollId);
    console.log(responseObject);


    answers2.innerHTML = "";
    Object.entries(responseObject).forEach(function (key, value) {
      // console.log("key0  " + key[0]);
      // console.log(key[1]);
      // console.log(key[1].sum);
      // console.log(key[1].answer);
      if (key[1].sum) {
        answers2.innerHTML =
          answers2.innerHTML +
          `<strong>${key[1].answer}</strong><span>${parseInt(
            key[1].sum * 100
          )}</span>
                <div>
                <div style="width:${parseInt(key[1].sum * 100)}%;"></div>
                </div>`;
      }
    });

  });

  console.log(sendObject);
  console.log("going to send");
  xhr.send(sendObject);

  let nextPollBtn = document.getElementById("pollnextBtn");

  // setTimeout(() => {
  //   console.log("scrolling into view");
  //   nextPollBtn.scrollIntoView({ behavior: "smooth" });
  // }, 333);

  nextPollBtn.addEventListener("click", fnNextPoll);
};


var fnNextPoll = function () {
  // let pollId = document.getElementById("questions").dataset.pollId;
  console.log("globalPollId: " + globalPollId);
  let thetoken = localStorage.getItem("token");
  var xhr = new XMLHttpRequest();

  let newPollId = parseInt(globalPollId) + 1;

  xhr.open("GET", "https://prueba3.com/api/viewPoll/" + newPollId, true);

  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.setRequestHeader("Authorization", "Bearer " + thetoken);
  xhr.addEventListener("load", function () {
    let responseObject = JSON.parse(this.response);
    console.log(responseObject);
  });

  console.log("going to send");
  xhr.send();
};

var fnGetPolls = function (thetoken) {
  console.log("inside the polls fn...");
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://prueba3.com/api/viewPolls", true);

  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

  xhr.onreadystatechange = function () {

    console.log("on readystatechange");
    if (this.readyState == 4 && this.status == 200) {
      // Clone the element to display the poll.
      let thepollstemplate = document.getElementById("thepollstemplate");
      // console.dir(thepollstemplate);
      let clonedPolls = thepollstemplate.content.cloneNode(true);

      // let clone = thepollstemplate.content.cloneNode(true);

      // Build the answers and question obj with XHR or AJAX response
      let objresponse = JSON.parse(xhr.responseText);
      let theanswers = "";

      objresponse.data[0].pollanswers.map(function (item) {
        theanswers += `<div ><label for="radio1"><input type="radio" style="margin-left:-10px" id="answer${item.myElemId}" name="optradio" value="${item.id}" >&nbsp;${item.answer}</label></div>`
      });

      // console.log(theanswers);
      // From the clone made above , getElementByid questions, questions.dataset.pollid, answers2 and set innerHTML and such
      // clone.getElementById("question").innerHTML = objresponse.data[0].question;
      // # Set the poll or globalPollId id from objresponse.data[0].id
      // and append to body

      clonedPolls.getElementById("thequestion").dataset.pollId = objresponse.data[0].id;
      clonedPolls.getElementById("thequestion").innerHTML = "<h2>" + objresponse.data[0].question + "</h2>";
      clonedPolls.getElementById("theanswers").innerHTML = theanswers;

      globalPollId = objresponse.data[0].id;

      // document.getElementById("pollsBtn").style.display = "none";

      // document.body.append(clonedPolls);
      let polls = document.getElementById("thepolls");
      // polls.innerHTML(clonedPolls);
      polls.replaceWith(clonedPolls);
      // .replaceChild(clonedPolls, document.getElementById("thepolls").childNodes[0]);

      // Set Listeners and then scroll into view
      document.getElementsByName("optradio").forEach(e => {
        e.addEventListener("click", fnPostPoll);
      });

      let questions = document.getElementById("thequestion");

      // setTimeout(() => {
      //   questions.scrollIntoView({ behavior: "smooth" });
      // }, 300);


    }
  }

  xhr.send();
}



fnGetPolls();
console.log("getting the polls...");
