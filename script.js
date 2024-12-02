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
        const votingContainer = document.getElementById('voting-container');

        // Create new vote item
        const voteItem = document.createElement('div');
        voteItem.classList.add('vote-item');
        voteItem.innerHTML = `
            <span>${link}</span>
            <span class="vote-count">Votes: 0</span>
            <button onclick="vote('${link}')">Vote</button>
        `;
        votingContainer.appendChild(voteItem);
    } else {
        alert('This link is already in the voting section!');
    }

    linkInput.value = ''; // Clear input field
});

// Handle voting
function vote(link) {
    votes[link]++;
    const votingContainer = document.getElementById('voting-container');
    const voteItems = votingContainer.querySelectorAll('.vote-item');

    voteItems.forEach((item) => {
        const linkText = item.querySelector('span').textContent;
        if (linkText === link) {
            const voteCountElement = item.querySelector('.vote-count');
            voteCountElement.textContent = `Votes: ${votes[link]}`;
        }
    });
}
