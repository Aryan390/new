(function() {
  // console.log(theuser.innerHTML);
  let sponsoremail = document.getElementById("sponsoremail");
  let useremail = document.getElementById("useremail");
  let username = document.getElementById("username");
  let userpassword = document.getElementById("userpassword");
  let submitBtn = document.getElementById("submitBtn");
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
        theForm.innerHTML =
          "<div style='height:500px'><h2>good to go</h2></div>";
        // theuser.innerHTML = `${jsonResponse.success.name}`;
        // theToken.innerHTML = `Name: ${jsonResponse.success.name} &nbsp;  &nbsp; Email:${jsonResponse.success.email}`;
        console.log(jsonResponse);
        // theForm.style.display = "none";
        console.log("done registering!");
      }
    };

    // console.log(xhr.send()).
  }

  submitBtn.addEventListener("click", function(e) {
    e.preventDefault();
    xhrsignup();
  });

  // console.log(theuser.innerHTML);

  if (localStorage.getItem("token") !== null) {
    invite2.style.display = "none";
    together.style.display = "block";
  } else {
    //https://danielvt.com/index.html
    document.location.replace("https://danielvt.com/index.html");
  }
})();
