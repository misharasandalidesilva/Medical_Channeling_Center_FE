$(document).ready(function () {
    $("#registerBTN").on("click", function () {
        console.log("Register button clicked");

        let name = $("#name").val().trim();
        let nic = $("#nic").val().trim();
        let age = $("#age").val().trim();
        let phone = $("#mobile").val().trim();
        let email = $("#email").val().trim();
        let address = $("#address").val().trim();
        let password = $("#password").val().trim();
        let confirmPassword = $("#ConfirmPassword").val().trim();
        let  role = "USER";

        // Validate if fields are empty
        if (!name || !nic || !age || !phone || !email || !address || !password || !confirmPassword) {
            Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please fill in all fields before submitting.",
                timer: 10000, // Closes after 3 seconds
                timerProgressBar: true
            });
            return;
        }

        // Check if passwords match before making the request
        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Password Mismatch",
                text: "Passwords do not match! Please try again.",
                timer: 10000, // Closes after 3 seconds
                timerProgressBar: true
            });
            return;
        }

        // Show loading alert before sending request
        Swal.fire({
            title: "Processing...",
            text: "Please wait while we create your account.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // AJAX request to backend
        $.ajax({
            url: "http://localhost:8080/api/v1/user/register",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                name: name,
                nic: nic,
                age: age,
                contactNumber: phone,
                email: email,
                address: address,
                password: password,
                role: role
            }),
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful!",
                    text: "Your account has been created successfully.",
                    timer: 10000, // Closes after 3 seconds
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                })

                window.location.href = "./LoginPage.html";
            },
            error: function (xhr) {
                console.error("Registration failed:", xhr);
                let errorMessage = "Something went wrong! Please try again.";

                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message; // Get error message from backend response
                }

                Swal.fire({
                    icon: "error",
                    title: "Registration Failed!",
                    text: errorMessage,
                    timer: 11000, // Closes after 4 seconds
                    timerProgressBar: true
                });
            }
        });
    });
});
