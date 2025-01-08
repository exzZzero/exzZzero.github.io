// Array, um die Log-Einträge zu speichern
let logs = JSON.parse(localStorage.getItem('logs')) || []; // Logs aus dem localStorage laden oder leeres Array

// Angenommene Admin-Login-Daten
const adminEmail = "admin@adminpanel.com"; // Hier verwenden wir einen festen Wert als Beispiel

// Logs beim Laden der Seite anzeigen
window.addEventListener('load', displayLogs);

// Beim Absenden des Formulars
document.getElementById('logForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    // Formulardaten sammeln
    const username = document.getElementById('username').value;
    const reason = document.getElementById('reason').value;
    const duration = document.getElementById('duration').value;
    const link = document.getElementById('link').value;
    const notes = document.getElementById('notes').value;

    // Erstellen des Log-Objekts
    const logEntry = {
        username,
        reason,
        duration,
        link,
        notes,
        issuedBy: adminEmail // Admin-Username hinzufügen
    };

    // Hinzufügen des Logs zum Array
    logs.push(logEntry);

    // Logs im localStorage speichern
    localStorage.setItem('logs', JSON.stringify(logs));

    // Log in der Tabelle anzeigen
    displayLogs();

    // Formular zurücksetzen
    document.getElementById('logForm').reset();
});

// Funktion zum Anzeigen der Logs in der Tabelle
function displayLogs() {
    const tableBody = document.getElementById('logTable').getElementsByTagName('tbody')[0];

    // Leeren der Tabelle, um die aktuellen Logs neu hinzuzufügen
    tableBody.innerHTML = '';

    // Jeden Log-Eintrag in der Tabelle anzeigen
    logs.forEach((log, index) => {
        const row = tableBody.insertRow();

        // Zellen für jeden Log-Eintrag erstellen
        row.insertCell(0).textContent = log.username;
        row.insertCell(1).textContent = log.reason;
        row.insertCell(2).textContent = log.duration;

        // Evidence Link als klickbaren Text
        const linkCell = row.insertCell(3);
        const linkElement = document.createElement('a');
        linkElement.href = log.link;
        linkElement.target = "_blank"; // Öffnet Link in neuem Tab
        linkElement.textContent = "Link";
        linkCell.appendChild(linkElement);

        // Zusätzliche Notizen
        row.insertCell(4).textContent = log.notes;

        // "Issued by"-Zelle: Admin-Name anzeigen
        row.insertCell(5).textContent = log.issuedBy;

        // "Delete"-Button erstellen
        const deleteCell = row.insertCell(6);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button"; // Optional: CSS-Klasse für Styling
        deleteButton.onclick = () => deleteLog(index); // Löschen des Logs beim Klick
        deleteCell.appendChild(deleteButton);
    });
}

// Funktion zum Löschen eines spezifischen Logs
function deleteLog(index) {
    // Entfernen des Logs aus dem Array
    logs.splice(index, 1);

    // Logs im localStorage aktualisieren
    localStorage.setItem('logs', JSON.stringify(logs));

    // Tabelle neu anzeigen
    displayLogs();
}

// Funktion zum Löschen aller Logs
function clearLogs() {
    // Logs im Speicher und localStorage löschen
    logs = [];
    localStorage.removeItem('logs');

    // Tabelle aktualisieren
    displayLogs();

    // Optionale Benachrichtigung
    alert("All logs have been cleared.");
}

function logout() {
    localStorage.removeItem('loggedInUser'); // Entferne den aktuellen Nutzer
    window.location.href = 'index.html'; // Zurück zur Login-Seite
}
