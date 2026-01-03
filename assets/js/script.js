// Mobile Menu Toggle (Basic placeholder)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Theme mode
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');

        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});

// Mega Menu 
let menuBars = document.querySelector("#menuBars");
let close = document.querySelector("#colose");
let popupSidebar = document.querySelector(".popup_sidebar_sec");
const bodyClass = document.body;

menuBars.addEventListener('click', function () {
    popupSidebar.classList.add('active');
    bodyClass.classList.add('addOverly');
});

close.addEventListener('click', function () {
    popupSidebar.classList.remove('active');
    bodyClass.classList.remove('addOverly');
});

document.addEventListener('click', function (e) {
    if (popupSidebar.classList.contains('active')) {
        if (
            !e.target.closest('.popup_sidebar_sec') &&
            !e.target.closest('#menuBars')
        ) {
            popupSidebar.classList.remove('active');
            bodyClass.classList.remove('addOverly');
        }
    }
});



// downloadResume
const downloadResume = document.querySelector('#downloadResume');

downloadResume.addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "assets/Resume-compressed.pdf";
    link.download = "Front End Resume-compressed.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


// Filter items 
$(document).ready(function () {
    // 1. Initialize Isotope
    var $grid = $('.projects-grid').isotope({
        itemSelector: '.project-card',
        layoutMode: 'fitRows',
        items: 3,
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });

    $('.filter-buttons').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
            filter: filterValue
        });

        // 3. Update active class on buttons
        $('.filter-buttons button').removeClass('active');
        $(this).addClass('active');
    });
});

const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const serviceInput = document.querySelector('#service');
const messageInput = document.querySelector('#message');

// SRART : Form validation
function validateName() {
    const val = nameInput.value.trim();
    if (val === "") {
        showError('name', "Name is required");
        return false;
    }
    if (!val.match(/^[A-Za-z]+\s[A-Za-z]+$/)) {
        showError('name', "Write full name (e.g., John Doe)");
        return false;
    }
    showSuccess('name');
    return true;
}

function validateEmail() {
    const val = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val === "") {
        showError('email', "Email is required");
        return false;
    }
    if (!emailRegex.test(val)) {
        showError('email', "Please enter a valid email address");
        return false;
    }
    showSuccess('email');
    return true;
}

function validateService() {
    if (serviceInput.value === "") {
        showError('service', "Please select a service");
        return false;
    }
    showSuccess('service');
    return true;
}

function validateMessage() {
    const val = messageInput.value.trim();
    if (val.length < 10) {
        showError('message', "Message must be at least 10 characters");
        return false;
    }
    showSuccess('message');
    return true;
}

nameInput.addEventListener('keyup', validateName);
emailInput.addEventListener('keyup', validateEmail);
serviceInput.addEventListener('change', validateService);
messageInput.addEventListener('keyup', validateMessage);

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();


    // Run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isServiceValid = validateService();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isServiceValid && isMessageValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        emailjs.sendForm(
                'service_3xok1ht',
                'template_47wpyqp',
                this, {
                    time: new Date().toLocaleString() // optional
                }
            )
            .then(() => {
                alert("Form submitted and Email sent successfully! ✅");
                contactForm.reset();
                resetErrors();
            })
            .catch((error) => {
                alert("Failed to send email. Please try again later. ❌");
                console.error("EmailJS Error:", error);
            })
            .finally(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });

    } else {
        console.log("Validation failed!");
    }
});


function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + '-error');

    input.classList.add('error-border');
    input.classList.remove('success-border');
    errorSpan.innerHTML = message;
    errorSpan.style.color = "red";
}

function showSuccess(fieldId) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.getElementById(fieldId + '-error');

    // Only proceed if both elements actually exist
    if (input && errorSpan) {
        input.classList.remove('error-border');
        input.classList.add('success-border');
        errorSpan.innerHTML = '<i class="fa-solid fa-circle-check" style="color: seagreen;"></i>';
    } else {
        console.error("Could not find elements for ID:", fieldId);
    }

}

function resetErrors() {
    const inputs = document.querySelectorAll('input, select, textarea');
    const errorTexts = document.querySelectorAll('.error-text');

    inputs.forEach(input => {
        input.classList.remove('error-border');
        input.classList.remove('success-border');
    });
    errorTexts.forEach(text => text.innerText = "");
}