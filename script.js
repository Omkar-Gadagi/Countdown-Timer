document.addEventListener('DOMContentLoaded', () => {
    const countdown = document.getElementById('countdown');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const countdownForm = document.getElementById('countdownForm');
    const datetimeInput = document.getElementById('datetime');
    const pauseButton = document.getElementById('pauseButton');
    const resumeButton = document.getElementById('resumeButton');
    const resetButton = document.getElementById('resetButton');

    let countdownInterval;
    let paused = false;
    let targetDate;

    countdownForm.addEventListener('submit', (event) => {
        event.preventDefault();
        targetDate = new Date(datetimeInput.value);
        if (isNaN(targetDate)) {
            alert('Please enter a valid date and time.');
            return;
        }
        clearInterval(countdownInterval);
        startCountdown(targetDate);
    });

    pauseButton.addEventListener('click', () => {
        paused = true;
        clearInterval(countdownInterval);
        pauseButton.disabled = true;
        resumeButton.disabled = false;
    });

    resumeButton.addEventListener('click', () => {
        paused = false;
        startCountdown(targetDate);
        pauseButton.disabled = false;
        resumeButton.disabled = true;
    });

    resetButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        countdown.innerHTML = 'Set a Countdown!';
        daysSpan.textContent = '00';
        hoursSpan.textContent = '00';
        minutesSpan.textContent = '00';
        secondsSpan.textContent = '00';
        progress.style.width = '0%';
        pauseButton.disabled = true;
        resumeButton.disabled = true;
        datetimeInput.value = '';
    });

    function startCountdown(targetDate) {
        function updateCountdown() {
            if (paused) return;
            const now = new Date();
            const timeDifference = targetDate - now;

            if (timeDifference <= 0) {
                clearInterval(countdownInterval);
                countdown.innerHTML = 'Countdown Complete!';
                progress.style.width = '100%';
                return;
            }

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const totalDuration = targetDate - (new Date(datetimeInput.value));
            const elapsedPercentage = ((totalDuration - timeDifference) / totalDuration) * 100;

            daysSpan.textContent = days.toString().padStart(2, '0');
            hoursSpan.textContent = hours.toString().padStart(2, '0');
            minutesSpan.textContent = minutes.toString().padStart(2, '0');
            secondsSpan.textContent = seconds.toString().padStart(2, '0');
            progress.style.width = `${elapsedPercentage}%`;
        }

        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
});
