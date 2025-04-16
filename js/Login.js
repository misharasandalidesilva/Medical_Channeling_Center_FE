
$(document).ready(function () {
    $("#loginBTN").click(() => {
        let email = $("#email").val();
        let password = $("#password").val();

        $.ajax({
            url: "http://localhost:8080/api/v1/auth/authenticate",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                email: email,
                password: password,
            }),
            success: function (response) {
                let Authtoken = response.data.token;
                let rolee = response.data.role;
                let name = response.data.name;
                let uid = response.data.id;

                localStorage.setItem("authToken", Authtoken);
                localStorage.setItem("userEmail", email);
                localStorage.setItem("Role", rolee);
                localStorage.setItem("name", name);
                localStorage.setItem("LoggedUserId", uid);

                console.log("userID", uid);
                console.log(Authtoken);
                console.log(rolee);
                console.log(name);
                console.log(uid);

                    if (rolee === "USER") {
                        window.location.href = "./index.html";
                    } else if (rolee === "ADMIN") {
                        window.location.href = "./AdminDashboard.html";
                    } else if (rolee === "DOCTOR") {
                        window.location.href = "./AdminDashboard-Doctor.html";
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Login Failed',
                            text: 'Unknown role. Redirecting to home.'
                        });
                    }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                alert("Login failed! Please check your credentials.");
            }
        });
    });
});


