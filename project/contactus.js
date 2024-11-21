document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const spinner = document.getElementById("loading-spinner");

    if (name && email && message) {
        // This shows the loading spinner
        spinner.style.display = "flex";

        // Prepares the email payload
        const payload = {
            service_id: "welltrack_contact", // The Service ID
            template_id: "template_fpuhy7j", // The Template ID
            user_id: "_IlernaCY-uHk9mm5", // The API Key
            template_params: {
                name: name,
                email: email,
                message: message,
            },
        };

        try {
            // Send email via EmailJS REST API
            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Thank you! Your message has been sent successfully.");
                e.target.reset(); // Reset the form after submission
            } else {
                alert("There was an error sending your message. Please try again later.");
                console.error("Failed to send message:", await response.text());
            }
        } catch (error) {
            alert("There was an error sending your message. Please try again later.");
            console.error("Error:", error);
        } finally {
            // Hide the loading spinner
            spinner.style.display = "none";
        }
    } else {
        alert("Please fill in all fields before submitting.");
    }
});
