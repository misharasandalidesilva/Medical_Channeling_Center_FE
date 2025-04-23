
$(document).ready(function () {
    let selectedRole = null;

    // Role selection
    $('#patientBtn, #doctorBtn').click(function (e) {
        e.preventDefault();
        selectedRole = $(this).data("role");
        $('#userRole').val(selectedRole);

        // Add some UI feedback
        $('#patientBtn, #doctorBtn').removeClass('active');
        $(this).addClass('active');
    });

    // Form submission
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const contactNumber = $('#phone').val();
        const role = $('#userRole').val();

        console.log(email, password, confirmPassword, contactNumber, role);

        if (!role) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select a role before registering.'
            });
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: 'Passwords do not match!'
            });
            return;
        }

        const userData = {
            email: email,
            password: password,
            contactNumber: contactNumber,
            role: role
        };

        $.ajax({
            url: 'http://localhost:8080/api/v1/user/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Your account has been created.'
                }).then(() => {
                    $('#registrationForm')[0].reset();
                    $('#userRole').val('');
                    $('#patientBtn, #doctorBtn').removeClass('active');
                });

                window.location.href = 'LoginPage.html';
            },
            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: xhr.responseJSON?.message || 'Something went wrong. Please try again.'
                });
            }
        });
    });
});
