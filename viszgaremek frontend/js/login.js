const result = document.querySelector('.result');
const apiUrl = "http://192.168.11.213:90/api/login/";

function b64EncodeUnicode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("pass").value.trim();

    if (!email) {
        result.innerHTML = `Please enter your email!`;
        return;
    }
    if (!password) {
        result.innerHTML = `Please enter your password!`;
        return;
    }

    const b64email = b64EncodeUnicode(email);
    const b64pass = b64EncodeUnicode(password);

    result.innerHTML = "";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: b64email, password: b64pass })
        });

        // Mivel nincs body, csak a státuszkódot vizsgáljuk
        if (response.status === 200) {
            result.innerHTML = `Success!<br>We sent you a login confirmation link to your email.`;
        } else if (response.status === 401) {
            result.innerHTML = `Incorrect password!`;
        } else if (response.status === 500) {
            result.innerHTML = `Server error or user does not exist!`;
        } else {
            result.innerHTML = `Unexpected error occurred!`;
        }

    } catch (error) {
        console.error("Fetch error:", error);
        result.innerHTML = `Unable to contact server!`;
    }
}
