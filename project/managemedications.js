// In this JS we will be using an API so that the notifications will be popping up via browser
// The user should enable or allow the API to show notifications for it to work properly
document.addEventListener("DOMContentLoaded", () => {
    // Request notification permission when the page loads
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notifications enabled!");
            } else if (permission === "denied") {
                alert("You have denied notifications. Please enable them in your browser settings to receive reminders.");
            }
        });
    }
});

// Handle form submission
document.getElementById("medication-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const medName = document.getElementById("medName").value.trim();
    const medType = document.getElementById("medType").value.trim();
    const medDose = document.getElementById("medDose").value.trim();
    const medAmount = document.getElementById("medAmount").value.trim();
    const medTime = document.getElementById("medTime").value;

    // Validate inputs
    if (!medName || !medType || !medDose || !medAmount || !medTime) {
        alert("Please fill in all fields.");
        return;
    }

    // Parse time and calculate delay
    const now = new Date();
    const [hours, minutes] = medTime.split(":");
    const reminderTime = new Date();
    reminderTime.setHours(parseInt(hours, 10));
    reminderTime.setMinutes(parseInt(minutes, 10));
    reminderTime.setSeconds(0);

    const delay = reminderTime - now;

    // Schedule notification
    if (delay > 0) {
        setTimeout(() => {
            if (Notification.permission === "granted") {
                new Notification("Medication Reminder", {
                    body: `It's time to take ${medAmount} of ${medDose} ${medType} (${medName}).`,
                    icon: "logo.png", // Replace with the correct path to your logo
                });
            }
        }, delay);

        alert(`Reminder for "${medName}" set successfully!`);
    } else {
        alert("The selected time has already passed. Please choose a future time.");
    }

    // Reset the form after submission
    e.target.reset();
});
