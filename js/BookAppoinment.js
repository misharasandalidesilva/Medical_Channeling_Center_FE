$(document).ready(function () {
    $('#BookAppoinmentBTN').on('click', function (e) {
        e.preventDefault();

        let loggedUserId = localStorage.getItem("LoggedUserId");
        console.log("Logged user ID:", loggedUserId);

        let fullName = $('#fullname').val();
        let phone = $('#mobile').val();
        let date = $('#appoinmentdates').val();
        let doctorName = $('#selectdoctor').val();
        let message = $('#message').val();

        console.log(fullName, phone, date, doctorName, message);

                $.ajax({
                    url: 'http://localhost:8080/api/v1/bookappoinment/saveAppoinments',
                    method: 'POST',
                    contentType: 'application/json',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("authToken")
                    },
                    data: JSON.stringify({
                        fullName: fullName,
                        phone: phone,
                        appointmentDate: date,
                        doctorName: doctorName,
                        message: message,
                        user:{
                            uid: loggedUserId
                        }
                    }),
                    success: function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'Appointment Booked!',
                            text: 'You will receive a confirmation shortly.',
                            confirmButtonColor: '#007bff'
                        });
                        $('form')[0].reset(); // Clear the form
                    },
                    error: function (xhr) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Something went wrong. Please try again later.',
                            confirmButtonColor: '#007bff'
                        });
                        console.error(xhr.responseText);
                    }
                });
    });
});