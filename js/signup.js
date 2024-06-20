document.getElementById('r-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    let btn1 = document.getElementById('sub-btn1');
    let btn2 = document.getElementById('sub-btn2');

    btn1.classList.add('d-none');
    btn2.classList.remove('d-none');
    btn2.classList.add('d-block');

    let formData = {
        firstname: document.getElementById('firstName').value,
        lastname: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    let response = await fetch('https://mailsender-backend-application.onrender.com/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    });    
    console.log(response, response.status);

    if (response.ok) {
        let res = await response.json();

        const expiresIn = 12 * 60 * 60 * 1000;
        const expiresAt = Date.now() + expiresIn;

        localStorage.setItem('token', res.token);
        localStorage.setItem('tokenExpiresAt', expiresAt);

        setTimeout(() => {
            btn2.classList.remove('d-block');
            btn1.classList.add('d-block');
            window.location.href = '/index.html';
        }, 2000);
    } else if (response.status === 401) {
        document.getElementById('err-msg').classList.remove('d-none');
        document.getElementById('err-msg').classList.remove('d-block');
        btn2.classList.remove('d-block');
        btn1.classList.add('d-block');
    } else {
        console.log(await response.json());
    };

});