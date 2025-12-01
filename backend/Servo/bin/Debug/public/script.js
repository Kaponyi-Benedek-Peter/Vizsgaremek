document.addEventListener('DOMContentLoaded', (event) => {
    const settingsButton = document.getElementById('settingsButton');
    const settingsPanel = document.getElementById('settingsPanel');
    const updateButton = document.getElementById('updateButton');
    const textInput = document.getElementById('textInput');
    const title = document.getElementById('title');
    const titleInput = document.getElementById('titleInput');

    // Show or hide settings panel
    settingsButton.addEventListener('click', () => {
        settingsPanel.classList.toggle('hidden');
    });

    // Update the title and URL
    updateButton.addEventListener('click', () => {
        const text = textInput.value;
        title.textContent = text;
        updateURLParameter('txt', text);
    });

    // Function to update URL parameter
    function updateURLParameter(key, value) {
        const url = new URL(window.location.href);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    }

    function getURLParameter(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    const urlText = getURLParameter('txt');
    if (urlText) {
        title.textContent = urlText;
    }

    title.addEventListener('click', () => {
        title.classList.add('hidden');
        titleInput.classList.remove('hidden');
        titleInput.value = title.textContent;
        titleInput.focus();
    });

    document.addEventListener('click', (e) => {
        if (e.target !== title && e.target !== titleInput) {
            if (!titleInput.classList.contains('hidden')) {
                title.textContent = titleInput.value;
                updateURLParameter('txt', title.textContent);
                title.classList.remove('hidden');
                titleInput.classList.add('hidden');
            }
        }
    });

    titleInput.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
