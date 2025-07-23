const header = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
header.addEventListener("mouseenter", () => {
    header.classList.add('scrolled');
});
header.addEventListener("mouseleave", () => {
    if (window.scrollY === 0) {
        header.classList.remove('scrolled');
    }
});

// ######################################################################################################################################
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuBtnSpan = mobileMenuBtn.querySelectorAll('span');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    overlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});
// ######################################################################################################################################