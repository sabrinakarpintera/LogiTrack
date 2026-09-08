/* =========================================================
   LOGITRACK — SIGN UP JAVASCRIPT
========================================================= */


/* =========================================================
   ROLE TOGGLE
========================================================= */

const optStudent = document.getElementById('opt-student');
const optInstructor = document.getElementById('opt-instructor');

[optStudent, optInstructor].forEach(opt => {

    opt.addEventListener('click', () => {

        optStudent.classList.remove('active');
        optInstructor.classList.remove('active');

        opt.classList.add('active');

    });

});


/* =========================================================
   FORM VALIDATION
========================================================= */

const form = document.getElementById('signupForm');

const fields = [
    'email',
    'fname',
    'lname',
    'password',
    'confirm'
];


/* =========================================================
   SET ERROR
========================================================= */

function setError(id, message) {

    const input = document.getElementById(id);
    const errorElement = document.getElementById(`err-${id}`);

    if (message) {

        input.classList.add('err');
        errorElement.textContent = message;

    } else {

        input.classList.remove('err');
        errorElement.textContent = '';

    }

}


/* =========================================================
   VALIDATE FORM
========================================================= */

function validate() {

    let isValid = true;

    const email = document.getElementById('email').value.trim();
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm').value;


    /* Email */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        setError(
            'email',
            'Enter a valid email address.'
        );

        isValid = false;

    } else {

        setError('email', '');

    }


    /* First Name */
    if (!fname) {

        setError(
            'fname',
            'First name is required.'
        );

        isValid = false;

    } else {

        setError('fname', '');

    }


    /* Last Name */
    if (!lname) {

        setError(
            'lname',
            'Last name is required.'
        );

        isValid = false;

    } else {

        setError('lname', '');

    }


    /* Password */
    if (password.length < 8) {

        setError(
            'password',
            'Use at least 8 characters.'
        );

        isValid = false;

    } else {

        setError('password', '');

    }


    /* Confirm Password */
    if (!confirmPassword || confirmPassword !== password) {

        setError(
            'confirm',
            'Passwords do not match.'
        );

        isValid = false;

    } else {

        setError('confirm', '');

    }


    return isValid;

}


/* =========================================================
   CLEAR ERRORS WHEN USER TYPES
========================================================= */

fields.forEach(id => {

    document.getElementById(id).addEventListener(
        'input',
        () => setError(id, '')
    );

});


/* =========================================================
   OTP MODAL
========================================================= */

const otpModalElement = document.getElementById('otpModal');

const otpModal = new bootstrap.Modal(
    otpModalElement
);

let resendInterval = null;


/* =========================================================
   SIGN UP FORM SUBMISSION
========================================================= */

form.addEventListener('submit', function (event) {

    event.preventDefault();


    /* Stop if validation fails */
    if (!validate()) {
        return;
    }


    /* Get email */
    const email = document
        .getElementById('email')
        .value
        .trim();


    /* Set email inside OTP modal */
    document.getElementById(
        'otpEmailTarget'
    ).textContent = email;


    /* Reset OTP status */
    const otpStatus = document.getElementById('otpStatus');

    otpStatus.textContent = '';
    otpStatus.className = 'otp-status';


    /* Clear OTP boxes */
    document
        .querySelectorAll('.otp-box')
        .forEach(box => {
            box.value = '';
        });


    /* Show modal */
    otpModal.show();


    /* Start resend countdown */
    startResendTimer();


    /* Focus first OTP box */
    setTimeout(() => {

        document
            .querySelector('.otp-box[data-idx="0"]')
            .focus();

    }, 400);

});


/* =========================================================
   OTP BOXES
========================================================= */

const otpBoxes = Array.from(
    document.querySelectorAll('.otp-box')
);


otpBoxes.forEach((box, index) => {


    /* -----------------------------------------
       INPUT
    ----------------------------------------- */

    box.addEventListener('input', () => {

        /* Allow numbers only */
        box.value = box.value
            .replace(/[^0-9]/g, '');


        /* Move to next box */
        if (
            box.value &&
            index < otpBoxes.length - 1
        ) {

            otpBoxes[index + 1].focus();

        }

    });


    /* -----------------------------------------
       BACKSPACE
    ----------------------------------------- */

    box.addEventListener('keydown', event => {

        if (
            event.key === 'Backspace' &&
            !box.value &&
            index > 0
        ) {

            otpBoxes[index - 1].focus();

        }

    });


    /* -----------------------------------------
       PASTE OTP
    ----------------------------------------- */

    box.addEventListener('paste', event => {

        event.preventDefault();


        const text = (
            event.clipboardData.getData('text') || ''
        )
            .replace(/[^0-9]/g, '')
            .slice(0, 6);


        text.split('').forEach((character, idx) => {

            if (otpBoxes[idx]) {

                otpBoxes[idx].value = character;

            }

        });


        const lastIndex = Math.min(
            text.length,
            otpBoxes.length
        ) - 1;


        if (lastIndex >= 0) {

            otpBoxes[lastIndex].focus();

        }

    });

});


/* =========================================================
   VERIFY OTP
========================================================= */

document
    .getElementById('verifyBtn')
    .addEventListener('click', () => {

        const code = otpBoxes
            .map(box => box.value)
            .join('');


        const statusElement =
            document.getElementById('otpStatus');


        /* Check if all digits are entered */
        if (code.length < 6) {

            statusElement.textContent =
                'Enter all 6 digits.';

            statusElement.className =
                'otp-status bad';

            return;

        }


        /*
         * NOTE:
         * This currently only simulates successful
         * verification.
         *
         * Later, PHP will send the actual OTP,
         * verify it, and create the MongoDB account.
         */

        statusElement.textContent =
            'Email verified — account created.';

        statusElement.className =
            'otp-status ok';

    });


/* =========================================================
   RESEND OTP TIMER
========================================================= */

function startResendTimer() {

    const resendButton =
        document.getElementById('resendBtn');

    const timerElement =
        document.getElementById('resendTimer');


    let seconds = 30;


    resendButton.disabled = true;

    timerElement.textContent = seconds;


    /* Clear previous timer */
    if (resendInterval) {

        clearInterval(resendInterval);

    }


    resendInterval = setInterval(() => {

        seconds -= 1;

        timerElement.textContent = seconds;


        if (seconds <= 0) {

            clearInterval(resendInterval);

            resendButton.disabled = false;

            resendButton.innerHTML =
                'Resend code';

        }

    }, 1000);

}


/* =========================================================
   RESEND OTP
========================================================= */

document
    .getElementById('resendBtn')
    .addEventListener('click', () => {


        const resendButton =
            document.getElementById('resendBtn');


        resendButton.innerHTML =
            'Resend (<span id="resendTimer">30</span>s)';


        startResendTimer();


        const statusElement =
            document.getElementById('otpStatus');


        statusElement.textContent =
            'A new code has been sent.';

        statusElement.className =
            'otp-status ok';

    });