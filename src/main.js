document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            formMessage.textContent = 'Por favor, complete todos los campos.';
            return;
        }

        if (!validateEmail(email)) {
            formMessage.textContent = 'Por favor, ingrese un correo electrónico válido.';
            return;
        }

        formMessage.style.color = 'green';
        formMessage.textContent = 'Mensaje enviado con éxito!';
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Data for manufacturers
    const manufacturers = [
        { name: 'Dell', sales: 500 },
        { name: 'HP', sales: 450 },
        { name: 'Apple', sales: 400 },
        { name: 'Lenovo', sales: 350 },
        { name: 'Asus', sales: 300 }
    ];

    const manufacturersList = document.getElementById('manufacturersList');
    const manufacturersChart = document.getElementById('manufacturersChart').getContext('2d');

    // Populate the manufacturers list
    manufacturers.forEach(manufacturer => {
        const li = document.createElement('li');
        li.textContent = `${manufacturer.name} - ${manufacturer.sales} unidades`;
        manufacturersList.appendChild(li);
    });

    // Create the chart
    new Chart(manufacturersChart, {
        type: 'bar',
        data: {
            labels: manufacturers.map(manufacturer => manufacturer.name),
            datasets: [{
                label: 'Ventas de Computadoras',
                data: manufacturers.map(manufacturer => manufacturer.sales),
                backgroundColor: '#00CDD2',
                borderColor: '#00CDD2',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slides img');
    const totalSlides = slides.length;

    function showSlide(index) {
        const slidesContainer = document.querySelector('.slides');
        slidesContainer.style.transform = `translateX(${-index * 100}%)`;
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    }

    // Initial call to display the first slide
    showSlide(slideIndex);

    // Set interval for automatic slide change
    setInterval(nextSlide, 5000);
});



// JSON server

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const welcomeMessage = document.getElementById("welcomeMessage");
    const authButtons = document.getElementById("authButtons");
    const userIcon = document.getElementById("userIcon");
    const authMenu = document.getElementById("authMenu");

    if (user && welcomeMessage) {
        welcomeMessage.innerHTML = `<h2>Hola, ${user.username} 👋</h2> 
                                    <button id="logoutBtn">Cerrar sesión</button>`;

        if (authButtons) {
            authButtons.style.display = "none";
        }

        document.getElementById("logoutBtn").addEventListener("click", function () {
            localStorage.removeItem("user");
            window.location.reload();
        });
    }

    if (userIcon && authMenu) {
        userIcon.addEventListener("click", function () {
            authMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!userIcon.contains(event.target) && !authMenu.contains(event.target)) {
                authMenu.classList.remove("show");
            }
        });
    }
});


