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
        .then(response => response.json())
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
            console.error('Error:', error);
        });
    });

    // Функция для создания личного кабинета
    function createDashboard(user) {
        const dashboard = document.createElement('div');
        dashboard.className = 'dashboard';
        
        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        sidebar.innerHTML = `
            <h3>Меню</h3>
            <ul>
                <li><a href="#">Профиль</a></li>
                <li><a href="#">Настройки</a></li>
                <li><a href="#">Выход</a></li>
            </ul>
        `;
        
        const mainContent = document.createElement('div');
        mainContent.className = 'main-content';
        mainContent.innerHTML = `
            <h2>Добро пожаловать, ${user.name}</h2>
            <p>Email: ${user.email}</p>
        `;
        
        dashboard.appendChild(sidebar);
