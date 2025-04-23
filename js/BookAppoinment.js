loadAllAppoinments();
doctorNameFetchAppoinments();
console.log("Welcome to BookAppoinment Page");
$(document).ready(function () {
    let loggedUserID = localStorage.getItem("LoggedUserId");
    // console.log("loggedUserID", loggedUserID);

    $.ajax({
        url: `http://localhost:8080/api/v1/patient/getPatient/${loggedUserID}`,
        method: "GET",
        // headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("authToken")
        // },
        success: function (response) {
            // console.log(response);

            const patient = response[0];
            localStorage.setItem("loggedPatientId", patient.pid);
            const loggedPatientId = patient.pid;

            $.ajax({
                url: `http://localhost:8080/api/v1/doctor/getdoctorName`,
                method: "GET",
                success: function (response) {
                    if (Array.isArray(response) && response.length > 0) {
                        // Assuming the response is an array with a single doctor name
                        const doctorName = response[0]; // Get the first item (doctor name)
                        $("#selectdoctor").append(
                            `<option value="${doctorName}">${doctorName}</option>` // Use appropriate value for 'value'
                        );
                    } else {
                        // Handle case where response is not as expected
                        console.log('No doctor data found');
                    }

                    $('#BookAppoinmentBTN').click(function () {
                        const fullname = $('#fullname').val();
                        const mobile = $('#mobile').val();
                        const appoinmentdates = $('#appoinmentdates').val();
                        const selectdoctor = $('#selectdoctor').val();
                        const message = $('#message').val();
                        const patientId = loggedPatientId;
                        // console.log(fullname, mobile, appoinmentdates, selectdoctor, patientId);

                        $.ajax({
                            url: `http://localhost:8080/api/v1/bookappoinment/saveAppoinments`,
                            method: "POST",
                            contentType: "application/json",
                            data: JSON.stringify({
                                fullName: fullname,
                                phone: mobile,
                                appointmentDate: appoinmentdates,
                                doctorName: selectdoctor,
                                message: message,
                                patient :{
                                    pid : patientId
                                }
                            }),
                            success: function (response) {
                                // console.log(response);
                                loadAllAppoinments();
                                window.location.href = "./PatientDashboard.html";
                            },
                            error: function (xhr, status, error) {
                                // console.error(error);
                            },
                        });
                    })
                },
                error: function (xhr, status, error) {
                    // console.error(error);
                },
            });
        },
        error: function (xhr, status, error) {
            // console.error(error);
        },
    });
});

loadAllAppoinments();
function loadAllAppoinments() {
            $.ajax({
                url:"http://localhost:8080/api/v1/bookappoinment/getallAppointments",
                method: "GET",
                success: function (response) {
                    // console.log(response);
                    $('#patienttableBody').empty();
                    response.forEach(appoinment => {
                        $('#patienttableBody').append(`
                            <tr>
                                <td>${appoinment.fullName}</td>
                                <td>${appoinment.doctorName}</td>
                                <td>${appoinment.appointmentDate}</td>
                                <td>${appoinment.phone}</td>
                                <td>${appoinment.message}</td>
                                <td><button type="button" class="btn btn-danger" onclick="deleteAppoinment('${appoinment.aid}')">Delete</button></td>
                            </tr>
                        `);
                    });
                },
                error: function (xhr, status, error) {
                    // console.error(error);
                },
            });
        }



patientViewAppoinment();
function patientViewAppoinment() {
    const patientId = localStorage.getItem("loggedPatientId");
    // console.log("pid",patientId)

    $.ajax({
        url: `http://localhost:8080/api/v1/bookappoinment/getAppoinmentsPatientId/${patientId}`,
        method: "GET",
        success: function (response) {
            console.log("Appointments for patient:", response);
            $('#myAppoinment').empty();
            response.forEach(appoinment => {
                $('#myAppoinment').append(`
                    <tr>
                        <td>${appoinment.fullName}</td>
                        <td>${appoinment.doctorName}</td>
                        <td>${appoinment.appointmentDate}</td>
                        <td>${appoinment.phone}</td>
                        <td>${appoinment.message}</td>
                        <td><button type="button" class="btn btn-danger" onclick="deleteAppoinment('${appoinment.aid}')">Delete</button></td>
                    </tr>
                `);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to fetch patient appointments:", error);
        }
    });
}


function doctorNameFetchAppoinments() {
    const loggedUserId = localStorage.getItem("LoggedUserId");
    console.log("hhhh",loggedUserId)

    $.ajax({
        url: `http://localhost:8080/api/v1/doctor/getdoctor/${loggedUserId}`,
        method: "GET",
        success: function (doctorData) {
            const doctorName = doctorData.data.name;

            console.log("Full doctor data response:", doctorName);

            $.ajax({
                url: `http://localhost:8080/api/v1/bookappoinment/getAppoinmentsDoctor/${doctorName}`,
                method: "GET",
                success: function (appointments) {
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching appointments:", error);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("Error fetching doctor by user ID:", error);
        }
    });
}
