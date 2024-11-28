document.addEventListener("DOMContentLoaded", () => {
    const medicationForm = document.getElementById("medication-form");

    // Initialize Flatpickr for selecting multiple dates
    flatpickr("#medDates", {
        mode: "multiple",
        dateFormat: "Y-m-d",
        minDate: "today",
    });

    // Save medication to localStorage
    medicationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const medName = document.getElementById("medName").value.trim();
        const medType = document.getElementById("medType").value.trim();
        const medDose = document.getElementById("medDose").value.trim();
        const medAmount = document.getElementById("medAmount").value.trim();
        const medTime = document.getElementById("medTime").value.trim();
        const medDates = document.getElementById("medDates").value.split(",").map(date => date.trim());

        if (medName && medType && medDose && medAmount && medTime && medDates.length > 0) {
            const medications = JSON.parse(localStorage.getItem("medications")) || [];
            medications.push({
                name: medName,
                type: medType,
                dose: medDose,
                amount: medAmount,
                time: medTime,
                dates: medDates,
            });

            // Save updated medications list to localStorage
            localStorage.setItem("medications", JSON.stringify(medications));

            alert("Medication added successfully!");
            medicationForm.reset();
        } else {
            alert("Please fill out all fields and select at least one date.");
        }
    });
});
