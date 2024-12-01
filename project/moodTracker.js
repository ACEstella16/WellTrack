document.addEventListener("DOMContentLoaded", () => {
    const moodRange = document.getElementById("mood-range");
    const moodEmoji = document.getElementById("mood-emoji");
    const moodDescription = document.getElementById("mood-description");
    const moodTags = document.getElementById("mood-tags");
    const moodHistory = document.getElementById("mood-history");

    const moods = [
        { emoji: "😢", description: "Very Unpleasant", tags: ["Sad", "Angry", "Frustrated"] },
        { emoji: "😟", description: "Unpleasant", tags: ["Worried", "Tired", "Overwhelmed"] },
        { emoji: "😐", description: "Neutral", tags: ["Okay", "Calm", "Indifferent"] },
        { emoji: "🙂", description: "Pleasant", tags: ["Happy", "Relaxed", "Hopeful"] },
        { emoji: "😁", description: "Very Pleasant", tags: ["Excited", "Proud", "Energized"] },
    ];

    // Update the mood based on the slider value
    const updateMood = (value) => {
        const mood = moods[value];
        moodEmoji.textContent = mood.emoji;
        moodDescription.textContent = mood.description;

        // Update tags
        moodTags.innerHTML = mood.tags
            .map((tag) => `<span>${tag}</span>`)
            .join("");
    };

    // Initialize mood
    updateMood(moodRange.value);

    // Update mood on slider change
    moodRange.addEventListener("input", (e) => {
        updateMood(e.target.value);
    });

    // Log Mood Button
    document.getElementById("log-mood").addEventListener("click", () => {
        const today = new Date().toISOString().split("T")[0];
        const mood = moods[moodRange.value];

        const moodData = JSON.parse(localStorage.getItem("moodHistory")) || [];
        moodData.push({ date: today, mood: mood.description });
        localStorage.setItem("moodHistory", JSON.stringify(moodData));

        alert("Mood logged successfully!");
        loadMoodHistory();
    });

    // Load Mood History
    const loadMoodHistory = () => {
        const moodData = JSON.parse(localStorage.getItem("moodHistory")) || [];
        if (moodData.length > 0) {
            moodHistory.innerHTML = moodData
                .map((entry) => `<div class="mood-entry"><span>${entry.date}: ${entry.mood}</span></div>`)
                .join("");
        } else {
            moodHistory.innerHTML = "<p>No mood entries yet. Start logging your mood today!</p>";
        }
    };

    loadMoodHistory();
});
