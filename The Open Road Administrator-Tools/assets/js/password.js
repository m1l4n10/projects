function handleLogin() {
            const user = document.getElementById('username').value;
            const pass = document.getElementById('password').value;
            if (!user || !pass) {
                alert('Bitte Benutzername und Passwort eingeben.');
                return;
            }
            alert('Anmeldung für: ' + user);
        }