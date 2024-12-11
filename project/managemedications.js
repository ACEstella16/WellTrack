document.addEventListener("DOMContentLoaded", () => {
    const medicationForm = document.getElementById("medication-form");

    // Get selected days
    const getSelectedDays = () => {
        const selectedDays = [];
        document.querySelectorAll(".days-checkboxes input[type='checkbox']:checked").forEach((checkbox) => {
            selectedDays.push(checkbox.value);
        });
        return selectedDays;
    };

    // Save Medication Data
    medicationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const medName = document.getElementById("medName").value.trim();
        const medDose = document.getElementById("medDose").value.trim();
        const medTime = document.getElementById("medTime").value.trim();
        const medDays = getSelectedDays();
        const notifSound = document.getElementById("notifSound").checked;
        const notifVibration = document.getElementById("notifVibration").checked;

        if (medName && medDose && medTime && medDays.length > 0) {
            const medications = JSON.parse(localStorage.getItem("medications")) || [];
            medications.push({
                name: medName,
                dose: medDose,
                time: medTime,
                days: medDays,
                notificationSettings: {
                    sound: notifSound,
                    vibration: notifVibration,
                },
            });

            localStorage.setItem("medications", JSON.stringify(medications));
            alert("Medication saved successfully!");
            medicationForm.reset();
        } else {
            alert("Please fill out all fields and select at least one day.");
        }
    });
});
