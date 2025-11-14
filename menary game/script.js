document.addEventListener("DOMContentLoaded", function () {
    // Grab elements from HTML
    const matchesFoundEl = document.getElementById("matches-found");
    const attemptsEl = document.getElementById("attempts");
    const cards = document.querySelectorAll(".card");
    const resetBtn = document.getElementById("reset-btn");

    // Game state
    let selectedCards = [];
    let attempts = 0;
    let matchesFound = 0;

    // Card image mapping
    const cardImages = {
        "1": "./images/img 1.jpg",
        "2": "./images/img 2.jpg",
        "3": "./images/img 3.jpg",
        "4": "./images/img 4.jpg"
    };

    // Functions
    function updateCard(card, content) {
        card.innerHTML = content;
    }

    function updateStats() {
        matchesFoundEl.textContent = matchesFound;
        attemptsEl.textContent = attempts;
    }

    function resetGame() {
        cards.forEach(card => {
            card.classList.remove("clicked");
            updateCard(card, "?");
        });
        selectedCards = [];
        attempts = 0;
        matchesFound = 0;
        updateStats();
    }

    function handleCardMatch() {
        matchesFound++;
        selectedCards = [];
        updateStats();
    }

    function handleCardMismatch(card) {
        setTimeout(() => {
            selectedCards.forEach(selectedCard => {
                selectedCard.classList.remove("clicked");
                updateCard(selectedCard, "?");
            });
            selectedCards = [];
        }, 500); // Short delay before hiding mismatched cards
    }

    // Event Listeners
    cards.forEach(card => {
        card.addEventListener("click", e => {
            e.preventDefault();
            
            if (card.classList.contains("clicked") || selectedCards.length >= 2) return;

            const cardDetails = card.getAttribute("data-card");
            card.classList.add("clicked");

            // Show card image
            if (cardImages[cardDetails]) {
                updateCard(card, `<img src="${cardImages[cardDetails]}" alt="">`);
            }

            selectedCards.push(card);

            if (selectedCards.length === 2) {
                attempts++;
                updateStats();

                const [card1, card2] = selectedCards;
                if (card1.getAttribute("data-card") === card2.getAttribute("data-card")) {
                    handleCardMatch();
                } else {
                    handleCardMismatch();
                }

                if (matchesFound === 4) {
                    setTimeout(() => {
                        alert(`Game Over! Your score is ${matchesFound} matches in ${attempts} attempts`);
                        resetGame();
                    }, 500);
                }
            }
        });
    });

    resetBtn.addEventListener("click", e => {
        e.preventDefault();
        resetGame();
    });
});