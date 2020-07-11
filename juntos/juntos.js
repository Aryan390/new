(function () {
  // console.log(theuser.innerHTML);
  let sponsoremail = document.getElementById("sponsoremail");
  let useremail = document.getElementById("useremail");
  let username = document.getElementById("username");
  let userpassword = document.getElementById("userpassword");
  let submitBtn = document.getElementById("submitBtn");
  let theurl = "https://prueba3.com/api/selfregister";
  let invitees = document.getElementById("invitees");
  let together = document.getElementById("together");
  let passportUsername = "passportUsername";
  let passportEmail = "passportEmail";
  let getusersinvitedBtn = document.getElementById("getusersinvitees");
  // alert("hello");

  function selfregister() {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", theurl, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var sendObject = JSON.stringify({
      name: username.value,
      email: useremail.value,
      sponsor: window.sponsoremail,
      password: "123123",
    });

    xhr.send(sendObject);

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        inviteResponse();
        console.log("before response text");

        let jsonResponse = JSON.parse(xhr.responseText);

        console.log("before grabbing invite2");

        let theForm = document.getElementById("invite2");
        // theForm.replace
        theForm.innerHTML =
          "<div style='height:200px'><h2>good to go</h2></div>";
        // theuser.innerHTML = `${jsonResponse.success.name}`;
        // theToken.innerHTML = `Name: ${jsonResponse.success.name} &nbsp;  &nbsp; Email:${jsonResponse.success.email}`;
        console.log(jsonResponse);
        // theForm.style.display = "none";
        console.log("done registering!");
        inviteResponse();
      }
    };

    // console.log(xhr.send()).
  }
  function displayemails(index, item) {
    invitees.innerHTML += "<div>" + index.email + "</div>";
  }

  function usersinvited() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://prueba3.com/api/usersinvited", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonResponse = JSON.parse(xhr.responseText);
        // console.log(xhr.responseText);
        console.log(jsonResponse);
        jsonResponse.forEach(displayemails);

        // jsonResponse.each(email => {
        //   console.log(email);
        // });
        console.log("done registering!");
      }
    };

    var sendObject = JSON.stringify({
      email: window.sponsoremail,
    });

    xhr.send(sendObject);
  }

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    selfregister();
  });

  getusersinvitedBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // usersinvited();
    // inviteResponse();
  });

  // Alert when user invited response from api
  function inviteResponse() {
    let alert = document.getElementById("popup1");
    alert.classList.toggle("visible");

    let popup1 = document.getElementById("popup1");
    popup1.addEventListener("click", function () {
      popup1.classList.toggle("visible");
    });
  }

  // console.log(theuser.innerHTML);

  if (localStorage.getItem("token") !== null) {
    //invite2.style.display = "none";
    //together.style.display = "block";
    console.log("asking for users invited");
  } else {
    // document.location.replace("https://127.0.0.1:5500/index.html");
    document.location.replace("https://danielvt.com/index.html");
  }
})();
