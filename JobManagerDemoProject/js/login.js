document.getElementById("btnSubmitLogin").addEventListener("click", AttemptLogin);

function AttemptLogin(){
    var username = document.getElementById("usernameInput").value;
    CheckForUsernameMatch(username);
    
    // usernamePasswordForm.reset();
}

function CheckForUsernameMatch(username){
    var baseURL = "https://localhost:5001/Users/CheckForUsername";
    var queryString = "?username=" + username;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterCheckForUsernameMatch;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterCheckForUsernameMatch() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok
                //alert(xhr.responseText);

                var response = JSON.parse(xhr.responseText);

                if (response.result === "success") {
                    var numberMatchingUserAccounts = response.numberResults;
                    if (numberMatchingUserAccounts >= 1){
                        CheckForUsernameAndPasswordMatch(); 
                    } else {
                        alert('Username does not exist!');
                    }
                    
                } else {
                    alert("API Error: " + response.message);
                }

            } else {
                alert("Server Error: " + xhr.statusText);
            }
        }
    }
}
    
function CheckForUsernameAndPasswordMatch(username, password){
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
            
    userAccount = {
        "username": username,
        "password": password
    };

    postBody = JSON.stringify(userAccount);

    var baseURL = "https://localhost:5001/Users/CheckForUsernamePasswordMatch";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = doAfterCheckForUsernameAndPasswordMatch;
    xhr.open("POST", baseURL, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(postBody);

    function doAfterCheckForUsernameAndPasswordMatch() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok
                //alert(xhr.responseText);

                var response = JSON.parse(xhr.responseText);

                if (response.result === "success") {
                    window.location = "index.html"; 
                    
                } else {
                    alert("API Error: " + response.message);
                }

            } else {
                alert("Server Error: " + xhr.statusText);
            }
        }
    }
}