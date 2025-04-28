// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Toggle visibility of subcategory lists
document.querySelectorAll('.toggle-section').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const content = document.getElementById(targetId);
        if (content) {
            content.classList.toggle('hidden');
        }
    });
});

// Scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
    window.addEventListener('scroll', () => {
        scrollBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// user contact information
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent page refresh

        // Collect form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Create a contact object
        const contactInfo = {
            name,
            email,
            message,
            submittedAt: new Date().toISOString()
        };

        // Retrieve existing submissions
        let submissions = JSON.parse(localStorage.getItem("contactSubmissions")) || [];

        // Add new submission
        submissions.push(contactInfo);

        // Store updated submissions in Local Storage
        localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

        // Feedback to the user
        alert("Thanks for reaching out! Your message has been saved.");

        // Reset the form
        form.reset();
    });
});
