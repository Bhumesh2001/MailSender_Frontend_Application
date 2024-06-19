document.getElementById('r-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    let formData = {
        firstname: document.getElementById('firstName').value.trim(),
        lastname: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
    };
    const btn1 = document.getElementById('sub-btn1');
    const btn2 = document.getElementById('sub-btn2');

    let response = await fetch('https://mailsender-backend-application.onrender.com/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    });

    if (response.ok) {
        let res = await response.json();
        btn1.classList.add('d-none');
        btn2.classList.remove('d-none');
        btn2.classList.add('d-block');

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
    } else {
        console.log(await response.json());
    };

});