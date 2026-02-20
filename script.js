// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Plank challenge timer
document.addEventListener('DOMContentLoaded', function () {
    const START_SECONDS = 30;
    let timerInterval;
    let remainingSeconds = START_SECONDS;
    
    const startBtn = document.getElementById('start-plank-btn');
    const timerDisplay = document.getElementById('timer-display');
    const timerDiv = document.getElementById('plank-timer');
    
    function resetTimer() {
        remainingSeconds = START_SECONDS;
        if (timerDisplay) timerDisplay.textContent = START_SECONDS;
        if (timerDiv) timerDiv.classList.add('hidden');
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.textContent = 'Start 30-Second Plank Challenge';
        }
    }
    
    function startPlankTimer() {
        if (!startBtn || !timerDisplay || !timerDiv) return;
        
        timerDiv.classList.remove('hidden');
        startBtn.disabled = true;
        startBtn.textContent = 'Planking...';
        
        remainingSeconds = START_SECONDS;
        timerDisplay.textContent = remainingSeconds;
        
        if (timerInterval) clearInterval(timerInterval);
        
        timerInterval = setInterval(() => {
            remainingSeconds--;
            timerDisplay.textContent = remainingSeconds;
            
            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = '0';
                if (typeof window !== 'undefined') {
                    window.alert('Great job! Plank complete! 🎉');
                }
                resetTimer();
            }
        }, 1000);
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', function () {
            if (timerInterval) clearInterval(timerInterval);
            startPlankTimer();
        });
    }
    
    resetTimer();
});

// Deep breathing exercise timer
document.addEventListener('DOMContentLoaded', function () {
    const START_SECONDS = 60;
    let breathingInterval;
    let remainingSeconds = START_SECONDS;
    let breathCycle = 0;
    
    const startBtn = document.getElementById('start-breathing-btn');
    const timerDisplay = document.getElementById('breathing-display');
    const timerDiv = document.getElementById('breathing-timer');
    const guideDiv = document.getElementById('breathing-guide');
    const breathPhase = document.getElementById('breath-phase');
    
    const breathingPhases = [
        { text: 'Breathe in slowly...', duration: 4 },
        { text: 'Hold your breath...', duration: 4 },
        { text: 'Breathe out slowly...', duration: 4 },
        { text: 'Hold...', duration: 4 }
    ];
    
    function resetBreathingTimer() {
        remainingSeconds = START_SECONDS;
        breathCycle = 0;
        if (timerDisplay) timerDisplay.textContent = START_SECONDS;
        if (timerDiv) timerDiv.classList.add('hidden');
        if (guideDiv) guideDiv.classList.add('hidden');
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.textContent = 'Start 1-Minute Deep Breathing';
        }
    }
    
    function startBreathingTimer() {
        if (!startBtn || !timerDisplay || !timerDiv || !guideDiv || !breathPhase) return;
        
        timerDiv.classList.remove('hidden');
        guideDiv.classList.remove('hidden');
        startBtn.disabled = true;
        startBtn.textContent = 'Breathing...';
        
        remainingSeconds = START_SECONDS;
        timerDisplay.textContent = remainingSeconds;
        breathCycle = 0;
        
        if (breathingInterval) clearInterval(breathingInterval);
        
        let phaseSecond = 0;
        let currentPhase = 0;
        
        // Cycle through breathing phases
        function updateBreathingPhase() {
            const phase = breathingPhases[currentPhase];
            if (breathPhase) {
                breathPhase.textContent = phase.text;
            }
            phaseSecond++;
            
            if (phaseSecond >= phase.duration) {
                phaseSecond = 0;
                currentPhase = (currentPhase + 1) % breathingPhases.length;
            }
        }
        
        breathingInterval = setInterval(() => {
            remainingSeconds--;
            timerDisplay.textContent = remainingSeconds;
            
            updateBreathingPhase();
            
            if (remainingSeconds <= 0) {
                clearInterval(breathingInterval);
                timerDisplay.textContent = '0';
                if (breathPhase) breathPhase.textContent = 'Complete!';
                if (typeof window !== 'undefined') {
                    window.alert('Excellent! You completed 1 minute of deep breathing! 🧘‍♀️');
                }
                resetBreathingTimer();
            }
        }, 1000);
        
        updateBreathingPhase();
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', function () {
            if (breathingInterval) clearInterval(breathingInterval);
            startBreathingTimer();
        });
    }
    
    resetBreathingTimer();
});

// Fade-in animation on scroll
(function () {
    const animatedClass = 'fade-in-when-visible';

    if(!document.getElementById('fade-in-when-visible-style')) {
        const style = document.createElement('style');
        style.id = 'fade-in-when-visible-style';
        style.innerHTML = `
            .${animatedClass} {
                opacity: 0;
                transform: translateY(40px);
                transition: opacity 0.9s cubic-bezier(0.23, 1, 0.32, 1), transform 0.9s cubic-bezier(0.23, 1, 0.32, 1);
            }
            .${animatedClass}.is-visible {
                opacity: 1;
                transform: none;
            }
        `;
        document.head.appendChild(style);
    }

    document.querySelectorAll('.routine-card').forEach(card => card.classList.add(animatedClass));

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.' + animatedClass).forEach(el => observer.observe(el));
    } else {
        document.querySelectorAll('.' + animatedClass).forEach(el => el.classList.add('is-visible'));
    }
})();