document.addEventListener('DOMContentLoaded', function () {
    const cancel_btn = document.getElementById('cancel-btn');
    const dropdown_menu = document.getElementById('dropdown-menu');
    const menu_btn = document.getElementById('menu-btn');
    const section_links = document.getElementsByClassName('section-link');
    const navbar = document.getElementById("navbar");
    let dropdown_menu_shown = false;

    const show_menu = function () {
        if (dropdown_menu_shown == false) {
            dropdown_menu.style.top = "0";
            dropdown_menu_shown = true;
        }
    }

    const hide_menu = function () {
        if (dropdown_menu_shown == true) {
            dropdown_menu.style.top = "-2000px";
            dropdown_menu_shown = false;
        }  
    }

    const hide_navbar = function () {
        navbar.style.top = "-200px";
    }


    cancel_btn.onclick = function () {
        hide_menu()
    }

    menu_btn.onclick = function () {
        show_menu()
    }
    // Loop through section_links and add event listeners if they exist
    for (let i = 0; i < section_links.length; i++) {
        if (section_links[i]) {
            section_links[i].onclick = function () {
                hide_menu();
                hide_navbar();
            };
        }
    }

})
