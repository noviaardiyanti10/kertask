let menu_btn = document.querySelector("#menu-btn");
let user_btn = document.querySelector("#user-btn");
let sidebar = document.querySelector("#sidebar");
let footer = document.querySelector("#footer-login")
let mycontainer = document.querySelector(".my-container");
let nav = document.querySelector(".navbar")
menu_btn.addEventListener("click", () => {
    sidebar.classList.toggle("active-bar");
    nav.classList.toggle("board-nav");
    // mycontainer.classList.toggle("main");
    mycontainer.classList.toggle("main-profile");
    footer.classList.toggle("footer-user")
});