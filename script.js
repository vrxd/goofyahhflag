function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode(
            (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13)
                ? c
                : c - 26
        );
    });
}

function setCookie(name, value) {
    document.cookie = name + "=" + value + "; path=/";
}

function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let [k, v] = c.split("=");
        if (k === name) return v;
    }
    return null;
}

function login() {
    let user = document.getElementById("username").value;
    let msg = document.getElementById("message");
    let success = document.getElementById("success");

    msg.style.display = "none";
    success.style.display = "none";

    if (user.toLowerCase() === "admin") {
        msg.innerText = "Login as admin has been disabled";
        msg.style.display = "block";
        return;
    }

    setCookie("user", rot13(user));
    checkAuth();
}

function checkAuth() {
    let msg = document.getElementById("message");
    let success = document.getElementById("success");

    let cookie = getCookie("user");
    if (!cookie) return;

    let decoded = rot13(cookie);

    if (decoded === "admin") {
        fetch("flag.txt")
            .then(r => r.text())
            .then(t => {
                let flag = atob(t.trim());

                success.innerHTML = `
                    <b>You are logged in as admin.</b><br><br>
                    Congratulations here is your flag!<br><br>
                    <code>${flag}</code>
                `;
                success.style.display = "block";
            });
    } else {
        msg.innerText = "Sorry, only admin can see the flag.";
        msg.style.display = "block";
    }
}

checkAuth();