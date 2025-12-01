const url = window.location.href;

if (url.includes("?activate=")) {

    const data = url.split("?activate=")[1];
    const [b64id, token] = data.split(";");

    const decodedId = saveIdFromBase64(b64id);

    const apiURL = "http://192.168.11.213:90/api/registration_promise/";

    fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: b64id,
            token: token
        })
    })
        .then(res => {
            console.log("Status:", res.status);

            if (res.status === 200) {

                res.text().then(encodedToken => {

                    const decodedToken = b64DecodeUnicode(encodedToken);

                    const decodedId = saveIdFromBase64(b64id);

                    setCookie("auth_token", decodedToken, 7);

                    console.log("Token decoded and saved:", decodedToken);

                    document.getElementById("result").innerText =
                        "Your account has been successfully activated!";
                });
            }
            else if (res.status === 401) {
                document.getElementById("result").innerText =
                    "Invalid confirmation token.";
            }
            else if (res.status === 500) {
                document.getElementById("result").innerText =
                    "Server error or user does not exist.";
            }
            else {
                document.getElementById("result").innerText =
                    "Unexpected error occurred.";
            }
        })
        .catch(err => {
            console.error("Activation error:", err);
            document.getElementById("result").innerText =
                "Network error occurred during activation.";
        });
}
// if (url.includes("?delete=")) {

//     const data = url.split("?delete=")[1];
//     const [b64id, token] = data.split(";");

//     const decodedId = saveIdFromBase64(b64id);

//     const apiURL = "http://192.168.11.213:90/api/deleteacc_promise/";

//     fetch(apiURL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             id: b64id,
//             token: token
//         })
//     })
//         .then(res => {
//             console.log("Status:", res.status);

//             if (res.status === 200) {

//                 res.text().then(encodedToken => {

//                     const decodedToken = b64DecodeUnicode(encodedToken);

//                     const decodedId = saveIdFromBase64(b64id);

//                     setCookie("auth_token", decodedToken, 7);

//                     console.log("Token decoded and saved:", decodedToken);

//                     document.getElementById("result").innerText =
//                         "Your account has been successfully deleted!";
//                 });
//             }
//             else if (res.status === 401) {
//                 document.getElementById("result").innerText =
//                     "Invalid confirmation token.";
//             }
//             else if (res.status === 500) {
//                 document.getElementById("result").innerText =
//                     "Server error or user does not exist.";
//             }
//             else {
//                 document.getElementById("result").innerText =
//                     "Unexpected error occurred.";
//             }
//         })
//         .catch(err => {
//             console.error("Delete error:", err);
//             document.getElementById("result").innerText =
//                 "Network error occurred during delete.";
//         });
// }