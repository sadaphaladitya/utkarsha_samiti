// Mobile Navigation Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const btn = document.getElementById('mobileMenuBtn');

    if (navLinks && btn) {
        navLinks.classList.toggle('active');

        // Animate hamburger
        const spans = btn.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const btn = document.getElementById('mobileMenuBtn');

    if (navLinks && btn && navLinks.classList.contains('active')) {
        if (!e.target.closest('.nav-links') && !e.target.closest('#mobileMenuBtn')) {
            navLinks.classList.remove('active');
            const spans = btn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.main-navbar');
let lastScroll = 0;

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });
}

// Animated Counter for Stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
};

// Intersection Observer for Stats Animation
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Smooth Scroll & Hash Handling
function handleScrollToHash() {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            const navbar = document.querySelector('.main-navbar');
            const headerOffset = navbar ? navbar.offsetHeight + 20 : 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.getElementById('navLinks');
            const btn = document.getElementById('mobileMenuBtn');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (btn) {
                    const spans = btn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }
    }
}

// Handle local anchor clicks
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        // Push state so back button works
        history.pushState(null, null, targetId);

        // Handle scroll
        handleScrollToHash();
    });
});

// Handle initial load scroll if hash exists
window.addEventListener('load', () => {
    // Small delay to ensure layout is stable
    setTimeout(handleScrollToHash, 100);
});

// Handle External Links containing hash
// We check if we are on the page that matches the link origin + pathname but has a hash
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    if (anchor.getAttribute('href').startsWith('index.html') && window.location.pathname.endsWith('index.html')) {
        anchor.addEventListener('click', function (e) {
            // Check if it's the same page
            const parts = this.getAttribute('href').split('#');
            if (parts.length === 2) {
                e.preventDefault();
                history.pushState(null, null, '#' + parts[1]);
                handleScrollToHash();
            }
        });
    }
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        showMessage('Thank you for your message! We will get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // In a real application, you would send this data to a server
        console.log('Form Data:', formData);
    });
}

// Donation Form Handler
const donationForm = document.getElementById('donationForm');

if (donationForm) {
    donationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('d-name').value,
            phone: document.getElementById('d-phone').value,
            amount: document.getElementById('d-amount').value,
            message: document.getElementById('d-message').value
        };

        // Validate
        if (!formData.name || !formData.phone || !formData.amount) {
            alert('कृपया सर्व आवश्यक माहिती भरा.'); // "Please fill all required fields" in Marathi
            return;
        }

        // Simulate form submission
        alert(`धन्यवाद! तुमची ₹${formData.amount} ची देणगी विनंती स्वीकारली गेली आहे. आम्ही लवकरच तुमच्याशी संपर्क साधू.`);
        // "Thank you! Your donation request of ... has been accepted. We will contact you soon."

        // Reset form
        donationForm.reset();

        // In a real application, you would send this data to a server
        console.log('Donation Data:', formData);
    });
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;

        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.feature-card, .value-card, .team-card, .info-card');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
}

// Parallax Effect for Hero
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Member Details Modal Logic
const modal = document.getElementById('memberModal');
const closeModalBtn = document.querySelector('.close-modal');

// Open Modal Function
function openMemberModal(element) {
    if (!modal) return;

    // Get data from attributes
    const name = element.getAttribute('data-name');
    const position = element.getAttribute('data-position');
    const imgSrc = element.getAttribute('data-img');
    const desc = element.getAttribute('data-desc');

    // Populate modal content
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalPosition').textContent = position;
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalDesc').innerHTML = desc; // Use innerHTML for formatting

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close Modal Function
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
}

// Close on Outside Click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Real-time Clock Function
// Real-time Clock Function
function updateClock() {
    // Try to find the element
    const clockText = document.getElementById('clock-text');
    if (clockText) {
        const now = new Date();
        const dateString = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        clockText.textContent = dateString + ' | ' + timeString;
    }
}

// Robust Initialization
(function initClock() {
    // Try immediately
    updateClock();

    // Set interval regardless of DOM state because element might exist
    setInterval(updateClock, 1000);

    // Also attach to window load just in case
    window.addEventListener('load', updateClock);
})();


// Gallery Modal Logic
const galleryModal = document.getElementById('galleryModal');

function openGalleryModal(imgSrc, title, desc) {
    if (!galleryModal) return;

    const modalImg = document.getElementById('galleryModalImg');
    const modalTitle = document.getElementById('galleryModalTitle');
    const modalDesc = document.getElementById('galleryModalDesc');

    if (modalImg) modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;

    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    if (galleryModal) {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close gallery modal on background click
if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGalleryModal();
        }
    });
}

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGalleryModal();
    }
});

// Language Switcher Logic
const languageData = {
    en: {
        nav_home: "HOME",
        nav_about: "ABOUT US",
        nav_projects: "PROJECTS ▾",
        nav_committee: "COMMITTEE",
        nav_activities: "ACTIVITIES",
        nav_gallery: "GALLERY",
        nav_donation: "DONATION",
        nav_contact: "CONTACT US",
        nav_admission: "Admission Form",
        btn_upload: "Upload Photo",
        nav_lang: "मराठी",
        footer_quick_links: "Quick Links",
        footer_contact_info: "Contact Info"
    },
    mr: {
        nav_home: "मुख्यपृष्ठ",
        nav_about: "आमच्याबद्दल",
        nav_projects: "प्रकल्प ▾",
        nav_committee: "समिती",
        nav_activities: "उपक्रम",
        nav_gallery: "गॅलरी",
        nav_donation: "देणगी",
        nav_contact: "संपर्क",
        nav_admission: "प्रवेश अर्ज",
        btn_upload: "फोटो अपलोड करा",
        nav_lang: "English",
        footer_quick_links: "त्वरित दुवे",
        footer_contact_info: "संपर्क माहिती"
    }
};

let currentLang = 'en'; // Default from HTML structure

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'mr' : 'en';
    const data = languageData[currentLang];

    // Update Navigation links
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const text = item.textContent.trim();
        if (text === 'HOME' || text === 'मुख्यपृष्ठ') item.textContent = data.nav_home;
        else if (text === 'ABOUT US' || text === 'आमच्याबद्दल') item.textContent = data.nav_about;
        else if (text.includes('PROJECTS') || text.includes('प्रकल्प')) item.innerHTML = data.nav_projects;
        else if (text === 'COMMITTEE' || text === 'समिती') item.textContent = data.nav_committee;
        else if (text === 'ACTIVITIES' || text === 'उपक्रम') item.textContent = data.nav_activities;
        else if (text === 'GALLERY' || text === 'गॅलरी') item.textContent = data.nav_gallery;
        else if (text === 'DONATION' || text === 'देणगी') item.textContent = data.nav_donation;
        else if (text === 'CONTACT US' || text === 'संपर्क') item.textContent = data.nav_contact;

        if (item.classList.contains('marathi-btn')) {
            item.textContent = data.nav_lang;
        }
    });

    // Update Dropdown Links
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        const text = link.textContent.trim();
        if (text === 'All Projects' || text === 'सर्व प्रकल्प') link.textContent = currentLang === 'en' ? 'All Projects' : 'सर्व प्रकल्प';
        else if (text === 'Utkarsh Balmandir (Balwadi)' || text === 'उत्कर्ष बालमंदिर') link.textContent = currentLang === 'en' ? 'Utkarsh Balmandir (Balwadi)' : 'उत्कर्ष बालमंदिर';
        else if (text === 'Admission Form' || text === 'प्रवेश अर्ज') link.textContent = data.nav_admission;
    });


    // Update Footer headers
    const footerHeaders = document.querySelectorAll('.footer-section h4');
    footerHeaders.forEach(header => {
        if (header.textContent.includes('त्वरित दुवे') || header.textContent.includes('Quick Links')) {
            header.textContent = data.footer_quick_links;
        } else if (header.textContent.includes('संपर्क माहिती') || header.textContent.includes('Contact Info')) {
            header.textContent = data.footer_contact_info;
        }
    });

    // Update Upload Button
    const uploadBtn = document.querySelector('button[onclick="openUploadModal()"]');
    if (uploadBtn) {
        uploadBtn.innerHTML = `<span style="margin-right: 0.5rem;">📷</span> ${data.btn_upload}`;
    }

    // Save preference
    localStorage.setItem('preferredLang', currentLang);
}

// Upload Modal Logic
function openUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Handle Upload Form Submission
const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('photo-title').value;
        const desc = document.getElementById('photo-desc').value;
        const fileInput = document.getElementById('photo-file');
        const file = fileInput.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('desc', desc);
            formData.append('photo', file);

            fetch('upload_handler.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert(data.message);
                        uploadForm.reset();
                        closeUploadModal();
                        // Reload gallery to show new photo
                        loadGallery();
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.');
                });
        }
    });
}

// Admission Form Logic
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(admissionForm);

        fetch('admission_handler.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    admissionForm.reset();
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('अर्ज पाठवताना चूक झाली.');
            });
    });
}

// Load Gallery from Database
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    fetch('fetch_gallery.php')
        .then(response => response.json())
        .then(photos => {
            if (Array.isArray(photos)) {
                photos.forEach(photo => {
                    if (document.querySelector(`div[data-id="${photo.id}"]`)) return;

                    const newItem = document.createElement('div');
                    newItem.className = 'gallery-item';
                    newItem.setAttribute('data-id', photo.id);

                    // Delete Button
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.innerHTML = '&times;';
                    deleteBtn.title = 'फोटो काढा';
                    deleteBtn.onclick = function (e) {
                        e.stopPropagation();
                        if (confirm('हा फोटो कायमचा काढायचा आहे का?')) {
                            deletePhoto(photo.id, newItem);
                        }
                    };

                    newItem.onclick = function () {
                        openGalleryModal(photo.image_path, photo.title, photo.description || 'गॅलरी फोटो');
                    };

                    newItem.innerHTML = `
                         <img src="${photo.image_path}" alt="${photo.title}">
                         <div class="gallery-overlay">
                             <h3>${photo.title}</h3>
                             <p>${photo.description || ''}</p>
                         </div>
                     `;

                    newItem.appendChild(deleteBtn);
                    galleryGrid.insertBefore(newItem, galleryGrid.firstChild);
                });
            }
        })
        .catch(error => console.error('Error fetching gallery:', error));
}

function deletePhoto(id, element) {
    const formData = new FormData();
    formData.append('id', id);

    fetch('delete_photo.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                element.remove();
                alert(data.message);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('फोटो काढताना चूक झाली.');
        });
}

// Initialize gallery if on gallery page
window.addEventListener('load', loadGallery);


// Attach listener to Marathi Button
const langBtn = document.querySelector('.marathi-btn');
if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleLanguage();
    });
}

