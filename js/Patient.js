$("#registerBTN").on("click", function() {
    console.log("Register button");
    let name = $("#name").val();
    let nic = $("#nic").val();
    let age = $("#age").val();
    let phone = $("#mobile").val();
    let email = $("#email").val();
    let address = $("#address").val();
    let password = $("#password").val();
    let ConfirmPassword = $("#ConfirmPassword").val();

    $.ajax({
        url: 'http://localhost:8080/api/v1/user/register',
        method: 'POST',
        contentType: 'application/json',  // Set content type to JSON
        data: JSON.stringify({
            name: name,
            nic: nic,
            age: age,
            contactNumber: phone,
            email: email,
            address: address,
            password: password,
            confirmPassword: ConfirmPassword
        }),
        success: function(data) {
            if (password === ConfirmPassword) {
                alert("Patient Register successful!");
            }else {
                alert("Password does not match!");
            }

        },
        error: function(xhr, status, error) {
            // Handle errors
        }
    });
});