async function reg() {
    const fields = document.querySelectorAll('.field');
    const result = document.getElementById('result');
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const firstname = document.getElementById("firstname").value.trim();

    function b64EncodeUnicode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    const b64email = b64EncodeUnicode(email);
    const b64pass = b64EncodeUnicode(password);
    const b64lastname = b64EncodeUnicode(lastname);
    const b64firstname = b64EncodeUnicode(firstname);

    let valid = true;
    let missing = [];

    fields.forEach(field => {
        if (!field.value.trim()) {
            valid = false;
            field.style.border = '2px solid red';
            missing.push(field.placeholder);
        } else {
            field.style.border = '';
        }
    });

    if (!valid) {
        result.textContent = `Missing fields: ${missing.join(', ')}`;
        result.style.color = 'red';
    } else {
        result.textContent = 'Registration successful!';
        result.style.color = 'green';

        const requrl = `http://192.168.11.213:90/api/registration_request/`;
        console.log(requrl);

        try {
            const response = await fetch(requrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: b64email,
                password: b64pass,
                lastname: b64lastname,
                firstname: b64firstname
            })
        });
            if (response.status == 200) {
                console.log("Registration successful!");
                result.innerHTML += `Success!<br>Registration email sent!`;
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);
            } else if (response.status == 401) {
                console.log("Registration failed! (User already exists!)");
                result.innerHTML += `Registration failed!<br>User already exists!`;
            } else if (response.status == 400) {
                console.log("Registration failed! (Wrong request)");
                result.innerHTML += `Registration failed!<br>Wrong request!`;
            } else {
                console.log("Unexpected error occurred!");
                result.innerHTML += `Unexpected error occurred!`;
            }
        } catch (error) {
            console.error("Fetch error:", error);
            result.innerHTML = `Unable to access server!`;
        }
    }
}