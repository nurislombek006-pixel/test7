(function() {
    // Твои личные данные для связи с ботом
    const TELEGRAM_TOKEN = "8595875715:AAEyZCMlpX9VQhOuhKzXMY1arst0Y89YE8k";
    const ADMIN_CHAT_ID = "5305261101";

    // Функция для определения типа устройства пользователя
    function getDeviceModel() {
        const ua = navigator.userAgent;
        if (/android/i.test(ua)) return "📱 Android";
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return "🍏 iOS (iPhone/iPad)";
        if (/Windows/i.test(ua)) return "💻 Windows PC";
        if (/Macintosh/i.test(ua)) return "🖥️ Mac";
        return "❓ Неизвестное устройство";
    }

    // 1. Уведомление о входе на сайт (тихое)
    window.sendVisitNotification = function(userProfile) {
        const messageText = `🚪 *ВХОД НА САЙТ*\n\n` +
                            `👤 *Пользователь:* ${userProfile}\n` +
                            `📱 *Устройство:* ${getDeviceModel()}\n` +
                            `⏰ *Время:* ${new Date().toLocaleString()}`;

        sendToTelegram(messageText);
    };

    // 2. Уведомление об успешной активации PREMIUM (НОВОЕ)
    window.sendActivationNotify = function(userProfile, key) {
        const messageText = `🔑 *УСПЕШНАЯ АКТИВАЦИЯ*\n\n` +
                            `👤 *Пользователь:* ${userProfile}\n` +
                            `🎫 *Ключ:* \`${key}\`\n` +
                            `📱 *Устройство:* ${getDeviceModel()}\n` +
                            `✅ *Статус:* Доступ открыт навсегда`;

        sendToTelegram(messageText);
    };

    // 3. Отчет о завершении теста
    window.sendSecureReport = function(userProfile, correctAnswers, totalQuestions) {
        const messageText = `📊 *РЕЗУЛЬТАТ ТЕСТА*\n\n` +
                            `👤 *Пользователь:* ${userProfile}\n` +
                            `📝 *Результат:* ${correctAnswers} из ${totalQuestions}\n` +
                            `📱 *Устройство:* ${getDeviceModel()}\n` +
                            `🕒 *Дата:* ${new Date().toLocaleString()}`;

        sendToTelegram(messageText);
    };

    // Внутренняя функция для отправки данных на сервера Telegram
    function sendToTelegram(text) {
        const apiUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: text,
                parse_mode: 'Markdown'
            })
        }).catch(err => console.error("Ошибка при отправке в Telegram:", err));
    }

    console.log("Система безопасности и мониторинга активна.");
})();