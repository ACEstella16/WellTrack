document.addEventListener("DOMContentLoaded", () => {
    const medicationList = document.getElementById("medication-list");
    const editModal = document.getElementById("edit-modal");
    const editMedicationForm = document.getElementById("edit-medication-form");

    let medications = JSON.parse(localStorage.getItem("medications")) || [];
    let currentEditIndex = null;

    // Display medications
    const displayMedications = () => {
        if (medications.length > 0) {
            medicationList.innerHTML = medications
                .map(
                    (med, index) => `
                    <div class="medication-item">
                        <h3>${med.name}</h3>
                        <p><strong>Dose:</strong> ${med.dose}</p>
                        <p><strong>Time:</strong> ${med.time}</p>
                        <p><strong>Days:</strong> ${med.days.join(", ")}</p>
                        <button class="edit" data-index="${index}">Edit</button>
                        <button class="delete" data-index="${index}">Delete</button>
                    </div>`
                )
                .join("");
        } else {
            medicationList.innerHTML =
                '<p>No medications added yet. Add medications from the <a href="manageMedication.html">Manage Medication</a> page.</p>';
        }
    };

    // Edit Medication
    medicationList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit")) {
            currentEditIndex = e.target.dataset.index;
            const med = medications[currentEditIndex];
            document.getElementById("edit-medName").value = med.name;
            document.getElementById("edit-medDose").value = med.dose;
            document.getElementById("edit-medTime").value = med.time;
            document.getElementById("edit-medDays").value = med.days.join(", ");
            editModal.classList.remove("hidden");
        }

        // Delete Medication
        if (e.target.classList.contains("delete")) {
            const index = e.target.dataset.index;
            medications.splice(index, 1);
            localStorage.setItem("medications", JSON.stringify(medications));
            displayMedications();
        }
    });

    // Save Edited Medication
    editMedicationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        medications[currentEditIndex] = {
            name: document.getElementById("edit-medName").value.trim(),
            dose: document.getElementById("edit-medDose").value.trim(),
            time: document.getElementById("edit-medTime").value.trim(),
            days: document.getElementById("edit-medDays").value.split(",").map((day) => day.trim()),
        };
        localStorage.setItem("medications", JSON.stringify(medications));
        editModal.classList.add("hidden");
        displayMedications();
    });

    // Cancel Edit
    document.getElementById("cancel-edit").addEventListener("click", () => {
        editModal.classList.add("hidden");
    });

    // Daily Quote Functionality
    const quotes = [
        "Believe in yourself and all that you are.",
        "You are stronger than you think.",
        "Keep pushing forward, no matter what.",
        "Every day is a new beginning.",
        "Stay positive and good things will happen.",
        "You are capable of amazing things.",
        "Take it one step at a time.",
        "Happiness is a choice, choose it daily.",
        "You’ve got this!",
        "Dream big, work hard, stay focused."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote-text").textContent = `"${randomQuote}"`;

    // Initial Display
    displayMedications();
});
