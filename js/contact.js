document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const sendBtn = document.getElementById("btn-submit");
    const notfyBtn = document.getElementById('notify');

    const templateParams = {
      from_name: document.getElementById("name").value,
      email_id: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    emailjs.send("service_6lmolpb", "template_8octgrn", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        notfyBtn.style.display = 'block';
        setTimeout(() => {
          notfyBtn.style.display = 'none';
        }, 9000)
        sendBtn.blur();
        event.target.reset();
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Oops... " + error.text);
      }
    );
  });
