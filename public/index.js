document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = 'panel.html';
        } else {
            document.getElementById('loginError').textContent = result.message;
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
});
