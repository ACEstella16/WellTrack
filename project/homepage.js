document.addEventListener("DOMContentLoaded", () => {
    const medicationList = document.getElementById("medication-list");
    const editModal = document.getElementById("edit-modal");
    const cancelEditBtn = document.getElementById("cancel-edit");
    const editMedicationForm = document.getElementById("edit-medication-form");

    let medications = JSON.parse(localStorage.getItem("medications")) || [];
    let currentEditIndex = null;

    // Display medications in the dashboard
    const displayMedications = () => {
        if (medications.length > 0) {
            medicationList.innerHTML = medications
                .map(
                    (med, index) => `
                    <div class="medication-item">
                        <span><strong>${med.name}</strong> - ${med.dose} - ${med.time}</span>
                        <div class="medication-buttons">
                            <button class="edit" data-index="${index}">Edit</button>
                            <button class="delete" data-index="${index}">Delete</button>
                        </div>
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
            document.getElementById("edit-medDates").value = med.dates.join(", ");
            editModal.classList.remove("hidden");
        }
    });

    // Save Edited Medication
    editMedicationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        medications[currentEditIndex] = {
            name: document.getElementById("edit-medName").value.trim(),
            dose: document.getElementById("edit-medDose").value.trim(),
            time: document.getElementById("edit-medTime").value.trim(),
            dates: document.getElementById("edit-medDates").value.split(",").map((date) => date.trim()),
        };
        localStorage.setItem("medications", JSON.stringify(medications));
        displayMedications();
        editModal.classList.add("hidden");
    });

    // Cancel Edit
    cancelEditBtn.addEventListener("click", () => {
        editModal.classList.add("hidden");
    });

    // Delete Medication
    medicationList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const index = e.target.dataset.index;
            medications.splice(index, 1);
            localStorage.setItem("medications", JSON.stringify(medications));
            displayMedications();
        }
    });

    // Initialize
    displayMedications();
});
