document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');
    
    // Встановлюємо тривалість пісні при завантаженні
    audio.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audio.duration);
    });

    // Оновлюємо час відтворення
    audio.addEventListener('timeupdate', () => {
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    });

    // Обробка натискання на кнопку Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fa fa-pause"></i>'; // Заміна іконки на паузу
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fa fa-play"></i>'; // Заміна іконки на відтворення
        }
    });

    // Функція для форматування часу в MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
});
