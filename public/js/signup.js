const usernameCreate = document.getElementById('username-create');
const passwordCreate = document.getElementById('password-create');


document.getElementById('signup-btn').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameCreate.value;
    const password = passwordCreate.value;

    if (!username || !password) {
        alert('Both a username and password are needed in order to signup!');
        return;
    }

    fetch('api/authRoutes', {
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
        alert(`Signup failed: ${error.message}`);
    });
});