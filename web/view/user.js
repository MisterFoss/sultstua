let userName = localStorage.getItem("userName");

export function displayLogin(){
    if(userName) {
        document.body.setAttribute("data-user", userName);
        document.getElementById("loggedInAs").innerText = userName;
    } else {
        document.body.removeAttribute("data-user");
    }
    
    
    let loginButton = document.getElementById("login-button");
    loginButton.addEventListener("click", () => {
        let newUserName = prompt("Who are you?");
        console.log("newUserName", newUserName);
        if(!newUserName){
            return;
        }
        userName = newUserName
        localStorage.setItem('newUserName', newUserName);
        document.body.setAttribute("data-user", newUserName);
        document.getElementById("loggedInAs").innerText = newUserName;
    })
    let logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem('userName');
        document.body.removeAttribute("data-user");
        document.getElementById("loggedInAs").innerText = "";
    })
}

export function getUserName(){
    return userName;
}