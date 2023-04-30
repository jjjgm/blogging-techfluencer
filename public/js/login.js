const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')

// const loginBtn = document.getElementById('login-btn')


document.getElementById('login-btn').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
        alert('You need to enter your username and password to login');
        return;
    }

    fetch('api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        else { window.location.href = '/homepage'; }
        return response.json();
    })
    .catch((error) => {
        alert(`Your login failed: ${error.message}`);
    });
});


