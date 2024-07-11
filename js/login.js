document.getElementById("l-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const lbtn1 = document.getElementById("login-btn1");
  const lbtn2 = document.getElementById("login-btn2");
  const err_show = document.getElementById("err_msg");

  lbtn1.classList.add("d-none");
  lbtn2.classList.remove("d-none");
  lbtn2.classList.add("d-block");

  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  let response = await fetch(
    "https://mailsender-backend-application.onrender.com/user/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (response.ok) {
    const res = await response.json();
    const expiresIn = 12 * 60 * 60 * 1000;
    const expiresAt = Date.now() + expiresIn;

    localStorage.setItem("token", res.token);
    localStorage.setItem("tokenExpiresAt", expiresAt);

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 2000);
  } else if (response.status === 500) {
    err_show.textContent = "Internal server error";
  } else {
    err_show.classList.remove("d-none");
    err_show.classList.add("d-block");

    lbtn1.classList.remove("d-none");
    lbtn1.classList.add("d-blcok");

    lbtn2.classList.remove("d-block");
    lbtn2.classList.add("d-none");
  }
});
