// Создаем Iframe для YouTube на весь экран
const iframe = document.createElement('iframe');

// Можно использовать youtube.com/tv (но иногда он недоступен для ПК-юзерагентов)
// Если не работает, измените на 'https://www.youtube.com/embed/' или обычный youtube
iframe.src = 'https://www.youtube.com/'; 
iframe.className = 'youtube-container';
iframe.allow = "autoplay; encrypted-media; fullscreen";

document.body.appendChild(iframe);

// Обработчик кнопки назад / выхода из приложения
document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' || e.key === 'Backspace') {
        window.parent.postMessage('close_webapp', '*');
    }
});

// Пробуем передавать фокус внутрь айфрейма сразу после загрузки
iframe.onload = function() {
    iframe.focus();
};