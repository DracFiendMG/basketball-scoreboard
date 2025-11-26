let homeScoreEl = document.getElementById("home-score-el")
let guestScoreEl = document.getElementById("guest-score-el")
let timer = document.getElementById("timer")
let periodNum = document.getElementById("period-num")
let homeLeads = document.getElementById("home-leads")
let guestLeads = document.getElementById("guest-leads")
let winnerEl = document.getElementById("winner")
let winningTeam = document.getElementById("display-winner")

let homeScore = 0
let guestScore = 0
let period = 1
let startTime = 0.5 // 12 is the original time limit, but decreasing it to 30 seconds for better experience
let timeInSeconds = startTime * 60
let timerInterval

function increaseHomeScore(score) {
    homeScore += score
    homeScoreEl.textContent = homeScore
    findTeamInLead()
}

function increaseGuestScore(score) {
    guestScore += score
    guestScoreEl.textContent = guestScore
    findTeamInLead()
}

function findTeamInLead() {
    if (homeScore > guestScore) {
        homeLeads.style.color = "#FF8C42"
        guestLeads.style.color = "#080001"
    } else if (homeScore < guestScore) {
        homeLeads.style.color = "#080001"
        guestLeads.style.color = "#FF8C42"
    } else {
        homeLeads.style.color = "#080001"
        guestLeads.style.color = "#080001"
    }
}

function newGame() {
    homeScore = 0
    guestScore = 0
    period = 1
    
    homeScoreEl.textContent = homeScore
    guestScoreEl.textContent = guestScore
    periodNum.textContent = period
    winnerEl.style.display = "none"
    document.body.classList.remove("disable-background")
    startTimer()
}

function updateTime() {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function startTimer() {
    clearInterval(timerInterval)
    timeInSeconds = startTime * 60
    updateTime()
    timerInterval = setInterval(() => {
        timeInSeconds -= 1
        updateTime()
        
        if (timeInSeconds === 0 && period === 4) {
            clearInterval(timerInterval)
            displayWinner()
        } else {
            if (timeInSeconds <= 0) {
                period += 1
                periodNum.textContent = period
                startTimer()
            }
            
            if (period > 4) {
                period = 1
                periodNum.textContent = period
            }
        }
    }, 1000)
}

startTimer()

function displayWinner() {
    if (homeScore > guestScore) {
        winningTeam.textContent = "🏆 HOME TEAM WINS! 🏆"
    } else if (homeScore < guestScore) {
        winningTeam.textContent = "🏆 AWAY TEAM WINS! 🏆"
    } else {
        winningTeam.textContent = "🏆 DRAW! 🏆"
    }
    winnerEl.style.display = "flex"
    document.body.classList.add("disable-background")
}