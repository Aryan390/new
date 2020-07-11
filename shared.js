(function () {
  let signOut = document.getElementById("closeBtn");
  let mainNav = document.getElementById("main-nav__items");
  let mobileNavCloseBtn = document.getElementById("closeMobileNav");
  let togglemobileNav = document.querySelector(".toggle-button");
  let mobileNav = document.querySelector(".mobile-nav");
  let backdrop = document.querySelector(".backdrop");
  let closeBtn = document.querySelector("#closeBtn");
  let userEmail = "null";

  // let theuser = document.getElementById("theuser");

  let theurl = "https://prueba3.com/api/user";

  var fnSignOut = function (token) {
    console.log("Sign out");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://prueba3.com/api/logout", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        // document.getElementById("polls").innerHTML = xhr.responseText;
      }
    };
    xhr.send();

    localStorage.removeItem("token");

    document.location.replace("https://danielvt.com/index.html");

    // document.location.replace("https://127.0.0.1:5500/index.html");
  };

  // Promise
  function xhrrequestUser() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://prueba3.com/api/user", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonResponse = JSON.parse(xhr.responseText);
        //theToken.innerHTML = `Name: ${jsonResponse.success.name} &nbsp;  &nbsp; Email:${jsonResponse.success.email}`;
        console.log(jsonResponse.success.email);
        window.sponsoremail = jsonResponse.success.email;
      }
    };
    xhr.send();
  }

  if (localStorage.getItem("token") !== null) {
    // theForm.style.display = "none";
    console.log("Token found...");
    closeBtn.style.display = "flex";

    xhrrequestUser();

    //console.log(x.email);
    //console.log(x);

    console.log("thepolls display block");
    // document.getElementById("thepolls").style.display = "block";
    // signOut.appendChild(document.createTextNode("Close"));
    // document.getElementById("body").prepend(signOut);
    // theToken.style.display = "block"; t
    // signOut.className = "signout";
    signOut.style.display = "inline-block";
    // mainNav.style.display = "block";
    // theMain.style.height = "100%";
  }

  togglemobileNav.addEventListener("click", function () {
    // mobileNav.style.display = "block";
    // backdrop.style.display = "block";
    console.log("something");
    mobileNav.classList.add("open");
    backdrop.classList.add("open");
  });

  mobileNavCloseBtn.addEventListener("click", closeModal);

  backdrop.addEventListener("click", closeModal);

  function closeModal() {
    console.log("close modal");
    //   backdrop.style.display = "none";
    //   modal.style.display = "none";
    // if (modal) {
    //   modal.classList.remove("open");
    // }
    mobileNav.classList.remove("open");
    backdrop.classList.remove("open");
  }

  closeBtn.addEventListener("click", fnSignOut);
})();
