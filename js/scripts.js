document.addEventListener("DOMContentLoaded", function () {
    // Creating Spotlight 
    const spotlight = document.createElement("div");
    spotlight.classList.add("torch-spotlight");
    document.body.appendChild(spotlight);

    // Get all sections that should be affected by lighting effects
    const section = document.querySelector(".security");
    const textElements = section.querySelectorAll("h4, p");

    // Initial dimming for the section
    section.style.opacity = "0.2"; // Only dim the .security section initially

    let spotlightSize = 300; // Spotlight size
    let spotlightRadius = spotlightSize / 2;

    // Function to handle the cursor movement and spotlight positioning
    function handleCursorMove(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Move the spotlight to the cursor
        spotlight.style.left = `${mouseX - spotlightRadius}px`;
        spotlight.style.top = `${mouseY - spotlightRadius}px`;

        // Highlight the text in the spotlight
        highlightTextInSpotlight(mouseX, mouseY);
    }

    // Function to highlight text inside the spotlight
    function highlightTextInSpotlight(cursorX, cursorY) {
        textElements.forEach(el => {
            // Split text into individual characters and wrap each in a span
            const text = el.textContent;
            el.innerHTML = text.split('').map(char => `<span class="char">${char}</span>`).join('');

            // Get all character spans
            const charSpans = el.querySelectorAll("span.char");
            charSpans.forEach(span => {
                const charRect = span.getBoundingClientRect();
                const charCenterX = charRect.left + charRect.width / 2;
                const charCenterY = charRect.top + charRect.height / 2;

                // Calculate distance from cursor (spotlight center)
                const distance = Math.sqrt(
                    Math.pow(charCenterX - cursorX, 2) + Math.pow(charCenterY - cursorY, 2)
                );

                // If the character is inside the spotlight, light it up
                if (distance < spotlightRadius) {
                    span.style.color = "#fff"; // Light up the character
                    span.style.transition = "color 0.1s";
                } else {
                    span.style.color = "#444"; // Keep the character dim
                }
            });
        });
    }

    // Event listener for mouse movement to control spotlight position
    window.addEventListener("mousemove", handleCursorMove);

    // Event listener for scroll to control opacity (dimming/lighting) of the sections
    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;

        const sectionRect = section.getBoundingClientRect();

        // Dim the section when near the top of the page
        if (scrollY < sectionRect.bottom) {
            section.style.opacity = "0.2"; // Dim the .security section
        } else {
            section.style.opacity = "1"; // Fully visible after scrolling past
        }
    });

    // Scroll animation for lighting up words
    const infoSection = document.querySelector(".info-about-us");
    const elements = infoSection.querySelectorAll("h4, p");

    // Wrap each word in a span
    elements.forEach(el => {
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = words.map(word => `<span class="word-span">${word}</span>`).join(' ');
    });

    const wordSpans = infoSection.querySelectorAll(".word-span");

    let lastScrollY = window.scrollY; // Store last scroll position

    function lightUpWords() {
        const sectionRect = infoSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        // Add a threshold to prevent starting the effect too early
        const threshold = 100; // Change this value to adjust when the lighting starts

        // Only start lighting up when section is within the threshold of the viewport
        if (sectionRect.top > viewportHeight + threshold || sectionRect.bottom < threshold) return;

        wordSpans.forEach(span => {
            const spanRect = span.getBoundingClientRect();
            const spanMiddle = spanRect.top + spanRect.height / 2;

            // Check if the word is in the center of the screen
            const isInCenter = Math.abs(spanMiddle - viewportCenter) < 50;

            // Dim the word smoothly when scrolling up, if it was previously lit
            if (lastScrollY > window.scrollY && span.classList.contains("lit") && !isInCenter) {
                span.style.color = "#444"; // Dim it back
                span.classList.remove("lit"); // Remove the "lit" class
            }

            // Light up words if they cross the center while scrolling down
            if (isInCenter && !span.classList.contains("lit")) {
                span.style.color = "#fff"; // Light up
                span.classList.add("lit"); // Mark as lit
            }
        });

        // Update the scroll position for the next scroll event
        lastScrollY = window.scrollY;
    }

    // Event listeners for scroll and resize for lighting up text
    window.addEventListener("scroll", lightUpWords);
    window.addEventListener("resize", lightUpWords);
});

function toggleFooter(section) {
    section.classList.toggle('open');
    const content = section.querySelector('.footer-content');
    content.classList.toggle('open');
  }

// Function to toggle the menu visibility when the hamburger icon is clicked
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');  // Toggle the 'open' class to show/hide the menu
}

// Event listener for the hamburger icon
document.querySelector('.hamburg').addEventListener('click', toggleMenu);

document.querySelector('.hamburg').addEventListener('click', function () {
    const menu = document.querySelector('.menu');  // Get the menu

    this.classList.toggle('open');

    // Toggle the text between hamburger and X
    if (this.classList.contains('open')) {
        this.innerHTML = "X"; // Show X when menu is open
        menu.style.display = 'flex'; // Show the menu
        menu.style.animation = 'slideDown 0.5s ease-in-out forwards'; // Apply the slide-down animation
    } else {
        this.innerHTML = "&#9776;"; // Revert back to hamburger symbol when menu is closed
        menu.style.animation = 'slideUp 0.5s ease-in-out forwards'; // Apply slide-up animation
        setTimeout(() => {
            menu.style.display = 'none'; // Hide the menu after the slide-up animation
        }, 500); // Wait for the slide-up animation to complete before hiding
    }
});

