// Hide Landing Page && Show Login Page
function OpenLoginPage(){
    document.getElementById("landingPage").classList.add("invisible");
    document.getElementById("loginPage").classList.remove("invisible");
}

// Hide Login Page && Show Jobs Page
function OpenJobsPage(){
    document.getElementById("landingPage").classList.add("invisible");
    document.getElementById("loginPage").classList.add("invisible");
    document.getElementById("customersPage").classList.add("invisible");
    document.getElementById("jobsPage").classList.remove("invisible");
    // Swap active button appearance
    document.getElementById("showJobsBtn").classList.remove("btn-outline-light");
    document.getElementById("showJobsBtn").classList.add("btn-light");
    document.getElementById("showCustomersBtn").classList.remove("btn-light");
    document.getElementById("showCustomersBtn").classList.add("btn-outline-light");
}

function OpenCustomersPage(){
    document.getElementById("landingPage").classList.add("invisible");
    document.getElementById("loginPage").classList.add("invisible");
    document.getElementById("jobsPage").classList.add("invisible");
    document.getElementById("customersPage").classList.remove("invisible");
    // Swap active button appearance
    document.getElementById("showJobsBtn").classList.add("btn-outline-light");
    document.getElementById("showJobsBtn").classList.remove("btn-light");
    document.getElementById("showCustomersBtn").classList.add("btn-light");
    document.getElementById("showCustomersBtn").classList.remove("btn-outline-light");
}