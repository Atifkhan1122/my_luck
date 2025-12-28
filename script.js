// Data Cache (Same as dataCache in Smali)
let dataCache = {};
let dates = [];
let currentSelectedDate = "";

const API_URL = "YOUR_API_ENDPOINT_HERE"; // Aapki API ka link yahan aayega

async function initializeApp() {
    // Simulated Dates (In App, these come from API)
    generateDates();
    renderDates();
    
    // Auto load first date
    loadMatchData(dates[0]);
}

function generateDates() {
    const today = new Date();
    for(let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(today.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
}

function renderDates() {
    const container = document.getElementById('dates-list');
    container.innerHTML = dates.map(date => `
        <div class="date-item ${date === currentSelectedDate ? 'active' : ''}" 
             onclick="loadMatchData('${date}')">
            ${date}
        </div>
    `).join('');
}

async function loadMatchData(date) {
    currentSelectedDate = date;
    renderDates();
    
    const contentList = document.getElementById('coupon-list');
    const loader = document.getElementById('loader');
    
    // Check Cache (Logic from Smali: addToCache)
    if (dataCache[date]) {
        displayData(dataCache[date]);
        return;
    }

    // Show Loading
    loader.style.display = 'block';
    contentList.style.display = 'none';

    try {
        // In real app: const response = await fetch(`${API_URL}?date=${date}`);
        // For Demo, simulating API delay:
        setTimeout(() => {
            const mockData = [
                { teams: "Real Madrid vs Barcelona", tip: "Over 2.5", league: "La Liga", time: "20:00" },
                { teams: "Man City vs Arsenal", tip: "Home Win", league: "Premier League", time: "18:30" }
            ];
            
            dataCache[date] = mockData; // Save to cache
            displayData(mockData);
            loader.style.display = 'none';
            contentList.style.display = 'grid';
        }, 800);

    } catch (error) {
        console.error("Error loading data", error);
        document.getElementById('notif-text').innerText = "Failed to load data!";
    }
}

function displayData(matches) {
    const container = document.getElementById('coupon-list');
    container.innerHTML = matches.map(match => `
        <div class="match-card">
            <div class="match-header">
                <span><i class="fas fa-trophy"></i> ${match.league}</span>
                <span>${match.time}</span>
            </div>
            <div class="match-teams">${match.teams}</div>
            <div class="prediction">Tip: ${match.tip}</div>
        </div>
    `).join('');
}

// Start the app
initializeApp();