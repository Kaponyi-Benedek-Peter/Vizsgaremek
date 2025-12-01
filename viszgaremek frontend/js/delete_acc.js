const loginBtn = document.getElementById("login");
const result = document.querySelector('.result');

const secretKey = "thisis16bytekey!";

const apiUrl = "http://192.168.11.213:90/api/delacc_request/";

async function del() {
    const id = getCookie("user_id");
    const password = document.getElementById("pass").value.trim();

    if (!password) {
        result.innerHTML = `Please enter your password!`;
        return;
    }
    function b64EncodeUnicode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }


    const b64id = b64EncodeUnicode(id);

    result.innerHTML = "";

    try {
        // const encrypted = Crypto.Encrypt(secretKey, password.trim());
        const b64pass = b64EncodeUnicode(password);
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: b64id,
                password: b64pass
            })
        });

        if (response.status === 200) {
            console.log("Successful deletion!");
            result.innerHTML = `You have successfully deleted your account!`;

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } else if (response.status === 401) {
            console.log("Delete failed! (Wrong password)");
            result.innerHTML = `Incorrect password!`;
        } else if (response.status === 500) {
            console.log("Delete failed! (Server error or user not found)");
            result.innerHTML = `Server error or user does not exist!`;
        } else {
            console.log("Unexpected error!");
            result.innerHTML = `Unexpected error occurred!`;
        }

    } catch (error) {
        console.error("Fetch error:", error);
        result.innerHTML = `Unable to contact server!`;
    }
}