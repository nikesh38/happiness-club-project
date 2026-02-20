// Dark mode functionality
document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }
    
    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function () {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});

// Navigation bar functionality
document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Scroll progress bar
    const scrollProgress = document.getElementById('scroll-progress');
    
    function updateScrollProgress() {
        if (!scrollProgress) return;
        
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollableHeight = documentHeight - windowHeight;
        
        if (scrollableHeight <= 0) {
            scrollProgress.style.width = '0%';
            return;
        }
        
        const scrolled = (window.scrollY / scrollableHeight) * 100;
        scrollProgress.style.width = Math.min(Math.max(scrolled, 0), 100) + '%';
    }

    // Navbar scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Active section highlighting
    function setActiveSection() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', function () {
        updateScrollProgress();
        handleScroll();
        setActiveSection();
    });

    updateScrollProgress();
    handleScroll();
    setActiveSection();
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
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


// Challenge tracker localStorage
document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'fitnessChallengeTracker';
    
    function saveTrackerData() {
        const trackerData = {};
        
        for (let day = 1; day <= 7; day++) {
            const checkbox = document.getElementById(`day${day}-checkbox`);
            const notes = document.getElementById(`day${day}-notes`);
            
            if (checkbox && notes) {
                trackerData[`day${day}`] = {
                    completed: checkbox.checked,
                    notes: notes.value
                };
            }
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerData));
    }
    
    function loadTrackerData() {
        const savedData = localStorage.getItem(STORAGE_KEY);
        
        if (savedData) {
            try {
                const trackerData = JSON.parse(savedData);
                
                for (let day = 1; day <= 7; day++) {
                    const dayData = trackerData[`day${day}`];
                    if (dayData) {
                        const checkbox = document.getElementById(`day${day}-checkbox`);
                        const notes = document.getElementById(`day${day}-notes`);
                        
                        if (checkbox) {
                            checkbox.checked = dayData.completed || false;
                        }
                        if (notes && dayData.notes) {
                            notes.value = dayData.notes;
                        }
                    }
                }
            } catch (e) {
                console.error('Error loading tracker data:', e);
            }
        }
    }
    
    // Load saved data on page load
    loadTrackerData();
    
    // Save data when checkboxes or notes change
    for (let day = 1; day <= 7; day++) {
        const checkbox = document.getElementById(`day${day}-checkbox`);
        const notes = document.getElementById(`day${day}-notes`);
        
        if (checkbox) {
            checkbox.addEventListener('change', saveTrackerData);
        }
        if (notes) {
            notes.addEventListener('input', saveTrackerData);
            notes.addEventListener('blur', saveTrackerData);
        }
    }
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