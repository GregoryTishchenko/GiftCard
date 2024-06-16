document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const accordion1 = document.getElementById('accordion1');
    const accordion2 = document.getElementById('accordion2');
    const proceedToNextStep = document.getElementById('proceedToNextStep');
    const proceedToPayment = document.getElementById('proceedToPayment');
    const messageBlock = document.getElementById('messageBloc');

    // Prevent form submission (page reload)
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    // Proceed to next step button click handler
    proceedToNextStep.addEventListener('click', function (e) {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const currency = document.getElementById('currency').value;

        if (amount && currency) {
            // Move to the next step
            goNextAccordion(accordion1, accordion2);
        } else {
            alert('Please fill out all fields in this step.');
        }
    });

    // Proceed to payment button click handler
    proceedToPayment.addEventListener('click', function () {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate form inputs
        const validation = validatePaymentForm(fullName, email, message);
        showStatusMessage(messageBlock, accordion2, validation);
    });

    // Click handler to hide message block
    messageBlock.addEventListener('click', function () {
        hideMessage(messageBlock, accordion2);
    });

    // Initialize accordion functionality
    initAccordions();

    // Function to initialize accordion behavior
    function initAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion__header');

        accordionHeaders.forEach(header => {
            header.addEventListener('click', function (e) {
                const accordion = this.closest('.accordion');
                const isActive = accordion.classList.contains('accordion--active');

                if (!isActive && !accordion.classList.contains('accordion--disabled')) {
                    openAccordion(accordion);
                }
            });

            header.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    }

    // Function to open a specific accordion
    function openAccordion(accordion) {
        accordion.classList.add('accordion--active');
        accordion.querySelector('.accordion__header__checkmark').classList.add('visible');
        accordion.querySelectorAll('.accordion__header').setAttribute('aria-expanded', 'true');
    }

    // Function to move between accordions
    function goNextAccordion(currentAccordion, nextAccordion) {
        currentAccordion.classList.remove('accordion--active');
        currentAccordion.querySelector('.accordion__header').classList.add('accordion__header--done');
        currentAccordion.querySelector('.accordion__header').setAttribute('aria-expanded', 'false');

        nextAccordion.classList.add('accordion--active');
        nextAccordion.classList.remove('accordion--disabled');
        nextAccordion.querySelector('.accordion__header').setAttribute('aria-expanded', 'true');
        
        // Scroll to the next accordion
        nextAccordion.scrollIntoView({ behavior: 'smooth' });
    }

    // Simple validation of payment form inputs
    function validatePaymentForm(fullName, email, message) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return fullName && emailPattern.test(email) && message;
    }

    // Function to show status message block
    function showStatusMessage(messageBlock, accordion, status) {
        if (status) {
            messageBlock.className = 'message message--success';
            messageBlock.innerHTML = '<p>We received your request, you’ll soon get an email with the payment link.</p>';
        } else {
            messageBlock.className = 'message message--error';
            messageBlock.innerHTML = '<p>Something went wrong, please try again or contact support if the issue persists.</p>';
        }

        // Hide accordion body
        accordion.querySelector('.accordion__body').classList.add('accordion__body--hidden');
        
        messageBlock.style.display = 'block';
    }

    // Function to hide status message block
    function hideMessage(messageBlock, accordion) {
        // Show accordion body
        accordion.querySelector('.accordion__body').classList.remove('accordion__body--hidden');

        messageBlock.style.display = 'none';
    }
});
