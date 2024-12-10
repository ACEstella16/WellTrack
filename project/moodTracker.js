document.addEventListener("DOMContentLoaded", () => {
    const moodRange = document.getElementById("mood-range");
    const moodEmoji = document.getElementById("mood-emoji");
    const moodDescription = document.getElementById("mood-description");
    const moodTags = document.getElementById("mood-tags");
    const moodHistory = document.getElementById("mood-history");

    // Sample mood data for the past 7 days
    // const sampleMoodData = [
    //     { date: "2024-12-04", mood: "Very Pleasant" },
    //     { date: "2024-12-05", mood: "Pleasant" },
    //     { date: "2024-12-06", mood: "Neutral" },
    //     { date: "2024-12-07", mood: "Unpleasant" },
    //     { date: "2024-12-08", mood: "Very Unpleasant" },
    //     { date: "2024-12-09", mood: "Pleasant" },
    //     { date: "2024-12-10", mood: "Neutral" }
    // ];

    // Insert sample data into localStorage
    // localStorage.setItem("moodHistory", JSON.stringify(sampleMoodData));

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
        generateMoodTrendsChart();
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

    // Generate Mood Trends Chart
    const generateMoodTrendsChart = () => {
        const ctx = document.getElementById("mood-trends-chart").getContext("2d");
        const moodData = JSON.parse(localStorage.getItem("moodHistory")) || [];

        const labels = moodData.map(entry => entry.date);
        const moodRatings = moodData.map(entry => {
            switch (entry.mood) {
                case "Very Unpleasant": return 1;
                case "Unpleasant": return 2;
                case "Neutral": return 3;
                case "Pleasant": return 4;
                case "Very Pleasant": return 5;
                default: return 3;
            }
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mood Rating',
                    data: moodRatings,
                    borderColor: 'blue',
                    fill: false,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return ["", "😢", "😟", "😐", "🙂", "😁"][value];
                            }
                        }
                    }
                }
            }
        });
    };

    loadMoodHistory();
    generateMoodTrendsChart();
});
