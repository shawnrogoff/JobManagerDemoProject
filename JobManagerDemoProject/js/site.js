(function JobManagerJS() {
    function pageLoad(){
        getJobs();
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
                "<td data-field='delete'><button type='button' id='testbuttonid' data-action='delete' data-customerid=" + customer.customerId + " class='btn btn-sm btn-outline-secondary'>Delete</button></td>" +
                // "<td data-field='details'><button id='customerDetailsBtn' title='Details' type='button' data-action='details' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#customerDetailsModal'><i class='fas fa-info-circle'></i></button></td>" +
                // "<td data-field='edit'><button id='jobEditBtn' title='Edit' type='button' data-action='edit' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#customerEditModal'><i class='fas fa-edit'></i></button></td>" +
                "<td data-field='delete'><button id='jobDeleteBtn' title='Delete' type='button' data-action='delete' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1'><i class='fas fa-edit'></i></button></td>" +
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
            //alert("You want to " + action + " customer " + customerId);

            var customerRow = e.target.parentNode.parentNode;
            var customerRowFields = customerRow.children;

            for (var i = 0; i < customerRowFields.length; i++) {
                var customerField = customerRowFields[i];
                var fieldName = customerField.dataset.field;

                if (fieldName === "customerid") {
                    document.getElementById("customerId2").value = customerField.innerText;
                }

                if (fieldName === "firstname") {
                    document.getElementById("firstName2").value = customerField.innerText;
                }

                if (fieldName === "lastname") {
                    document.getElementById("lastName2").value = customerField.innerText;
                }
            }
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
                "<th scope='row' data-field='jobId'>" + job.jobId + "</th>" +
                "<td data-field='customer'>" + job.customer + "</td>" +
                "<td data-field='envelope'>" + job.envelopeNumber + "</td>" +
                "<td data-field='jobAge'>" + job.age + " days" + "</td>" +
                "<td data-field='details'><button title='Details' type='button' data-action='details' data-jobId=" + job.jobid + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#jobDetailsModal'><i class='fas fa-info-circle'></i></button></td>" +
                "<td data-field='edit'><button title='Edit' type='button' data-action='edit' data-customerid=" + job.jobid + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#jobEditModal'><i class='fas fa-edit'></i></button></td>" +
                "<td data-field='delete'><button title='Delete' type='button' data-action='delete' data-customerid=" + job.jobid + " class='btn btn-outline-light btn-sm mx-1'><i class='fas fa-minus-square'></i></i></button></td>" +
                "<td data-field='markComplete'><button title='Mark Complete' type='button' data-action='complete' data-customerid=" + job.jobid + " class='btn btn-outline-light btn-sm mx-1'><i class='fas fa-check-square'></i></button></td>" +
                "<td data-field='markDelivered'><button title='Mark Delivered' type='button' data-action='deliver' data-customerid=" + job.jobid + " class='btn btn-outline-light btn-sm mx-1'><i class='fas fa-paper-plane'></i></button></td>" +
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
            button.addEventListener("click", handleCustomerTableButtonClick);
        }
    }

    function handleJobTableButtonClick(e) {
        var jobId = e.target.dataset.jobId;
        var action = e.target.dataset.action;

        if (action === "delete") {
            deleteJob(jobId);
        }

        if (action === "edit") {
            //alert("You want to " + action + " employee " + employeeId);

            var departmentRow = e.target.parentNode.parentNode;
            var departmentRowFields = departmentRow.children;

            for (var i = 0; i < departmentRowFields.length; i++) {
                var departmentField = departmentRowFields[i];
                var fieldName = departmentField.dataset.field;

                if (fieldName === "departmentid") {
                    document.getElementById("departmentId2").value = departmentField.innerText;
                }

                if (fieldName === "departmentname") {
                    document.getElementById("departmentName2").value = departmentField.innerText;
                }            
            }
        }
    }

    // needs to be converted from customer to job still
    function insertJob(e) {
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

    document.getElementById("showJobsBtn").addEventListener("click", OpenJobsPage);
    document.getElementById("showCustomersBtn").addEventListener("click", OpenCustomersPage);
    document.getElementById("addNewCustomerBtn").addEventListener("click", insertCustomer);

    pageLoad();
}());