const votes = {}; // Store votes

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
    event.preventDefault();

    const linkInput = document.getElementById('troll-link');
    const link = linkInput.value.trim();

    if (!isValidURL(link)) {
        alert('Please enter a valid URL.');
        return;
    }

    if (!votes[link]) {
        votes[link] = 0; // Initialize vote count
        updateVotingSection(); // Update the voting section to include the new project
    } else {
        alert('This link is already in the voting section!');
    }

    linkInput.value = ''; // Clear input field
});

// Handle voting
function vote(link) {
    votes[link]++;
    updateVotingSection(); // Update the voting section after every vote
}
