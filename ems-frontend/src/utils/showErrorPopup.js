// showErrorPopup.js
export const showErrorPopup = (message) => {
    const errorPopup = document.createElement('div');
    errorPopup.classList.add('error-popup');
    errorPopup.textContent = message;

    document.body.appendChild(errorPopup);

    setTimeout(() => {
        errorPopup.remove();
    }, 5000);
};
