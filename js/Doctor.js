console.log("Welcome to Doctor Page");

$('#registerBtn').on('click', function() {
    let name = $("#name").val();
    let gender = $("#gender").val();
    let specialization = $("#specialization").val();
    let birthdate = $("#birthday").val();
    let address = $("#address").val();

    $.ajax({
        url: 'http://localhost:8080/api/v1/doctor/savedoctor',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        },
        data: JSON.stringify({
            name: name,
            gender: gender,
            specialization: specialization,
            birthday: birthdate,
            address: address,
            user: {
                uid: localStorage.getItem("LoggedUserId")
            }
        }),
        success: function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Doctor Registered!',
                text: 'Doctor information has been successfully saved.'
            });
            getDoctorData();
            window.location.href = "./DoctorDashbord.html";
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'Something went wrong while saving the doctor.'
            });
        }
    });
});

getDoctorData();

function getDoctorData() {
    $.ajax({
        url: 'http://localhost:8080/api/v1/doctor/getdoctors',
        method: 'GET',
        contentType: 'application/json',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        },
        success: function(response) {
            $('#doctortable').empty();
            response.forEach(doctor => {
                $('#doctortable').append(`
                    <tr>
                        <td>${doctor.name}</td>
                        <td>${doctor.gender}</td>
                        <td>${doctor.birthday}</td>
                        <td>${doctor.address}</td>
                        <td>${doctor.specialization}</td>
                        <td>
<button type="button" class="btn btn-danger" onclick="deleteDoctor('${doctor.id}')">Delete</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Load Doctors',
                text: 'Could not fetch doctor data.'
            });
        }
    });
}

function deleteDoctor(id) {
    $.ajax({
        url: `http://localhost:8080/api/v1/doctor/deletedoctor/${id}`, // ✅ URL correct
        method: "DELETE",
        contentType: 'application/json',
        success: function(response) {

                getDoctorData(); // Refresh the list
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: xhr.responseText || 'Unable to delete the doctor. Please try again later.'
            });
        }
    });
}
