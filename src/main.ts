document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form') as HTMLFormElement;
    const accordion1 = document.getElementById('accordion1') as HTMLElement;
    const accordion2 = document.getElementById('accordion2') as HTMLElement;
    const proceedToNextStep = document.getElementById('proceedToNextStep') as HTMLButtonElement;
    const proceedToPayment = document.getElementById('proceedToPayment') as HTMLButtonElement;
    const messageBlock = document.getElementById('messageBloc') as HTMLElement;

    // Prevent form submission (page reload)
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
    });

    // Proceed to next step button click handler
    proceedToNextStep.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        const amount = (document.getElementById('amount') as HTMLInputElement).value;
        const currency = (document.getElementById('currency') as HTMLSelectElement).value;

        if (amount && currency) {
            // Move to the next step
            goNextAccordion(accordion1, accordion2);
        } else {
            alert('Please fill out all fields in this step.');
        }
    });

    // Proceed to payment button click handler
    proceedToPayment.addEventListener('click', () => {
        const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const message = (document.getElementById('message') as HTMLTextAreaElement).value;

        // Validate form inputs
        const validation = validatePaymentForm(fullName, email, message);
        showStatusMessage(messageBlock, accordion2, validation);
    });

    // Click handler to hide message block
    messageBlock.addEventListener('click', () => {
        hideMessage(messageBlock, accordion2);
    });

    // Initialize accordion functionality
    initAccordions();

    // Function to initialize accordion behavior
    function initAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion__header');

        accordionHeaders.forEach(header => {
            header.addEventListener('click', (e: MouseEvent) => {
                const accordion = header.closest('.accordion') as HTMLElement;
                const isActive = accordion.classList.contains('accordion--active');

                if (!isActive && !accordion.classList.contains('accordion--disabled')) {
                    openAccordion(accordion);
                }
            });

            header.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    }

    // Function to open a specific accordion
    function openAccordion(accordion: HTMLElement) {
        accordion.classList.add('accordion--active');
        accordion.querySelector('.accordion__header__checkmark')!.classList.add('visible');
        accordion.querySelectorAll('.accordion__header').forEach(element => {
            element.setAttribute('aria-expanded', 'true');
        });
    }

    // Function to move between accordions
    function goNextAccordion(currentAccordion: HTMLElement, nextAccordion: HTMLElement) {
        currentAccordion.classList.remove('accordion--active');
        currentAccordion.querySelector('.accordion__header')!.classList.add('accordion__header--done');
        currentAccordion.querySelector('.accordion__header')!.setAttribute('aria-expanded', 'false');

        nextAccordion.classList.add('accordion--active');
        nextAccordion.classList.remove('accordion--disabled');
        nextAccordion.querySelector('.accordion__header')!.setAttribute('aria-expanded', 'true');

        // Scroll to the next accordion
        nextAccordion.scrollIntoView({ behavior: 'smooth' });
    }

    // Simple validation of payment form inputs
    function validatePaymentForm(fullName: string, email: string, message: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return !!(fullName && emailPattern.test(email) && message.length > 0);
    }

    // Function to show status message block
    function showStatusMessage(messageBlock: HTMLElement, accordion: HTMLElement, status: boolean) {
        if (status) {
            messageBlock.className = 'message message--success';
            messageBlock.innerHTML = '<p>We received your request, you’ll soon get an email with the payment link.</p>';
        } else {
            messageBlock.className = 'message message--error';
            messageBlock.innerHTML = '<p>Something went wrong, please try again or contact support if the issue persists.</p>';
        }

        // Hide accordion body
        accordion.querySelector('.accordion__body')!.classList.add('accordion__body--hidden');

        messageBlock.style.display = 'block';
    }

    // Function to hide status message block
    function hideMessage(messageBlock: HTMLElement, accordion: HTMLElement) {
        // Show accordion body
        accordion.querySelector('.accordion__body')!.classList.remove('accordion__body--hidden');

        messageBlock.style.display = 'none';
    }
});
