const username = "javaadde";
let cachedContributionData = {};

function generateContributionGraph(contributionData) {
  const graphGrid = document.getElementById("graph-grid");
  const monthsRow = document.getElementById("months-row");

  if (!graphGrid || !monthsRow) return;

  // Calculate columns based on width
  const availableWidth = window.innerWidth - 60;
  const colWidth = 14; // 10px square + 4px gap
  const numWeeks = Math.floor(availableWidth / colWidth);

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
}

function showTooltip(e) {
  const tooltip = document.getElementById("tooltip");
  const date = new Date(e.target.dataset.date);
  const count = e.target.dataset.count;

  const dateStr = date.toLocaleDateString('en-US', {
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
    const res = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
    const events = await res.json();

    const contributionData = {};
    if (Array.isArray(events)) {
      events.forEach(event => {
        const date = new Date(event.created_at).toISOString().split('T')[0];
        contributionData[date] = (contributionData[date] || 0) + 1;
      });
    }

    // No mock data - showing only real contributions from GitHub Events API
    cachedContributionData = contributionData;
    generateContributionGraph(contributionData);
  } catch (error) {
    console.error(error);
    generateContributionGraph({});
  }
}

let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    generateContributionGraph(cachedContributionData);
  }
});

window.onload = () => {
  fetchContributions();
  setInterval(fetchContributions, 1000 * 60 * 60);
};
