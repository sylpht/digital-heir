document.addEventListener('DOMContentLoaded', function() {
    // Делегирование событий для модального окна
    document.addEventListener('click', function(event) {
        if (event.target.matches('.btn')) {
            showAuthModal(event.target.dataset.type);
        }
    });

    // Переключение формы аутентификации
    function toggleAuthForm() {
        const title = document.getElementById('modalTitle');
        title.innerText = title.innerText.includes('Войти') 
            ? 'Создать аккаунт' 
            : 'Войти в систему';
    }

    // Показ модального окна аутентификации
    function showAuthModal(type) {
        const modal = document.getElementById('authModal');
        modal.classList.add('show');
        if (type === 'register') {
            document.getElementById('modalTitle').innerText = 'Создать аккаунт';
        } else {
            document.getElementById('modalTitle').innerText = 'Войти в систему';
        }
    }

    // Обработка формы с AJAX запросом и создание личного кабинета
    document.getElementById('authForm').addEventListener('submit', function(e) {
        e.preventDefault();
        fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                createDashboard(data.user);
                document.querySelector('.dashboard').style.display = 'grid';
                document.getElementById('authModal').classList.remove('show');
            } else {
                alert('Ошибка: ' + data.message);
            }
        })
        .catch(error => {
            alert('Ошибка: ' + error.message);
        });
    });

    // Функция для создания личного кабинета
    function createDashboard(user) {
        const dashboard = document.querySelector('.dashboard');
        dashboard.innerHTML = `
            <div class="sidebar">
                <h3>Добро пожаловать, ${user.name}!</h3>
                <p>Ваш email: ${user.email}</p>
            </div>
            <div class="main-content">
                <h2>Ваши активы</h2>
                <p>Здесь будут отображаться ваши цифровые активы.</p>
            </div>
        `;
    }

    // Обработчик для гамбургер-меню
    document.getElementById('hamburger').addEventListener('click', function() {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.toggle('active');
    });
});
