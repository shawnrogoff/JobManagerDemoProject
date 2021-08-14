(function JobManagerJS() {
    
    function pageLoad(){
        getJobs();
        OpenJobsPage;
    }

    // Hide Login Page && Show Jobs Page
    function OpenJobsPage(){
        // Load jobs table
        getJobs();

        document.getElementById("customersPage").classList.add("invisible");
        document.getElementById("jobsPage").classList.remove("invisible");
        // Swap active button appearance
        document.getElementById("showJobsBtn").classList.remove("btn-outline-light");
        document.getElementById("showJobsBtn").classList.add("btn-light");
        document.getElementById("showCustomersBtn").classList.remove("btn-light");
        document.getElementById("showCustomersBtn").classList.add("btn-outline-light");
    }

    function OpenCustomersPage(){
        // Load customers table
        getCustomers();

        document.getElementById("jobsPage").classList.add("invisible");
        document.getElementById("customersPage").classList.remove("invisible");
        // Swap active button appearance
        document.getElementById("showJobsBtn").classList.add("btn-outline-light");
        document.getElementById("showJobsBtn").classList.remove("btn-light");
        document.getElementById("showCustomersBtn").classList.add("btn-light");
        document.getElementById("showCustomersBtn").classList.remove("btn-outline-light");
        
    }

    function getCustomers() {
        var baseURL = "https://localhost:5001/Customers/GetCustomers";
        var queryString = "";

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterGetCustomers;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterGetCustomers() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var customers = response.customers;
                        refreshCustomerTable(customers);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function refreshCustomerTable(customers) {
        var html;
        var dynamic;
        var customer;

        //Build an html table of the customers.
        html = "<table id='customerTable' class='table table-dark table-striped'>" +
            "<thead>" +
            "<tr>" +
            "<th scope='col'>Customer</th>" +
            "<th scope='col'>Phone</th>" +
            "<th scope='col'>Address</th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>";

        for (var i = 0; i < customers.length; i++) {
            customer = customers[i];
            html = html + "<tr>" +
                "<th scope='row' data-field='customer'>" + customer.firstName + " " + customer.lastName + "</th>" +
                "<td data-field='phone'>" + customer.phone + "</td>" +
                "<td data-field='address1'>" + customer.address1 + "</td>" +
                "<td data-field='details'><button id='customerDetailsBtn' title='Details' type='button' data-action='details' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#customerDetailsModal'><i class='fas fa-info-circle'></i></button></td>" +
                "<td data-field='edit'><button id='jobEditBtn' title='Edit' type='button' data-action='edit' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#customerEditModal'><i class='fas fa-edit'></i></button></td>" +
                "<td data-field='delete'><button id='jobDeleteBtn' title='Delete' type='button' data-action='delete' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1'><i class='fas fa-minus-square'></i></button></td>" +
                "</tr>";
        }

        html = html + "</tbody>" +
            "<tfoot>" +
            "<tr>" +
            "<th scope='col'>Customer</th>" +
            "<th scope='col'>Phone</th>" +
            "<th scope='col'>Address</th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "</tr>" +
            "</tfoot>" +
            "</table>";

        //Inject the new table into the DOM.
        dynamic = document.getElementById("dynamic1");
        dynamic.innerHTML = html;

        //Add a click event listener to all buttons in the table.
        var buttons = document.querySelectorAll("#customerTable .btn");

        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.addEventListener("click", handleCustomerTableButtonClick);
        }

    }

    function handleCustomerTableButtonClick(e) {
        var customerId = e.target.parentNode.dataset.customerid;
        var action = e.target.parentNode.dataset.action;

        if (action === "delete") {
            deleteCustomer(customerId);
        }

        if (action === "edit") {
            getCustomerByCustomerIdForEdit(customerId);
        }

        if (action === "details") {
            getCustomerByCustomerIdForDetails(customerId);
        }
        e.preventDefault();
    }

    function insertCustomer(e) {
        var firstName = document.getElementById("addCustomerFirstName");
        var lastName = document.getElementById("addCustomerLastName");
        var phone = document.getElementById("addCustomerPhone");
        var email = document.getElementById("addCustomerEmail");
        var address1 = document.getElementById("addCustomerAddress1");
        var address2 = document.getElementById("addCustomerAddress2");
        var city = document.getElementById("addCustomerCity");
        var stateInput = document.getElementById("addCustomerStateSelection");
        var zipcode = document.getElementById("addCustomerZipcode");
        var status = "active";
        var comments = "none";
        var creditBalance = 0;
        
        customer = {
            "customerId": 0,
            "firstName": firstName.value,
            "lastName": lastName.value,
            "phone": phone.value,
            "email": email.value,
            "address1": address1.value,
            "address2": address2.value,
            "city": city.value,
            "state": stateInput.options[stateInput.selectedIndex].innerText,
            "zipcode": zipcode.value,
            "status": status,
            "comments": comments,
            "creditBalance": creditBalance
        };

        firstName.value = "";
        lastName.value = "";
        phone.value = "";
        email.value = "";
        address1.value = "";
        address2.value = "";
        city.value = "";
        stateInput.selectedIndex = 0;
        zipcode.value = "";
        status.value = "";
        comments.value = "";
        creditBalance.value = 0;

        postBody = JSON.stringify(customer);

        var baseURL = "https://localhost:5001/Customers/InsertCustomer";

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterInsertCustomer;
        xhr.open("POST", baseURL, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(postBody);

        function doAfterInsertCustomer() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var customers = response.customers;
                        refreshCustomerTable(customers);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
        e.preventDefault();
    }

    function deleteCustomer(customerId) {
        var baseURL = "https://localhost:5001/Customers/DeleteCustomer";
        var queryString = "?customerId=" + customerId;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterDeleteCustomers;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterDeleteCustomers() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var customers = response.customers;
                        refreshCustomerTable(customers);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function getCustomerByCustomerIdForDetails(customerId){
        var baseURL = "https://localhost:5001/Customers/GetCustomerByCustomerId";
        var queryString = "?customerId=" + customerId;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterGetCustomers;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterGetCustomers() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var customers = response.customers;
                        populateCustomerDetailsModal(customers);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function populateCustomerDetailsModal(customers){
        var customer;

        for (var i = 0; i < customers.length; i++) {
            customer = customers[i];

            document.getElementById("customerDetailsCustomerId").value = customer.customerId;
            document.getElementById("customerDetailsFirstName").value = customer.firstName;
            document.getElementById("customerDetailsLastName").value = customer.lastName;
            document.getElementById("customerDetailsPhone").value = customer.phone;
            document.getElementById("customerDetailsEmail").value = customer.email;
            document.getElementById("customerDetailsAddress1").value = customer.address1;
            document.getElementById("customerDetailsAddress2").value = customer.address2;
            document.getElementById("customerDetailsCity").value = customer.city;
            document.getElementById("customerDetailsState").value = customer.state;
            document.getElementById("customerDetailsZipcode").value = customer.zipcode;
            document.getElementById("customerDetailsCreditBalance").value = customer.creditBalance;
        }
    }

    function getCustomerByCustomerIdForEdit(customerId){
        var baseURL = "https://localhost:5001/Customers/GetCustomerByCustomerId";
        var queryString = "?customerId=" + customerId;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterGetCustomers;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterGetCustomers() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var customers = response.customers;
                        populateCustomerEditModal(customers);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function populateCustomerEditModal(customers){
        var customer;

        for (var i = 0; i < customers.length; i++) {
            customer = customers[i];

            document.getElementById("editCustomerCustomerId").value = customer.customerId;
            document.getElementById("editCustomerFirstName").value = customer.firstName;
            document.getElementById("editCustomerLastName").value = customer.lastName;
            document.getElementById("editCustomerPhone").value = customer.phone;
            document.getElementById("editCustomerEmail").value = customer.email;
            document.getElementById("editCustomerAddress1").value = customer.address1;
            document.getElementById("editCustomerAddress2").value = customer.address2;
            document.getElementById("editCustomerCity").value = customer.city;
            document.getElementById("editCustomerState").value = customer.state;
            document.getElementById("editCustomerZipcode").value = customer.zipcode;
            document.getElementById("editCustomerCreditBalance").value = customer.creditBalance;
        }
    }

    function updateCustomer(e){
        var customerId = document.getElementById("editCustomerCustomerId");
        var firstName = document.getElementById("editCustomerFirstName");
        var lastName = document.getElementById("editCustomerLastName");
        var phone = document.getElementById("editCustomerPhone");
        var email = document.getElementById("editCustomerEmail");
        var address1 = document.getElementById("editCustomerAddress1");
        var address2 = document.getElementById("editCustomerAddress2");
        var city = document.getElementById("editCustomerCity");
        var stateInput = document.getElementById("editCustomerState");
        var zipcode = document.getElementById("editCustomerZipcode");
        var status = "active";
        var comments = "none";
        var creditBalance = document.getElementById("editCustomerCreditBalance");
        
        customer = {
            "customerId": Number(customerId.value),
            "firstName": firstName.value,
            "lastName": lastName.value,
            "phone": phone.value,
            "email": email.value,
            "address1": address1.value,
            "address2": address2.value,
            "city": city.value,
            "state": stateInput.options[stateInput.selectedIndex].innerText,
            "zipcode": zipcode.value,
            "status": status,
            "comments": comments,
            "creditBalance": Number(creditBalance.value)
        };

        firstName.value = "";
        lastName.value = "";
        phone.value = "";
        email.value = "";
        address1.value = "";
        address2.value = "";
        city.value = "";
        stateInput.selectedIndex = 0;
        zipcode.value = "";
        status.value = "";
        comments.value = "";
        creditBalance.value = 0;

        postBody = JSON.stringify(customer);

        var baseURL = "https://localhost:5001/Customers/UpdateCustomer";

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterUpdateCustomer;
        xhr.open("POST", baseURL, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(postBody);

        function doAfterUpdateCustomer() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var customers = response.customers;
                        refreshCustomerTable(customers);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
        e.preventDefault();
    }

    function getJobHistory(){
        var customerId = document.getElementById("customerDetailsCustomerId").value;
        document.getElementById("showJobHistoryCustomerName").innerHTML = customerId;

        getJobsByCustomerId(customerId);
    }

    function getJobsByCustomerId(customerId){
        var baseURL = "https://localhost:5001/Jobs/GetJobsByCustomerId";
        var queryString = "?customerId=" + customerId;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterGetCustomers;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterGetCustomers() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var jobs = response.jobs;
                        populateJobHistoryModal(jobs);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function populateJobHistoryModal(jobs){
        var html;
        var dynamic;
        var job;

        //Build an html table of the customers.
        html = "<table id='jobHistoryTable' class='table table-dark table-striped mb-2'>" +
            "<thead>" +
            "<tr>" +
            "<th scope='col'>Job ID</th>" +
            "<th scope='col'>Job Type</th>" +
            "<th scope='col'>Envelope #</th>" +
            "<th scope='col'>Status</th>" +
            "<th scope='col'>Details</th>" +
            "<th scope='col'></th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>";
                    
        for (var i = 0; i < jobs.length; i++) {
            job = jobs[i];

            html = html + "<tr>" +
                "<th scope='row' data-field='jobid'>" + job.jobId + "</th>" +
                "<td data-field='jobType'>" + job.jobType + "</td>" +
                "<td data-field='envelope'>" + job.envelopeNumber + "</td>" +
                "<td data-field='status'>" + job.status + "</td>" +
                "<td data-field='jobdetails'>" + job.details  + "</td>" +
                "<td data-field='details'><button title='Details' type='button' data-action='details' data-jobid=" + job.jobId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#jobDetailsModal'><i class='fas fa-info-circle'></i></button></td>" +
                "</tr>";
        }

        html = html + "</tbody>" +
            "<tfoot>" +
            "<tr>" +
            "<th scope='col'>Job ID</th>" +
            "<th scope='col'>Job Type</th>" +
            "<th scope='col'>Envelope #</th>" +
            "<th scope='col'>Status</th>" +
            "<th scope='col'>Details</th>" +
            "<th scope='col'></th>" +
            "</tr>" +
            "</tfoot>" +
            "</table>";

        //Inject the new table into the DOM.
        dynamic = document.getElementById("dynamicJobHistoryTable");
        dynamic.innerHTML = html;

        //Add a click event listener to all buttons in the table.
        var buttons = document.querySelectorAll("#dynamicJobHistoryTable .btn");

        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.addEventListener("click", handleJobHistoryTableButtonClick);
        }
    }

    function handleJobHistoryTableButtonClick(e){
        var jobId = e.target.parentNode.dataset.jobid;
        var action = e.target.parentNode.dataset.action;

        if (action === "details") {
            getJobByJobIdForDetails(jobId);
        }
        e.preventDefault();
    }
    

    // === Job Code === //

    function getJobs() {
        var baseURL = "https://localhost:5001/Jobs/GetJobs";
        var queryString = "";

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterGetJobs;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterGetJobs() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var jobs = response.jobs;
                        refreshJobTable(jobs);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function refreshJobTable(jobs) {
        var html;
        var dynamic;
        var job;

        //Build an html table of the customers.
        html = "<table id='jobTable' class='table table-dark table-striped mb-2'>" +
            "<thead>" +
            "<tr>" +
            "<th scope='col'>Job ID</th>" +
            "<th scope='col'>Customer</th>" +
            "<th scope='col'>Envelope #</th>" +
            "<th scope='col'>Age</th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>";
                    
        for (var i = 0; i < jobs.length; i++) {
            job = jobs[i];

            

            html = html + "<tr>" +
                "<th scope='row' data-field='jobid'>" + job.jobId + "</th>" +
                "<td data-field='customer'>" + job.customer + "</td>" +
                "<td data-field='envelope'>" + job.envelopeNumber + "</td>" +
                "<td data-field='jobAge'>" + job.age + " days" + "</td>" +
                "<td data-field='details'><button title='Details' type='button' data-action='details' data-jobid=" + job.jobId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#jobDetailsModal'><i class='fas fa-info-circle'></i></button></td>" +
                "<td data-field='edit'><button title='Edit' type='button' data-action='edit' data-jobid=" + job.jobId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#jobEditModal'><i class='fas fa-edit'></i></button></td>" +
                "<td data-field='delete'><button title='Delete' type='button' data-action='delete' data-jobid=" + job.jobId + " class='btn btn-outline-light btn-sm mx-1'><i class='fas fa-minus-square'></i></i></button></td>" +
                "<td data-field='markComplete'><button title='Mark Complete' type='button' data-action='complete' data-jobid=" + job.jobId + " class='btn btn-outline-light btn-sm mx-1'><i class='fas fa-check-square'></i></button></td>" +
                "<td data-field='markDelivered'><button title='Mark Delivered' type='button' data-action='deliver' data-jobid=" + job.jobId + " class='btn btn-outline-light btn-sm mx-1'><i class='fas fa-paper-plane'></i></button></td>" +
                "</tr>";
        }

        html = html + "</tbody>" +
            "<tfoot>" +
            "<tr>" +
            "<th scope='col'>Job ID</th>" +
            "<th scope='col'>Customer</th>" +
            "<th scope='col'>Envelope #</th>" +
            "<th scope='col'>Age</th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "<th scope='col'></th>" +
            "</tr>" +
            "</tfoot>" +
            "</table>";

        //Inject the new table into the DOM.
        dynamic = document.getElementById("dynamic2");
        dynamic.innerHTML = html;

        //Add a click event listener to all buttons in the table.
        var buttons = document.querySelectorAll("#jobTable .btn");

        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.addEventListener("click", handleJobTableButtonClick);
        }
    }

    function handleJobTableButtonClick(e) {
        var jobId = e.target.parentNode.dataset.jobid;
        var action = e.target.parentNode.dataset.action;

        if (action === "details") {
            getJobByJobIdForDetails(jobId);
        }

        if (action === "edit") {
            getJobByJobIdForEdit(jobId);
        }

        if (action === "delete") {
            deleteJob(jobId);
        }

        if (action === "complete") {
            markJobComplete(jobId);
        }

        if (action === "deliver") {
            markJobDelivered(jobId);
        }
    }

    // needs to be converted from customer to job still
    function insertJob(e) {
        var customerId = document.getElementById("addJobCustomerId");
        var jobType = document.getElementById("addJobJobType");
        // Diverge job status between repairs/other and customs since customs take their own route
        var jobStatus = "in-progress";
            if (jobType == "custom"){
                jobStatus = "quote";
            }
        var status = jobStatus;
        // Use the current date as received date:
        var todayDate = new Date().toISOString().slice(0, 10);
        var received = todayDate;
        // var completed = "";
        // var delivered = "";
        var details = document.getElementById("addJobDetails");
        var estimate = document.getElementById("addJobEstimate");
        // var finalPrice = document.getElementById("addCustomerAddress2");
        // var comments = "";
        var envelopeNumber =  document.getElementById("addJobEnvelopeNumber");      

        var textNotifications = 0;
        if(document.getElementById("textNotificationCheck").checked) {
            textNotifications = document.getElementById("textNotificationCheck").value; 
        }

        var emailNotifications = 0;
        if(document.getElementById("emailNotificationCheck").checked) {
            emailNotifications = document.getElementById("emailNotificationCheck").value; 
        }
        
        job = {
            "jobId": 0,
            "customerId": customerId.value,
            "jobType": jobType.value,
            "status": status,
            "received": received,
            // "completed": completed.value,
            // "delivered": delivered.value,
            "details": details.value,
            "estimate": estimate.value,
            // "finalPrice": finalPrice.value,
            // "comments": comments.value,
            "envelopeNumber": envelopeNumber.value,
            "textNotifications": textNotifications,
            "emailNotifications": emailNotifications
        };

        customerId.value = "";
        jobType.selectedIndex = 0;
        envelopeNumber.value = "";
        estimate.value = 0;
        document.getElementById("addJobCustomer").value = "";
        document.getElementById("textNotificationCheck").value = 0;
        document.getElementById("emailNotificationCheck").value = 0;

        postBody = JSON.stringify(job);

        var baseURL = "https://localhost:5001/Jobs/InsertJob";

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterInsertJob;
        xhr.open("POST", baseURL, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(postBody);

        function doAfterInsertJob() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var jobs = response.jobs;
                        refreshJobTable(jobs);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
        e.preventDefault();
    }

    function deleteJob(jobId) {
        var baseURL = "https://localhost:5001/Jobs/DeleteJob";
        var queryString = "?jobId=" + jobId;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterDeleteJob;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterDeleteJob() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var jobs = response.jobs;
                        refreshJobTable(jobs);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function getJobByJobIdForDetails(jobId) {
        var baseURL = "https://localhost:5001/Jobs/GetJobByJobId";
        var queryString = "?jobId=" + jobId;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterGetJobForDetails;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterGetJobForDetails() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var job = response.jobs;
                        populateJobDetailsModal(job);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function populateJobDetailsModal(jobs){
        var job;

        for (var i = 0; i < jobs.length; i++) {
            job = jobs[i];

            document.getElementById("jobDetailsJobId").value = job.jobId;
            document.getElementById("jobDetailsCustomer").value = job.customer;
            document.getElementById("jobDetailsJobType").value = job.jobType;
            document.getElementById("jobDetailsStatus").value = job.status;
            document.getElementById("jobDetailsReceived").value = job.received;
            document.getElementById("jobDetailsCompleted").value = job.completed;
            document.getElementById("jobDetailsDelivered").value = job.delivered;
            document.getElementById("jobDetailsDetails").value = job.details;
            document.getElementById("jobDetailsEstimate").value = job.estimate;
            document.getElementById("jobDetailsPrice").value = job.finalPrice;

            getJobByJobIdForEdit(job.jobId);
        }
    }

    function getJobByJobIdForEdit(jobId) {
        var baseURL = "https://localhost:5001/Jobs/GetJobByJobId";
        var queryString = "?jobId=" + jobId;

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterGetJobForEdit;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterGetJobForEdit() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var job = response.jobs;
                        populateJobEditModal(job, jobId);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function populateJobEditModal(jobs, jobId){
        var job;

        for (var i = 0; i < jobs.length; i++) {
            job = jobs[i];

            document.getElementById("jobEditJobId").value = jobId;
            document.getElementById("jobEditCustomer").value = job.customer;
                // Handle the job type
                var jobTypeIndex = 0;
                switch (job.jobType) {
                    case 'repair':
                        jobTypeIndex = 1;
                        break;
                    case 'custom':
                        jobTypeIndex = 2;
                        break;
                    case 'other':
                        jobTypeIndex = 3;
                        break;
                    default:
                        break;
                }
            document.getElementById("jobEditJobType").selectedIndex = jobTypeIndex;
                // Handle the job status
                var jobStatusIndex = 0;
                switch (job.status) {
                    case 'In-progress':
                        jobStatusIndex = 1;
                        break;
                    case 'completed':
                        jobStatusIndex = 2;
                        break;
                    case 'delivered':
                        jobStatusIndex = 3;
                        break;
                    case 'quote':
                        jobStatusIndex = 4;
                        break;
                    case 'cad':
                        jobStatusIndex = 5;
                        break;
                    case 'approval':
                        jobStatusIndex = 6;
                        break;
                    case 'printing':
                        jobStatusIndex = 7;
                        break;
                    case 'casting':
                        jobStatusIndex = 8;
                        break;
                    case 'setting':
                        jobStatusIndex = 9;
                        break;  
                    default:
                        break;
                }
            document.getElementById("jobEditJobStatus").selectedIndex = jobStatusIndex;
            document.getElementById("jobEditJobReceived").value = job.received;
            document.getElementById("jobEditJobCompleted").value = job.completed;
            document.getElementById("jobEditJobDelivered").value = job.delivered;
            document.getElementById("jobEditJobDetails").value = job.details;
            document.getElementById("jobEditJobEstimate").value = job.estimate;
            document.getElementById("jobEditJobPrice").value = job.finalPrice;
        }
    }

    function updateJob(e){
        var customerId = document.getElementById("addJobCustomerId");
        var jobType = document.getElementById("jobDetailsJobType").value
        var jobStatus = "in-progress";
            if (jobType == "custom"){
                jobStatus = "quote";
            }
        var status = jobStatus;
        // Use the current date as received date:
        var todayDate = new Date().toISOString().slice(0, 10);
        var received = todayDate;

        var details = document.getElementById("addJobDetails");
        var estimate = document.getElementById("addJobEstimate");

        var envelopeNumber =  document.getElementById("addJobEnvelopeNumber");      

        var textNotifications = 0;
        if(document.getElementById("textNotificationCheck").checked) {
            textNotifications = document.getElementById("textNotificationCheck").value; 
        }

        var emailNotifications = 0;
        if(document.getElementById("emailNotificationCheck").checked) {
            emailNotifications = document.getElementById("emailNotificationCheck").value; 
        }
        
        job = {
            "jobId": 0,
            "customerId": customerId.value,
            "jobType": jobType.value,
            "status": status,
            "received": received,
            // "completed": completed.value,
            // "delivered": delivered.value,
            "details": details.value,
            "estimate": estimate.value,
            // "finalPrice": finalPrice.value,
            // "comments": comments.value,
            "envelopeNumber": envelopeNumber.value,
            "textNotifications": textNotifications,
            "emailNotifications": emailNotifications
        };

        customerId.value = "";
        jobType.selectedIndex = 0;
        envelopeNumber.value = "";
        estimate.value = 0;
        document.getElementById("addJobCustomer").value = "";
        document.getElementById("textNotificationCheck").value = 0;
        document.getElementById("emailNotificationCheck").value = 0;

        postBody = JSON.stringify(customer);

        var baseURL = "https://localhost:5001/Customers/UpdateCustomer";

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterUpdateCustomer;
        xhr.open("POST", baseURL, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(postBody);

        function doAfterUpdateCustomer() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var customers = response.customers;
                        refreshCustomerTable(customers);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
        e.preventDefault();
    }

    function markJobComplete(jobId){
        // This is an update job by jobId; set status = 'complete'
        alert(`Placeholder! Update job ${jobId} job.Status to 'complete!'`);
    }

    function markJobDelivered(jobId){
        // This is an update job by jobId; set status = 'delivered'
        alert(`Placeholder! Update job ${jobId} job.Status to 'delivered!'`);
    }

    // These functions help deal with getting a customer selected for the new job being added to db
    function getCustomersForAddJob() {
        var baseURL = "https://localhost:5001/Customers/GetCustomers";
        var queryString = "";

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = doAfterGetCustomers;

        xhr.open("GET", baseURL + queryString, true);
        xhr.send();

        function doAfterGetCustomers() {

            if (xhr.readyState === 4) { //done
                if (xhr.status === 200) { //ok
                    //alert(xhr.responseText);

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        var customers = response.customers;
                        refreshCustomerTableForAddJob(customers);
                    } else {
                        alert("API Error: " + response.message);
                    }

                } else {
                    alert("Server Error: " + xhr.statusText);
                }
            }
        }
    }

    function refreshCustomerTableForAddJob(customers) {
        var html;
        var dynamic;
        var customer;

        //Build an html table of the customers.
        html = "<table id='selectCustomerTableForAddJob' class='table table-dark table-striped'>" +
            "<thead>" +
            "<tr>" +
            "<th scope='col'></th>" +
            "<th scope='col'>CustomerId</th>" +
            "<th scope='col'>Customer</th>" +
            "<th scope='col'>Phone</th>" +
            "<th scope='col'></th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>";

        for (var i = 0; i < customers.length; i++) {
            customer = customers[i];
            html = html + "<tr>" +
                "<td data-field='select'><button id='selectCustomerBtn' title='select' type='button' data-action='select' data-customerid=" + customer.customerId + " data-customerfirstname=" + customer.firstName + " data-customerlastname=" + customer.lastName + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#AddJobSelectCustomerModal'><i class='fas fa-check-square'></i></button></td>" +
                "<td data-field='customerId'>" + customer.customerId + "</td>" +    
                "<th scope='row' data-field='customer'>" + customer.firstName + " " + customer.lastName + "</th>" +
                "<td data-field='phone'>" + customer.phone + "</td>" +
                "<td data-field='details'><button id='customerDetailsBtn' title='Details' type='button' data-action='details' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#customerDetailsModal'><i class='fas fa-info-circle'></i></button></td>" +
                "</tr>";
        }

        html = html + "</tbody>" +
            "<tfoot>" +
            "<tr>" +
            "<th scope='col'></th>" +
            "<th scope='col'>CustomerId</th>" +
            "<th scope='col'>Customer</th>" +
            "<th scope='col'>Phone</th>" +
            "<th scope='col'></th>" +
            "</tr>" +
            "</tfoot>" +
            "</table>";

        //Inject the new table into the DOM.
        dynamic = document.getElementById("dynamicSelectCustomerForNewJobTable");
        dynamic.innerHTML = html;

        //Add a click event listener to all buttons in the table.
        var buttons = document.querySelectorAll("#selectCustomerTableForAddJob .btn");

        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            button.addEventListener("click", handleselectCustomerTableForAddJob);
        }

    }

    function handleselectCustomerTableForAddJob(e) {
        var customerId = e.target.parentNode.dataset.customerid;
        var customerFirstName = e.target.parentNode.dataset.customerfirstname;
        var customerLastName = e.target.parentNode.dataset.customerlastname;
        var customerFullName = `${customerFirstName} ${customerLastName}`;
        var action = e.target.parentNode.dataset.action;

        if (action === "select") {
            populateAddJobModalWithCustomer(customerId, customerFullName);
        }

        if (action === "details") {
            getCustomerByCustomerIdForDetails(customerId);
        }
        e.preventDefault();
    }

    function populateAddJobModalWithCustomer(customerId, customer){
        document.getElementById("addJobCustomerId").value = customerId;
        document.getElementById("addJobCustomer").value = customer;
    }







    // Event listeners for button clicks NOT in dynamic tables
    document.getElementById("showJobsBtn").addEventListener("click", OpenJobsPage);
    document.getElementById("showCustomersBtn").addEventListener("click", OpenCustomersPage);
    document.getElementById("addNewCustomerBtn").addEventListener("click", insertCustomer);
    document.getElementById("updateCustomerBtn").addEventListener("click", updateCustomer);
    document.getElementById("jobHistoryBtn").addEventListener("click", getJobHistory);
    document.getElementById("selectCustomerAddJobModal").addEventListener("click", getCustomersForAddJob);
    document.getElementById("addJobButton").addEventListener("click", insertJob);



    pageLoad();
}()); 