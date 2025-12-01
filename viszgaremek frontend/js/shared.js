const Crypto = {
    Encrypt: function (password, plaintext) {
        const salt = CryptoJS.lib.WordArray.random(16);
        const iv = CryptoJS.lib.WordArray.random(16);

        const key = this.DeriveKey(password, salt);

        const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const saltHex = salt.toString();
        const ivHex = iv.toString();
        const ciphertextHex = encrypted.ciphertext.toString();

        const combined = CryptoJS.enc.Hex.parse(saltHex + ivHex + ciphertextHex);
        return combined.toString(CryptoJS.enc.Base64);
    },

    Decrypt: function (password, encryptedData) {
        const combined = CryptoJS.enc.Base64.parse(encryptedData);
        const combinedHex = combined.toString();

        const saltHex = combinedHex.substring(0, 32);
        const ivHex = combinedHex.substring(32, 64);
        const ciphertextHex = combinedHex.substring(64);

        const salt = CryptoJS.enc.Hex.parse(saltHex);
        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const key = this.DeriveKey(password, salt);

        const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: CryptoJS.enc.Hex.parse(ciphertextHex) },
            key,
            { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
        );

        return decrypted.toString(CryptoJS.enc.Utf8);
    },

    DeriveKey: function (password, salt) {
        return CryptoJS.PBKDF2(password, salt, {
            keySize: 32 / 4,
            iterations: 1000,
            hasher: CryptoJS.algo.SHA256
        });
    }
};

function setCookie(name, value, days = 7) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
    const decoded = decodeURIComponent(document.cookie);
    const cookies = decoded.split(';');
    for (let c of cookies) {
        let cookie = c.trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(escape(atob(str)));
}

function saveIdFromBase64(b64id) {
    try {
        const decodedId = b64DecodeUnicode(b64id);
        setLongTermCookie("user_id", decodedId);  // 100 év
        console.log("User ID saved to cookie:", decodedId);
        return decodedId;
    } catch (err) {
        console.error("ID decode error:", err);
        return null;
    }
}

function setLongTermCookie(name, value) {
    const days = 36500; // 100 év
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}
