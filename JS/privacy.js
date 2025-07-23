// Mobile Menu Functionality
// document.addEventListener('DOMContentLoaded', function() {
//     const mobileMenuBtn = document.getElementById('mobileMenuBtn');
//     const mobileMenu = document.getElementById('mobileMenu');
//     const overlay = document.querySelector('.overlay');

//     // Mobile menu toggle
//     mobileMenuBtn.addEventListener('click', function() {
//         mobileMenuBtn.classList.toggle('active');
//         mobileMenu.classList.toggle('active');
//         // overlay.classList.toggle('active');
//         document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
//     });

//     // Close mobile menu when clicking overlay
//     overlay.addEventListener('click', function() {
//         mobileMenuBtn.classList.remove('active');
//         mobileMenu.classList.remove('active');
//         overlay.classList.remove('active');
//         document.body.style.overflow = 'auto';
//     });

//     // Close mobile menu when clicking on a link
//     const mobileMenuLinks = mobileMenu.querySelectorAll('a');
//     mobileMenuLinks.forEach(link => {
//         link.addEventListener('click', function() {
//             mobileMenuBtn.classList.remove('active');
//             mobileMenu.classList.remove('active');
//             overlay.classList.remove('active');
//             document.body.style.overflow = 'auto';
//         });
//     });

//     // Navbar scroll effect
//     window.addEventListener('scroll', function() {
//         const nav = document.querySelector('nav');
//         if (window.scrollY > 100) {
//             nav.classList.add('scrolled');
//         } else {
//             nav.classList.remove('scrolled');
//         }
//     });

//     // Smooth scrolling for anchor links
//     const anchorLinks = document.querySelectorAll('a[href^="#"]');
//     anchorLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             const targetId = this.getAttribute('href').substring(1);
//             const targetElement = document.getElementById(targetId);
            
//             if (targetElement) {
//                 const headerHeight = document.querySelector('header').offsetHeight;
//                 const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
//                 window.scrollTo({
//                     top: targetPosition,
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });

//     // Add scroll to top button
//     createScrollToTopButton();

//     // Add table of contents
//     createTableOfContents();

//     // Add section highlighting on scroll
//     highlightActiveSection();
// });

// Create scroll to top button
function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Create table of contents
function createTableOfContents() {
    const policySections = document.querySelectorAll('.policy-section h2');
    const container = document.querySelector('.container');
    
    if (policySections.length > 0) {
        const toc = document.createElement('div');
        toc.className = 'toc';
        toc.setAttribute('data-aos', 'fade-up');
        
        let tocHTML = '<h3><i class="fas fa-list"></i> Table of Contents</h3><ul>';
        
        policySections.forEach((section, index) => {
            const sectionId = `section-${index + 1}`;
            section.id = sectionId;
            
            const icon = section.querySelector('i');
            const iconClass = icon ? icon.className : 'fas fa-file-alt';
            const text = section.textContent.replace(icon ? icon.outerHTML : '', '').trim();
            
            tocHTML += `<li><a href="#${sectionId}"><i class="${iconClass}"></i>${text}</a></li>`;
        });
        
        tocHTML += '</ul>';
        toc.innerHTML = tocHTML;
        
        // Insert after last-updated div
        const lastUpdated = document.querySelector('.last-updated');
        if (lastUpdated) {
            lastUpdated.parentNode.insertBefore(toc, lastUpdated.nextSibling);
        }
    }
}

// Highlight active section on scroll
function highlightActiveSection() {
    const sections = document.querySelectorAll('.policy-section');
    const navLinks = document.querySelectorAll('.toc a');

    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.querySelector('h2').getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add loading animation for sections
function animateSections() {
    const sections = document.querySelectorAll('.policy-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize animations when page loads
window.addEventListener('load', function() {
    animateSections();
});

// Add copy functionality for contact information
function addCopyFunctionality() {
    const contactItems = document.querySelectorAll('.contact-item span');
    
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.title = 'Click to copy';
        
        item.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary success message
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = '#4CAF50';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
}

// Initialize copy functionality
document.addEventListener('DOMContentLoaded', function() {
    addCopyFunctionality();
});

// Add search functionality for policy sections
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search privacy policy...';
    searchInput.className = 'policy-search';
    searchInput.style.cssText = `
        width: 100%;
        padding: 1rem;
        border: 2px solid #667eea;
        border-radius: 10px;
        font-size: 1.1rem;
        margin-bottom: 2rem;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    `;

    const container = document.querySelector('.container');
    const lastUpdated = document.querySelector('.last-updated');
    
    if (container && lastUpdated) {
        container.insertBefore(searchInput, lastUpdated.nextSibling);
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const sections = document.querySelectorAll('.policy-section');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            const title = section.querySelector('h2').textContent.toLowerCase();
            
            if (text.includes(searchTerm) || title.includes(searchTerm)) {
                section.style.display = 'block';
                if (searchTerm) {
                    section.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                } else {
                    section.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                }
            } else {
                section.style.display = 'none';
            }
        });
    });
}

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    addSearchFunctionality();
});

// Add print functionality
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Policy';
    printBtn.className = 'print-btn';
    printBtn.style.cssText = `
        position: fixed;
        top: 7.5em;
        right: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 1rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
    });

    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });

    printBtn.addEventListener('click', function() {
        window.print();
    });

    document.body.appendChild(printBtn);
}

// Initialize print button
document.addEventListener('DOMContentLoaded', function() {
    addPrintButton();
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