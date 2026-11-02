const arabicBtn = document.getElementById('arabicBtn');
const frenchBtn = document.getElementById('frenchBtn');

arabicBtn.addEventListener('click', () => {
    // Rediriger vers la version arabe
});

frenchBtn.addEventListener('click', () => {
    // Rediriger vers la version française
    window.location.href = "?lang=fr";
});


          // Menu functionality
        const menuBtn = document.querySelector('.menu-btn');
        const closeMenuBtn = document.querySelector('#closeMenuBtn');
        const sideMenu = document.querySelector('#sideMenu');
        const overlay = document.querySelector('#overlay');
        const addAnnounceBtn = document.querySelector('.add-announce');
        const userProfileBtn = document.querySelector('.user-profile');
        const loginMenuItem = document.querySelector('#loginMenuItem');
        const registerMenuItem = document.querySelector('#registerMenuItem');
        const logoutMenuItem = document.querySelector('#logoutMenuItem');
        const homeMenuItem = document.querySelector('#home_btn');
        const addAnnounceBtnMenu = document.querySelector('#add_pub_menu');
        const searchMenuItem = document.getElementById('searchMenuItem');
        const userProfileMenuItem = document.querySelector('#my_account');
        const subscriptionMenuItem = document.querySelector('#subscriptionMenuItem');

        subscriptionMenuItem.addEventListener('click', () => {
            closeMenu();
            setTimeout(() => {
                const userId = sessionStorage.getItem("_profile");
                const id = JSON.parse(userId).id;
                if (id) {
                    window.location.href = `https://enchere-dz.com/mon-abonnement`;
                } else {
                    alert("يجب عليك تسجيل الدخول أولاً لعرض اشتراكاتك.");
                }
            }, 300);
        });

        if (sessionStorage.getItem("_key")) {
            logoutMenuItem.style.display = "";
            subscriptionMenuItem.style.display = ""
            if (userProfileBtn) {
                            userProfileBtn.style.display = ""

            }
            loginMenuItem.style.display = "none"
            registerMenuItem.style.display = "none"
            
        }else{
            subscriptionMenuItem.style.display = "none";
            logoutMenuItem.style.display = "none";
            userProfileBtn.style.display = "none";
            
            userProfileMenuItem.style.display = "none";

        }
        userProfileMenuItem?.addEventListener('click', () => {
            closeMenu();
            setTimeout(() => {
                const userId = sessionStorage.getItem("_profile");
                const id = JSON.parse(userId).id;
                if (id) {
                    window.location.href = `https://enchere-dz.com/profile/${id}`;
                } else {
                    alert("يجب عليك تسجيل الدخول أولاً لعرض ملفك الشخصي.");
                }
            }, 300);
        });
        
        addAnnounceBtn?.addEventListener('click', () => {
            const isLoggedIn = !!sessionStorage.getItem("_key");
            if (isLoggedIn) {
                window.location.href = "https://enchere-dz.com/ajouter-annonce";
            } else {
                alert("يجب عليك تسجيل الدخول  أولاً لتتمكن من إضافة إعلان.");
            }
        });


        // Check if user is logged in
        if (sessionStorage.getItem("_key")) {
            loginMenuItem.style.display = 'none';
            registerMenuItem.style.display = 'none';
            logoutMenuItem.style.display = '';
        }

        // Toggle menu
        menuBtn.addEventListener('click', () => {
            sideMenu.classList.add('open');
            overlay.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', () => {
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
        });

        searchMenuItem.addEventListener('click', () => {
           closeMenu();
            setTimeout(() => {
                window.location.href = "https://enchere-dz.com/recherche";
            }, 300)
        });

        overlay.addEventListener('click', () => {
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
        });

         addAnnounceBtnMenu.addEventListener('click', () => {
             closeMenu();
              setTimeout(() => {
                addAnnonce();

            }, 300)
        });

    function addAnnonce(){
        const isLoggedIn = !!sessionStorage.getItem("_key");

        if (isLoggedIn) {
            window.location.href = "https://enchere-dz.com/ajouter-annonce";
        } else {
            alert("يجب عليك تسجيل الدخول  أولاً لتتمكن من إضافة إعلان.");
        }
    }

        function closeMenu() {
             sideMenu.classList.remove('open');
            overlay.classList.remove('active');
        }

        // Menu item actions
        loginMenuItem.addEventListener('click', () => {
            closeMenu()
        });

        registerMenuItem.addEventListener('click', () => {
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
             setTimeout(() => {
                                    window.location.href = "https://enchere-dz.com/signup";

                    }, 300)
        });

         homeMenuItem.addEventListener('click', () => {
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
             setTimeout(() => {  
                          window.location.href = "https://enchere-dz.com/";
                    }, 300)
        });

        logoutMenuItem.addEventListener('click', () => {
            sessionStorage.removeItem("_key");
            window.location.reload();
        });