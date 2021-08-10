// Hide Login Page && Show Jobs Page
function OpenJobsPage(){
    // Load jobs table
    // getJobs();

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
    html = "<table id='customersTable' class='table table-dark table-striped'>" +
        "<thead>" +
        "<tr>" +
        "<th scope='col'>Customer</th>" +
        "<th scope='col'>Phone</th>" +
        "<th scope='col'>Address</th>" +
        "<th scope='col'></th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";

    for (var i = 0; i < customers.length; i++) {
        customer = customers[i];
        html = html + "<tr>" +
            "<th scope='row' data-field='customerid'>" + customer.firstName + " " + customer.lastName + "</th>" +
            "<td data-field='firstname'>" + customer.phone + "</td>" +
            "<td data-field='lastname'>" + customer.address1 + "</td>" +
            "<td>" +
            "<div class='btn-group'>" +
                "<button id='customerDetailsBtn' title='Details' type='button' data-action='details' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#customerDetailsModal'><i class='fas fa-info-circle'></i></button>" +
                "<button id='jobEditBtn' title='Edit' type='button' data-action='edit' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1' data-bs-toggle='modal' data-bs-target='#customerEditModal'><i class='fas fa-edit'></i></i></button>" +
                "<button id='jobDeleteBtn' title='Delete' type='button' data-action='delete' data-customerid=" + customer.customerId + " class='btn btn-outline-light btn-sm mx-1'><i class='fas fa-minus-square'></i></button>" +
            "</div>" +
            "</td>" +
            "</tr>";
    }

    html = html + "</tbody>" +
        "<tfoot>" +
        "<tr>" +
        "<th scope='col'>Customer</th>" +
        "<th scope='col'>Phone</th>" +
        "<th scope='col'>Address</th>" +
        "<th scope='col'></th>" +
        "</tr>" +
        "</tfoot>" +
        "</table>";

    //Inject the new table into the DOM.
    dynamic = document.getElementById("dynamic1");
    dynamic.innerHTML = html;

    //Add a click event listener to all buttons in the table.
    var buttons = document.querySelectorAll("#table1 .btn");

    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.addEventListener("click", handleCustomerTableButtonClick);
    }
}

// function handleCustomerTableButtonClick(e) {
//     var customerId = e.target.dataset.customerid;
//     var action = e.target.dataset.action;

//     if (action === "delete") {
//         deleteCustomer(customerId);
//     }

//     if (action === "edit") {
//         //alert("You want to " + action + " customer " + customerId);

//         var customerRow = e.target.parentNode.parentNode;
//         var customerRowFields = customerRow.children;

//         for (var i = 0; i < customerRowFields.length; i++) {
//             var customerField = customerRowFields[i];
//             var fieldName = customerField.dataset.field;

//             if (fieldName === "customerid") {
//                 document.getElementById("customerId2").value = customerField.innerText;
//             }

//             if (fieldName === "firstname") {
//                 document.getElementById("firstName2").value = customerField.innerText;
//             }

//             if (fieldName === "lastname") {
//                 document.getElementById("lastName2").value = customerField.innerText;
//             }
//         }
//     }
// }