$('#registerBTN').on('click', function() {
    let name = $("#name").val();                   // from input
    let specialization = $("#specialization").val(); // from select
    let phone = $("#phone").val();                 // from input
    let email = $("#email").val();                 // from input

    $.ajax({
        url: 'http://localhost:8080/api/v1/doctor/savedoctor',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        },
        data: JSON.stringify({
            name: name,
            specialization: specialization,
            contactNumber: phone,
            email: email,
        }),
        success: function(response) {
            console.log("Registration successful", response);
            getDoctorData()
        },
        error: function(xhr, status, error) {
            console.log("Registration failed", error);
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
                console.log(doctor);
                $('#doctortable').append(`
                    <tr>
                        <td>${doctor.name}</td>
                        <td>${doctor.specialization}</td>
                        <td>${doctor.contactNumber}</td>
                        <td>${doctor.email}</td>
                        <td>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="editDoctor(${doctor.id})">Edit</button>
                            <button type="button" class="btn btn-danger" onclick="deleteDoctor('${doctor.did}')"
>Delete</button>                        
                        </td>
                    </tr>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.log("Fetching doctors failed", error);
        }
    });
}

function deleteDoctor(did) {
    if (confirm("Are you sure you want to delete this doctor?")) {
        $.ajax({
            url: `http://localhost:8080/api/v1/doctor/deletedoctor/${did}`,
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            },
            contentType: "application/json",
            success: function(response) {
                alert("Doctor deleted successfully!");
                getDoctorData(); // refresh table
            },
            error: function(xhr, status, error) {
                alert("Error deleting doctor: " + xhr.responseText);
            }
        });
    }
}


