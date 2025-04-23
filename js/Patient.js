    $("#registerBtn").on("click", function() {
    console.log("Register button clicked");
    let name = $("#name").val();
    let gender = $("#gender").val();
    let birthdate = $("#birthday").val();
    let address = $("#address").val();
    let age = $("#age").val();

    $.ajax({
        url: 'http://localhost:8080/api/v1/patient/savePatient',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        },
        data: JSON.stringify({
            name: name,
            gender: gender,
            birthday: birthdate,
            address: address,
            age: age,
            user: {
                uid: localStorage.getItem("LoggedUserId")
            }
        }),
        success: function(data) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Patient registered successfully'
            });
            getPatientData();
            window.location.href = "./UserProfile.html";
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to register patient'
            });
        }
    });
});

getPatientData();

function getPatientData() {
    $.ajax({
        url: 'http://localhost:8080/api/v1/patient/getAllPatients',
        method: 'GET',
        contentType: 'application/json',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        },
        success: function(response) {
            $('#patientTable').empty();
            response.forEach(patient => {
                $('#patientTable').append(`
                    <tr>
                        <td>${patient.name}</td>
                        <td>${patient.gender}</td>
                        <td>${patient.address}</td>
                        <td>${patient.birthday}</td>
                        <td>${patient.age}</td>
                        <td>
                            <button type="button" class="btn btn-danger" onclick="deletePatient('${patient.pid}')">Delete</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to fetch patient data'
            });
        }
    });
}

function deletePatient(pid) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this patient?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `http://localhost:8080/api/v1/patient/deletePatient/${pid}`,
                method: 'DELETE',
                contentType: 'application/json',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
                },
                success: function(response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Patient deleted successfully'
                    });
                    getPatientData();
                },
                error: function(xhr, status, error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to delete patient'
                    });
                }
            });
        }
    });
}
