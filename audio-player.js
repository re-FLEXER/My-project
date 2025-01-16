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


document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const canvas = document.getElementById('audio-visualizer-canvas');
    const ctx = canvas.getContext('2d');

    // Налаштовуємо canvas
    canvas.width = window.innerWidth;
    canvas.height = 600; // Збільшили висоту контейнера

    // Створюємо AudioContext для аналізу звуку
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Функція візуалізації
    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ширина барів
        const barWidth = (canvas.width / bufferLength) * 2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            // Збільшуємо висоту барів на 50%
            const barHeight = dataArray[i] * 1.1; 

            // Створюємо градієнт від чорного до червоного
            const red = Math.min(255, dataArray[i] + 100);
            const green = 0;
            const blue = 0;

            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 4; // Відстань між барами
        }
    }

    // Запуск візуалізації при відтворенні аудіо
    audio.addEventListener('play', () => {
        audioContext.resume(); // Розблоковуємо AudioContext для браузерів
        drawVisualizer();
    });
});

