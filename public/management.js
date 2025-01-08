document.getElementById('createUserForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const email = `${username}@adminpanel.com`;

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }), // Nutzerdaten an Server senden
        });

        if (response.ok) {
            // Erfolgreich erstellt
            const tableBody = document.getElementById('userTable').querySelector('tbody');
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = email;
            row.insertCell(1).textContent = password;
            this.reset();
        } else {
            // Fehler bei der Anfrage
            const error = await response.json();
            alert(`Error creating user: ${error.message}`);
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
});
