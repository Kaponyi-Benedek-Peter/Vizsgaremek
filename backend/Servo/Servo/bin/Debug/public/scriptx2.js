document.body.ondblclick = function () {
    document.getElementById('fileInput').click();
};

document.getElementById('fileInput').onchange = function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
};
