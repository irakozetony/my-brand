const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach((tabContent) =>
            tabContent.classList.remove("active")
        );
        tabs.forEach((tab) => tab.classList.remove("active"));
        tab.classList.add("active");
        target.classList.add("active");
    });
});

const menu_icon = document.querySelectorAll(".mobile_menu_icon")[0];
const menu_items = document.querySelectorAll(".menu_items")[0];

menu_icon.addEventListener("click", () => {
    if (menu_items.classList.contains("active"))
        menu_items.classList.remove("active");
    else menu_items.classList.add("active");
});

const editorButtons = document.querySelectorAll(".text_editor_button");
let show = false;
editorButtons.forEach((editorButton) => {
    editorButton.addEventListener("click", () => {
        let command = editorButton.dataset["cmd"];

        if (command == "createLink" || command == "insertImage") {
            let url = prompt("Enter url:", "https://");
            document.execCommand(command, false, url);
            if(command === "insertImage"){
                const images = document.querySelectorAll("img");
                images.forEach(image =>{
                    image.style.maxWidth = "500px";
                })
            }
        } else {
            document.execCommand(command, false, null);
        }
    });
});
