async function loadUsers() {
    let response = await fetch("https://frontend-triplepixel-1.onrender.com/users");
    let users = await response.json();

    let userList = document.getElementById("usersList");
    userList.innerHTML = "";

    users.forEach(user => {
        let li = document.createElement("li");
        li.textContent = `${user.username} (${user.role})`;

        if (user.role !== "admin") {
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Eliminar";
            deleteBtn.onclick = async () => {
                await fetch(`https://frontend-triplepixel-1.onrender.com/users/${user.id}`, { method: "DELETE" });

                loadUsers();
            };
            li.appendChild(deleteBtn);
        }

        userList.appendChild(li);
    });
}

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../index.html";
});

loadUsers();



const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
    alert("Acceso denegado. Debes ser administrador.");
    window.location.href = "../index.html"; // Redirigir si no es admin
}
