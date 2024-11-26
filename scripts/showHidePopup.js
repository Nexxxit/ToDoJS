function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.setAttribute("open", "");
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.removeAttribute("open");
}

document.getElementById("create-group-btn").addEventListener("click", () => {
    showPopup("popup-add-group");
});

document.querySelector(".popup__button-close").addEventListener("click", () => {
    closePopup("popup-add-group");
});