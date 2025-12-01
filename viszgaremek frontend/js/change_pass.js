const result = document.querySelector('.result');

const secretKey = "thisis16bytekey!";

async function sendChangeRequest() {
    const id = getCookie("user_id"); 
    const pass = document.getElementById("pass").value;
    const pass_again = document.getElementById("pass_again").value;

    result.innerHTML = "";

    if (!id) {
        result.innerHTML = "Missing ID. Please log in again.";
        return;
    }

    if (!pass.trim() || !pass_again.trim()) {
        result.innerHTML = "Please fill every field!";
        return;
    }

    if (pass !== pass_again) {
        result.innerHTML = "Password is not the same!";
        return;
    }

    try {
        const encrypted = Crypto.Encrypt(secretKey, pass.trim());
        const idB64 = btoa(id);

        const response = await fetch(`http://192.168.11.213:90/api/chpass_request/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: idB64,
                password: encrypted
            })
        });

        if (response.status === 200) {
            result.innerHTML = "Success!<br>We sent a password change link to your email";
        } 
        else if (response.status === 401) {
            result.innerHTML = "Wrong passwrod!";
        } 
        else if (response.status === 500) {
            result.innerHTML = "Error, user does not exist or server unavailable!";
        } 
        else {
            result.innerHTML = "Unexpected error occurred.";
        }
    }
    catch (err) {
        console.error(err);
        result.innerHTML = "Unable to access server!";
    }
}