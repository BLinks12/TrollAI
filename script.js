const votes = {}; // Store votes
let timeRemaining = 20 * 60; // 20 minutes in seconds

// Validate URL format
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Update the top 3 most voted projects in the voting section
function updateVotingSection() {
    const votingContainer = document.getElementById('voting-container');

    // Sort the projects by votes in descending order
    const sortedProjects = Object.entries(votes)
        .sort((a, b) => b[1] - a[1]) // Sort by vote count (highest first)
        .slice(0, 3); // Keep only the top 3

    // Clear the current voting container
    votingContainer.innerHTML = '';

    // Add the top 3 projects to the container
    sortedProjects.forEach(([link, voteCount]) => {
        const voteItem = document.createElement('div');
        voteItem.classList.add('vote-item');
        voteItem.innerHTML = `
            <span>${link}</span>
            <span class="vote-count">Votes: ${voteCount}</span>
            <button onclick="vote('${link}')">Vote</button>
        `;
        votingContainer.appendChild(voteItem);
    });
}

// Handle form submission
document.getElementById('feed-troll-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload

    const linkInput = document.getElementById('troll-link');
    const link = linkInput.value.trim();

    if (!isValidURL(link)) {
        alert('Please enter a valid URL.');
        return;
    }

    // If the link already exists, increment its votes
    if (votes[link] !== undefined) {
        votes[link]++; // Increment the vote count
    } else {
        votes[link] = 1; // Initialize vote count to 1
    }

    // Update the voting section
    updateVotingSection();

    linkInput.value = ''; // Clear the input field
});

// Handle voting
function vote(link) {
    if (votes[link] !== undefined) {
        votes[link]++; // Increment the vote count
        updateVotingSection(); // Update the voting section
    }
}

// Countdown timer logic
function updateCountdown() {
    // Calculate minutes and seconds
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    // Update the timer display
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Decrease the time remaining
    timeRemaining--;

    // Reset the countdown when it reaches 0
    if (timeRemaining < 0) {
        timeRemaining = 20 * 60; // Reset to 20 minutes
        alert('The next troll attack is live! Refreshing countdown...');
    }
}

// Start the countdown and update every second
setInterval(updateCountdown, 1000);
