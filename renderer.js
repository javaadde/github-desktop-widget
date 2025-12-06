const { ipcRenderer } = require("electron");
let username = null;
let cachedContributionData = {};

function generateContributionGraph(contributionData) {
  const graphGrid = document.getElementById("graph-grid");
  const monthsRow = document.getElementById("months-row");
  const scrollContainer = document.getElementById("scroll-container");

  if (!graphGrid || !monthsRow) return;

  // Fixed 53 weeks for the entire year
  const numWeeks = 53;

  graphGrid.innerHTML = "";
  monthsRow.innerHTML = "";

  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

  const startDate = new Date(endOfWeek);
  startDate.setDate(endOfWeek.getDate() - (numWeeks * 7) + 1);

  let currentDate = new Date(startDate);
  let lastMonth = -1;

  // Render Columns
  for (let w = 0; w < numWeeks; w++) {
    const weekCol = document.createElement("div");
    weekCol.className = "week-column";

    // Handle Month Label
    const currentMonth = currentDate.getMonth();
    const monthLabel = document.createElement("div");
    monthLabel.className = "month-label";

    // Show label if month changes or it's the first week
    // Display month label on the week where the month STARTs or changes
    if (currentMonth !== lastMonth) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      monthLabel.textContent = monthNames[currentMonth];
      lastMonth = currentMonth;
    }
    monthsRow.appendChild(monthLabel);

    // Create Days
    for (let d = 0; d < 7; d++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const contributions = contributionData[dateStr] || 0;

      const square = document.createElement("div");
      square.className = "contribution-square";

      let level = 0;
      if (contributions > 0) level = 1;
      if (contributions >= 3) level = 2;
      if (contributions >= 6) level = 3;
      if (contributions >= 10) level = 4;

      square.classList.add(`level-${level}`);
      square.dataset.date = dateStr;
      square.dataset.count = contributions;

      square.addEventListener("mouseenter", showTooltip);
      square.addEventListener("mouseleave", hideTooltip);

      weekCol.appendChild(square);

      currentDate.setDate(currentDate.getDate() + 1);
    }
    graphGrid.appendChild(weekCol);
  }

  // Scroll to end (most recent)
  if (scrollContainer) {
    // Wait for layout
    setTimeout(() => {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    }, 100);
  }
}

function showTooltip(e) {
  const tooltip = document.getElementById("tooltip");
  const dateStrRaw = e.target.dataset.date;
  const count = e.target.dataset.count;

  if (!dateStrRaw) return;

  const parts = dateStrRaw.split('-');
  const displayDate = new Date(parts[0], parts[1] - 1, parts[2]);

  const dateStr = displayDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const contributionText = count == 0 ? "No contributions" : `${count} contributions`;

  tooltip.textContent = `${contributionText} on ${dateStr}`;
  tooltip.classList.add("show");

  // Smart positioning
  const rect = e.target.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
  let top = rect.top - tooltipRect.height - 6;

  // Clamp to window bounds
  if (left < 10) left = 10;
  if (left + tooltipRect.width > window.innerWidth - 10) {
    left = window.innerWidth - tooltipRect.width - 10;
  }

  if (top < 5) top = rect.bottom + 6;

  tooltip.style.left = left + "px";
  tooltip.style.top = top + "px";
}

function hideTooltip() {
  document.getElementById("tooltip").classList.remove("show");
}

async function fetchContributions() {
  try {
    const contributionData = {};
    let scraped = false;

    // Method 1: Scrape contribution data from GitHub profile (Primary)
    try {
      // Use proxy or direct fetch. Electron usually has no CORS issues if nodeIntegration is true.
      const profileRes = await fetch(`https://github.com/users/${username}/contributions`);
      const html = await profileRes.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const days = doc.querySelectorAll("td.ContributionCalendar-day[data-date]");

      if (days.length > 0) {
        days.forEach(day => {
          const date = day.getAttribute("data-date");
          const levelAttr = day.getAttribute("data-level");
          let level = 0;
          if (levelAttr) {
            level = parseInt(levelAttr);
          }

          // Map level to count approximation if specific count not found
          let count = 0;
          if (level === 1) count = 1;
          if (level === 2) count = 4;
          if (level === 3) count = 7;
          if (level === 4) count = 12;

          contributionData[date] = count;
        });
        scraped = true;
        console.log(`Scraped ${days.length} days of history.`);
      }
    } catch (scrapeError) {
      console.log('Could not fetch contribution graph via scraping', scrapeError);
    }

    // Method 2: Fetch events as fallback or supplement
    if (!scraped) {
      try {
        for (let page = 1; page <= 3; page++) {
          const res = await fetch(`https://api.github.com/users/${username}/events?per_page=100&page=${page}`);
          if (!res.ok) break;
          const events = await res.json();

          if (!Array.isArray(events) || events.length === 0) break;

          events.forEach(event => {
            const date = new Date(event.created_at).toISOString().split('T')[0];
            contributionData[date] = (contributionData[date] || 0) + 1;
          });
        }
      } catch (e) {
        console.warn("Event fetch failed", e);
      }
    }

    cachedContributionData = contributionData;
    generateContributionGraph(contributionData);
  } catch (error) {
    console.error(error);
    generateContributionGraph({});
  }
}

// Remove resize logic as we scroll now
window.addEventListener('resize', () => {
  // Optional: adjust scroll position?
});

// Modal functionality
const modal = document.getElementById("setup-modal");
const usernameInput = document.getElementById("username-input");
const saveBtn = document.getElementById("save-username-btn");
const settingsBtn = document.getElementById("settings-btn");
const settingsDropdown = document.getElementById("settings-dropdown");
const changeUsernameBtn = document.getElementById("change-username-btn");
const closeAppBtn = document.getElementById("close-app-btn");
const errorMessage = document.getElementById("error-message");

function showModal() {
  modal.classList.add("show");
  usernameInput.value = username || "";
  usernameInput.focus();
  errorMessage.textContent = "";
  hideDropdown();
}

function showDropdown() {
  settingsDropdown.classList.add("show");
}

function hideDropdown() {
  settingsDropdown.classList.remove("show");
}

function hideModal() {
  modal.classList.remove("show");
  errorMessage.textContent = "";
}

async function saveUsername() {
  const newUsername = usernameInput.value.trim();

  if (!newUsername) {
    errorMessage.textContent = "Please enter a username";
    return;
  }

  // Validate username format (basic check)
  if (!/^[a-zA-Z0-9-]+$/.test(newUsername)) {
    errorMessage.textContent = "Invalid username format";
    return;
  }

  try {
    // Save username
    await ipcRenderer.invoke("set-username", newUsername);
    username = newUsername;

    // Fetch contributions with new username
    await fetchContributions();
    hideModal();
  } catch (error) {
    errorMessage.textContent = "Error saving username";
    console.error(error);
  }
}

// Event listeners
settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (settingsDropdown.classList.contains("show")) {
    hideDropdown();
  } else {
    showDropdown();
  }
});

changeUsernameBtn.addEventListener("click", () => {
  showModal();
});

closeAppBtn.addEventListener("click", () => {
  window.close();
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!settingsBtn.contains(e.target) && !settingsDropdown.contains(e.target)) {
    hideDropdown();
  }
});

saveBtn.addEventListener("click", saveUsername);

usernameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    saveUsername();
  }
});

// Initialize app
async function initializeApp() {
  try {
    // Check if username is already stored
    const storedUsername = await ipcRenderer.invoke("get-username");

    if (storedUsername) {
      username = storedUsername;
      await fetchContributions();
      // Refresh every hour
      setInterval(fetchContributions, 1000 * 60 * 60);
    } else {
      // First time setup - show modal
      showModal();
    }
  } catch (error) {
    console.error("Error initializing app:", error);
    showModal();
  }
}

window.onload = initializeApp;
