document.addEventListener("DOMContentLoaded", () => {
    const medicationsDashboard = document.getElementById("medications-dashboard");

    // Load medications from localStorage
    const loadMedications = () => {
        const medications = JSON.parse(localStorage.getItem("medications")) || [];
        displayMedications(medications);
    };

    // Display medications on the dashboard
    const displayMedications = (medications) => {
        medicationsDashboard.innerHTML = medications.length
            ? medications.map((med) =>
                `<div class="medication-item">
                    <span><strong>${med.name}</strong> - ${med.time}</span>
                </div>`
            ).join("")
            : `<p>No medications scheduled yet. Add medications on the <a href="manageMedication.html">Manage Medication</a> page.</p>`;
    };

    // Initialize dashboard
    loadMedications();
});
