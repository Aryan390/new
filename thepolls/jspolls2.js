let globalPollId = "";
let thetoken = localStorage.getItem("token");
let token = document.getElementById("thetoken");
token.innerHTML = thetoken;
let data = {
  poll: [
    {
      question: "Dummy question?",
      answers: ["Answer one... dummy answer.", "Second answer."]
    }
  ],
  globalpollid: "0"
};

let templatequestion = function() {
  if (data.poll.question == "") {
    return "<h2>Dummy question?</h2><div>Dummy answers</div>";
  }

  return "<h2>" + data.poll.question + "</h2>";
};

let templateglobalpollid = function() {
  if (data.globalpollid == "0") {
    return "0";
  }

  return data.globalpollid;
};

let templateanswers = function() {
  if (data.poll.pollanswers == "") {
    return "There are no available choices... loading...";
  }

  // console.dir(data.poll);

  return data.poll.answers
    .map(function(answer) {
      // console.log(answer);
      return `<div><label for='radio1'><input type='radio' style='margin-left:-10px' id='answer${answer.id}' name='optradio' value='${answer.id}' >&nbsp;${answer.answer}</label></div>`;
    })
    .join("");
};

let templateresults = function() {
  console.log("display templateresults....");
  console.log(data.poll.answers);
  return Object.entries(data.poll.answers)
    .map(function(key) {
      // return `<strong>10000</strong>`;
      console.log(key[0]);
      if (key[0] == "pollId") {
        return;
        // console.log(key);
        // data.globalpollid = key[1];
        // continue;
      }

      // return `<div><strong>${key[1].answer}</strong><span>${parseInt(key[1].sum * 100)}</span><div><div style="width:${parseInt(key[1].sum * 100)}%;background:red;"></div></div></div>`;
      return `<div><strong>${
        key[1].answer
      }</strong><div><div style="width:${parseInt(key[1].sum * 100)}%;background:red;"></div></div></div>`;
    })
    .join("");
};

var render = function() {
  console.log("I am rendering....");
  let thequess = document.getElementById("thequestion");
  let theanss = document.getElementById("theanswers");
  // thequess
  globalPollId = templateglobalpollid();
  thequess.innerHTML = templatequestion();
  theanss.innerHTML = templateanswers();
};

var renderresults = function() {
  console.log("I am rendering results....");
  // let thequess = document.getElementById("thequestion");
  let theanss = document.getElementById("theanswers");
  // thequess
  // globalPollId = templateglobalpollid();
  // thequess.innerHTML = templatequestion();
  theanss.innerHTML = templateresults();
};

var renderend = function() {
  let theBtn = document.getElementById("pollnextBtn");
  let thequess = document.getElementById("thequestion");
  let theanss = document.getElementById("theanswers");

  theBtn.style.display = "none";
  thequess.innerHTML = "El final de la encuesta";
  theanss.innerHTML = "Bye bye";

  return;
};

// console.log(localStorage.getItem("token"));
// # Clone the template
var fnPostPoll = function(e) {
  let pollId = data.globalpollid;
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
    let objresponse = JSON.parse(this.response);
    // console.log(objresponse.pollId);

    // Object.entries(objresponse).forEach(function (item) {
    //     console.dir(item);
    // });
    // data.globalpollid = objresponse.pollId;
    // data.poll.question = objresponse.data.question;
    data.poll.answers = objresponse;
    console.dir(objresponse);
    renderresults();
  });

  console.log(sendObject);
  console.log("going to send");
  xhr.send(sendObject);

  let nextPollBtn = document.getElementById("pollnextBtn");

  // setTimeout(() => {
  //   console.log("scrolling into view");
  //   nextPollBtn.scrollIntoView({ behavior: "smooth" });
  // }, 333);

  nextPollBtn.addEventListener("click", fnGetPolls);
};

// var fnNextPoll = function () {
//     // let pollId = document.getElementById("questions").dataset.pollId;
//     console.log("globalPollId: " + globalPollId);
//     let thetoken = localStorage.getItem("token");
//     var xhr = new XMLHttpRequest();

//     let newPollId = parseInt(globalPollId) + 1;

//     xhr.open("GET", "https://prueba3.com/api/viewPoll/" + newPollId, true);

//     xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
//     xhr.setRequestHeader("Authorization", "Bearer " + thetoken);
//     xhr.addEventListener("load", function () {
//         let responseObject = JSON.parse(this.response);
//         console.log(responseObject);
//     });

//     console.log("going to send");
//     xhr.send();
// };

var fnGetPolls = function(thetoken) {
  console.log("inside the polls fn...");
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://prueba3.com/api/viewPoll/" + (data.globalpollid + 1),
    true
  );

  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );

  xhr.onreadystatechange = function() {
    console.log("on readystatechange");
    if (this.readyState == 4 && this.status == 200) {
      let objresponse = JSON.parse(xhr.responseText);
      if (typeof objresponse.data === "undefined") {
        renderend();
        return;
      }
      // console.log(objresponse.data);
      data.globalpollid = objresponse.data.id;
      data.poll.question = objresponse.data.question;
      data.poll.answers = objresponse.data.pollanswers;

      render();
      // console.log(data.poll.question);
      // console.log(data.globalpollid);
      // console.log(xhr.responseText);
      // // Clone the element to display the poll.
      // let thepollstemplate = document.getElementById("thepollstemplate");
      // // console.dir(thepollstemplate);
      // let clonedPolls = thepollstemplate.content.cloneNode(true);

      // // let clone = thepollstemplate.content.cloneNode(true);

      // // Build the answers and question obj with XHR or AJAX response
      // let objresponse = JSON.parse(xhr.responseText);
      // let theanswers = "";

      // objresponse.data[0].pollanswers.map(function (item) {
      //     theanswers += `<div ><label for="radio1"><input type="radio" style="margin-left:-10px" id="answer${item.myElemId}" name="optradio" value="${item.id}" >&nbsp;${item.answer}</label></div>`
      // });

      // // console.log(theanswers);
      // // From the clone made above , getElementByid questions, questions.dataset.pollid, answers2 and set innerHTML and such
      // // clone.getElementById("question").innerHTML = objresponse.data[0].question;
      // // # Set the poll or globalPollId id from objresponse.data[0].id
      // // and append to body

      // clonedPolls.getElementById("thequestion").dataset.pollId = objresponse.data[0].id;
      // clonedPolls.getElementById("thequestion").innerHTML = "<h2>" + objresponse.data[0].question + "</h2>";
      // clonedPolls.getElementById("theanswers").innerHTML = theanswers;

      // globalPollId = objresponse.data[0].id;

      // // document.getElementById("pollsBtn").style.display = "none";

      // // document.body.append(clonedPolls);
      // let polls = document.getElementById("thepolls");
      // // polls.innerHTML(clonedPolls);
      // polls.replaceWith(clonedPolls);
      // // .replaceChild(clonedPolls, document.getElementById("thepolls").childNodes[0]);

      // // Set Listeners and then scroll into view
      document.getElementsByName("optradio").forEach(e => {
        e.addEventListener("click", fnPostPoll);
      });

      // let questions = document.getElementById("thequestion");
      // // setTimeout(() => {
      // //   questions.scrollIntoView({ behavior: "smooth" });
      // // }, 300);
    }
  };

  xhr.send();
};

console.log("getting the polls...");

if (localStorage.getItem("token") !== null) {
  fnGetPolls();
} else {
  document.location.replace("https://danielvt.com/index.html");
}
