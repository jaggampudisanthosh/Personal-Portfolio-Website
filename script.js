
// =====================================
// 1. EMAILJS INITIALIZATION
// =====================================

emailjs.init({
    publicKey: "8k32b6a00RaPW0bjU"
});


// =====================================
// 2. MOBILE NAVIGATION MENU
// =====================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// =====================================
// 3. DARK MODE / LIGHT MODE
// =====================================

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌙";
} else {
    themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLightMode = document.body.classList.contains("light-mode");

    if (isLightMode) {
        themeToggle.textContent = "🌙";
        localStorage.setItem("portfolio-theme", "light");
    } else {
        themeToggle.textContent = "☀";
        localStorage.setItem("portfolio-theme", "dark");
    }

});


// =====================================
// 4. CONTACT FORM WITH EMAILJS
// =====================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";

    try {

        await emailjs.sendForm(
            "service_jpq460e",
            "template_1ad1n69",
            contactForm
        );

        formStatus.textContent =
            "Thank you, " + name +
            "! Your message has been sent successfully.";

        contactForm.reset();

    } catch (error) {

        console.error("EmailJS Error:", error);

        formStatus.textContent =
            "Message could not be sent. Please try again.";

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Send Message";

    }

});


// =====================================
// 5. AUTOMATIC FOOTER YEAR
// =====================================

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();


// =====================================
// 6. ACTIVE NAVIGATION HIGHLIGHT
// =====================================

const sections = document.querySelectorAll("main section");
const navigationItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationItems.forEach(link => {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active-link");
        }

    });

});
