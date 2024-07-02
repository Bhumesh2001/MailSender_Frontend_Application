document.addEventListener("DOMContentLoaded", async function () {
    await loadComponent("navbar.html", "navbar-placeholder");
    await loadComponent("footer.html", "footer-placeholder");
});

async function loadComponent(url, placeholderId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        };
        const data = await response.text();
        document.getElementById(placeholderId).innerHTML = data;

        const login_btn = document.getElementById('login_btn');
        const signup_btn = document.getElementById('signup_btn');
        const user = document.getElementById('default-user');

        const token = localStorage.getItem('token');
        if (token) {
            const expiresAt = localStorage.getItem('tokenExpiresAt');
            if (expiresAt && Date.now() > parseInt(expiresAt)) {
                console.log('Token has expired');
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiresAt');

                login_btn.classList.remove('d-none');
                login_btn.classList.add('d-block');

                signup_btn.classList.remove('d-none');
                signup_btn.classList.add('d-block');

                user.classList.remove('d-block');
                user.classList.add('d-none');

            } else {
                login_btn.classList.add('d-none');
                signup_btn.classList.add('d-none');

                user.classList.remove('d-none');
                user.classList.add('d-block');
            };
        };
        document.getElementById('user-logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiresAt');

            login_btn.classList.remove('d-none');
            login_btn.classList.add('d-block');

            signup_btn.classList.remove('d-none');
            signup_btn.classList.add('d-block');

            user.classList.remove('d-block');
            user.classList.add('d-none');
        });

    } catch (error) {
        console.error('Error fetching component:', error);
    };
};
