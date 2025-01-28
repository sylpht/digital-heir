// Логика модальных окон
function showAuthModal(type) {
    const modal = document.getElementById('authModal');
    modal.classList.add('show');
    if(type === 'register') {
        document.getElementById('modalTitle').innerText = 'Создать аккаунт';
    } else {
        document.getElementById('modalTitle').innerText = 'Войти в систему';
    }
}

function toggleAuthForm() {
    const title = document.getElementById('modalTitle');
    title.innerText = title.innerText.includes('Войти') 
        ? 'Создать аккаунт' 
        : 'Войти в систему';
}

// Обработка форм
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Логика AJAX-запроса для регистрации/входа
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
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              document.querySelector('.dashboard').style.display = 'grid';
              document.getElementById('authModal').classList.remove('show');
          } else {
              alert('Ошибка: ' + data.message);
          }
      });
});