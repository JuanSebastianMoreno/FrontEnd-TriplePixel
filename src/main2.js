

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // INICIO DE SESIÓN
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            fetch("http://localhost:3000/users")
                .then(response => response.json())
                .then(users => {
                    const user = users.find(u => u.username === username && u.password === password);

                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user)); // Guardar sesión

                        if (user.role === "admin") {
                            window.location.href = "../dashboard.html"; // Redirigir admin
                        } else {
                            window.location.href = "../index.html"; // Redirigir usuario normal
                        }
                    } else {
                        alert("Usuario o contraseña incorrectos");
                    }
                })
                .catch(error => console.error("Error:", error));
        });
    }

    // REGISTRO DE USUARIO
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const newUsername = document.getElementById("newUsername").value;
            const newPassword = document.getElementById("newPassword").value;

            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: newUsername, password: newPassword, role: "user" })
            })
                .then(response => response.json())
                .then(() => {
                    alert("Registro exitoso. Serás redirigido a la página principal.");
                    window.location.href = "../index.html"; // Redirigir a index.html
                })
                .catch(error => console.error("Error:", error));
        });
    }

});



document.addEventListener("DOMContentLoaded", function () {
    const btnVolver = document.getElementById("btnVolver");

    if (btnVolver) {
        btnVolver.addEventListener("click", function () {
            window.location.href = "../index.html"; // Asegúrate de que la ruta sea correcta
        });
    }
});




