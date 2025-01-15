document.addEventListener('DOMContentLoaded', () => {
    // Анімація градієнтного тексту
    const gradientText = document.querySelector('.gradient-text-username');
    if (gradientText) {
        gradientText.style.animation = "gradient 7s ease infinite";
    }

    // Анімація іконок соціальних мереж
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const icon = e.currentTarget.querySelector('.social-icon');
            icon.style.transform = "scale(1.2)";
            icon.style.filter = "brightness(1.4)";
            icon.style.transition = "transform 0.3s ease-in-out, filter 0.3s ease-in-out";
        });

        link.addEventListener('mouseleave', (e) => {
            const icon = e.currentTarget.querySelector('.social-icon');
            icon.style.transform = "scale(1)";
            icon.style.filter = "brightness(1)";
            icon.style.transition = "transform 0.3s ease-in-out, filter 0.3s ease-in-out";
        });
    });

    // Прогрес-бар анімація
    const progressBar = document.querySelector('.progress-bar span');
    const audioElement = document.getElementById('audio');
    
    // Функція для оновлення прогресу
    function updateProgressBar() {
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;
        const progress = (currentTime / duration) * 100; // Рахуємо прогрес

        // Зміна ширини прогрес-бару з плавною анімацією
        progressBar.style.width = `${progress}%`;
    }

    // Встановлюємо інтервал для оновлення прогрес-бару
    audioElement.addEventListener('play', () => {
        setInterval(updateProgressBar, 100); // Оновлюємо кожні 100 мс
    });
});
