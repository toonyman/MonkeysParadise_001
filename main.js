// 번호 색상 결정
function getNumberColor(num) {
    if (num <= 10) return 'color-1';
    if (num <= 20) return 'color-2';
    if (num <= 30) return 'color-3';
    if (num <= 40) return 'color-4';
    return 'color-5';
}

// 로또 번호 생성 (1게임 고정)
function generateNumbers() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = [...numbers].sort((a, b) => a - b);

    const resultHTML = `
        <div class="result-item">
            <div class="numbers">
                ${sortedNumbers.map(num => `
                    <div class="number-ball ${getNumberColor(num)}">${num}</div>
                `).join('')}
            </div>
        </div>
    `;
    resultsDiv.innerHTML = resultHTML;
}

// 테마 설정
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const isDarkMode = html.dataset.theme === 'dark';
    if (isDarkMode) {
        html.dataset.theme = 'light';
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        html.dataset.theme = 'dark';
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// 초기 테마 설정
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    html.dataset.theme = savedTheme;
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
} else if (prefersDark) {
    html.dataset.theme = 'dark';
    themeToggle.textContent = '☀️';
}
