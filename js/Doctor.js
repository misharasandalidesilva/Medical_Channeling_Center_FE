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
                            <button type="button" class="btn btn-danger" onclick="deleteDoctor('${doctor.did}')">Delete</button>
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

function deleteDoctor(did) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this doctor?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `http://localhost:8080/api/v1/doctor/deletedoctor/${did}`,
                method: "DELETE",
                contentType: "application/json",
                success: function(response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Doctor has been deleted.'
                    });
                    getDoctorData();
                },
                error: function(xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Delete Failed',
                        text: 'Unable to delete the doctor.'
                    });
                }
            });
        }
    });
}
