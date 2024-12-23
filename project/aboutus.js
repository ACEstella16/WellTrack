document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".team-card");

    // Add hover effect with animation
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });

    console.log("About Us page loaded and animations applied!");
});
