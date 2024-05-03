let burgermenu = document.querySelector("[data-js-main-menu-trigger]");
let menu = document.querySelector("[data-js-main-menu]")

// console.log(burgermenu);

burgermenu.addEventListener("click", () => {
    menu.classList.toggle("is-active");
    burgermenu.classList.toggle("is-active");
});

/* function handleMenuClick() {
    menu.classList.toggle("is-active");
    burgermenu.classList.toggle("is-active");
    // console.log('The Main Menu was clicked');
} */

const tabLinks = document.querySelectorAll(".tab-link");
const tabContents = document.querySelectorAll(".tab-content");
const mainContent = document.querySelector("main");

tabLinks.forEach((tabLink) => {
  tabLink.addEventListener("click", function () {
    const tabId = this.getAttribute("data-tab");

    const isMeinBereich = this.textContent.trim() === "Mein Bereich";

    if (!isMeinBereich) {
      mainContent.classList.add("is-hidden");
    } else {
      mainContent.classList.remove("is-hidden");
    }

    tabLinks.forEach((link) => {
      link.classList.remove("is-active");
    });

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("is-active");
    });

    this.classList.add("is-active");

    const selectedTabContent = document.getElementById(tabId);
    selectedTabContent.classList.add("is-active");
  });
});
