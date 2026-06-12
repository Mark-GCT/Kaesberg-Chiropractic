// Function to update the copyright year dynamically
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.getElementById('dynamic-copyright');

    if (!copyrightElement) {
        return;
    }

    copyrightElement.innerHTML = `&copy; Copyright ${currentYear} <a href="/" class="cs-credit-link">Kaesberg Chiropractic</a> | All Rights Reserved <br><i>Designed & developed by <a href="https://www.gatewaycornerstone.com" class="cs-credit-link" target="_blank">Gateway Cornerstone Technologies</a> | All Rights Reserved</i>`;
}

window.addEventListener('load', updateCopyrightYear);
