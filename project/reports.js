document.addEventListener("DOMContentLoaded", () => {
    const reportForm = document.getElementById("report-form");
    const reportSection = document.getElementById("report-section");

    const adherenceChart = document.getElementById("adherence-chart");
    const moodChart = document.getElementById("mood-chart");
    const reportText = document.getElementById("report-text");

    const exportPdfButton = document.getElementById("export-pdf");
    const printReportButton = document.getElementById("print-report");

    // Mock data
    const mockData = {
        adherence: { taken: 85, missed: 15 },
        moodTrends: [50, 60, 75, 70, 80, 90, 85],
    };

    const generateReport = (startDate, endDate) => {
        // Generate adherence chart
        adherenceChart.innerHTML = `
            <p>Adherence Rates</p>
            <p>Taken: ${mockData.adherence.taken}%</p>
            <p>Missed: ${mockData.adherence.missed}%</p>
        `;

        // Generate mood trends chart
        moodChart.innerHTML = `
            <p>Mood Trends Over Last 7 Days</p>
            <p>${mockData.moodTrends.join(" → ")}</p>
        `;

        // Generate summary text
        reportText.textContent = `
            Between ${startDate} and ${endDate}, the patient adhered to ${mockData.adherence.taken}% of their medication schedule. 
            Their mood trends showed improvement over the past week.
        `;

        reportSection.classList.remove("hidden");
    };

    reportForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        if (startDate && endDate) {
            generateReport(startDate, endDate);
        } else {
            alert("Please select a valid date range.");
        }
    });

    // Export to PDF
    exportPdfButton.addEventListener("click", () => {
        alert("Exporting as PDF...");
        // Add PDF export logic here
    });

    // Print report
    printReportButton.addEventListener("click", () => {
        window.print();
    });
});
