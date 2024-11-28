document.addEventListener("DOMContentLoaded", () => {
    const medicationForm = document.getElementById("medication-form");
    const medicationsList = document.getElementById("medications-list");

    // Load medications from localStorage
    const loadMedications = () => {
        const medications = JSON.parse(localStorage.getItem("medications")) || [];
        displayMedications(medications);
    };

    // Display medications
    const displayMedications = (medications) => {
        medicationsList.innerHTML = medications.length
            ? medications.map((med, index) =>
                `<div class="medication-item">
                    <span>${med.name} - ${med.time}</span>
                    <div class="medication-buttons">
                        <button class="edit" data-index="${index}">Edit</button>
                        <button class="delete" data-index="${index}">Delete</button>
                    </div>
                </div>`
            ).join("")
            : `<p>No medications scheduled yet.</p>`;
    };

    // Save medications to localStorage
    const saveMedications = (medications) => {
        localStorage.setItem("medications", JSON.stringify(medications));
    };

    // Add medication
    medicationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("medName").value;
        const time = document.getElementById("medTime").value;

        const medications = JSON.parse(localStorage.getItem("medications")) || [];
        medications.push({ name, time });
        saveMedications(medications);
        displayMedications(medications);
        medicationForm.reset();
    });

    // Handle edit and delete
    medicationsList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const medications = JSON.parse(localStorage.getItem("medications")) || [];

        if (e.target.classList.contains("delete")) {
            medications.splice(index, 1);
            saveMedications(medications);
            displayMedications(medications);
        } else if (e.target.classList.contains("edit")) {
            const med = medications[index];
            document.getElementById("medName").value = med.name;
            document.getElementById("medTime").value = med.time;
            medications.splice(index, 1);
            saveMedications(medications);
            displayMedications(medications);
        }
    });

    // Initialize
    loadMedications();
});
