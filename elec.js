// --- Sticky Navbar ---
const navbar = document.getElementById('navbar');
// Make sure navbar exists before adding listener
if (navbar) {
  const stickyOffset = navbar.offsetTop + 100; // Add a buffer

  function handleScroll() {
    if (window.pageYOffset > stickyOffset) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }
  window.addEventListener('scroll', handleScroll);
}

// --- Testimonial Slider ---
const testimonials = [
  {
    img: 'https://images.unsplash.com/photo-1642364861013-2c33f2dcfbcf', // Updated placeholder
    quote:
      'Amazing selection and fast shipping! Found exactly what I needed for my new setup.',
    author: 'Alex Johnson',
  },
  {
    img: 'https://images.unsplash.com/photo-1659353220441-9207b962a133', // Updated placeholder
    quote:
      'The customer service was top-notch. They helped me choose the perfect laptop.',
    author: 'Maria Garcia',
  },
  {
    img: 'https://images.unsplash.com/photo-1733796941440-9935f13a1cec', // Updated placeholder
    quote:
      'Great prices and the quality of the smartwatch exceeded my expectations. Highly recommend!',
    author: 'David Smith',
  },
  {
    img: 'https://images.unsplash.com/photo-1700832161143-de261675534b', // Updated placeholder
    quote:
      'ElectroHub is my go-to for tech gadgets. Always reliable and great deals.',
    author: 'Sam Lee',
  },
];

let currentSlide = 0;
const sliderContent = document.querySelector(
  '.testimonial-slider .slider-content'
);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let autoSlideInterval; // Variable to hold the interval ID

function renderSlider() {
  if (!sliderContent) return; // Exit if slider content area doesn't exist
  sliderContent.innerHTML = ''; // Clear existing slides
  testimonials.forEach((testimonial, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('testimonial-slide');
    // No need to add 'active' here, showSlide handles it
    slideDiv.innerHTML = `
                <img src="${testimonial.img}" alt="Customer ${testimonial.author}">
                <blockquote>"${testimonial.quote}"</blockquote>
                <p class="author">- ${testimonial.author}</p>
            `;
    sliderContent.appendChild(slideDiv);
  });
}

function showSlide(index) {
  if (!sliderContent) return; // Exit if slider content area doesn't exist
  const slides = sliderContent.querySelectorAll('.testimonial-slide');
  if (slides.length === 0) return; // Exit if no slides rendered

  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }
  // Hide all slides
  slides.forEach((slide) => slide.classList.remove('active'));
  // Show the current slide
  slides[currentSlide].classList.add('active');
}

function startAutoSlide() {
  stopAutoSlide(); // Clear existing interval first
  autoSlideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event Listeners for slider controls
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    stopAutoSlide(); // Stop auto-slide on manual control
  });

  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    stopAutoSlide(); // Stop auto-slide on manual control
  });
}

// Initial setup for slider
renderSlider(); // Create the slides first
showSlide(currentSlide); // Then show the initial active slide
startAutoSlide(); // Start auto-sliding

// --- Update Footer Year ---
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// --- Navbar Active Link highlighting on Scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');

function changeNavOnScroll() {
  if (!navLinks || navLinks.length === 0) return; // Exit if no nav links found

  let currentSection = '';
  const offset = navbar ? navbar.offsetHeight + 20 : 100; // Offset based on navbar height

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // Check if scroll position is within the section (adjust offset as needed)
    if (pageYOffset >= sectionTop - offset) {
      currentSection = section.getAttribute('id');
    }
  });

  // If scrolled past the last section, keep the last link active
  if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight - 50
  ) {
    // Near bottom
    const lastSection = sections[sections.length - 1];
    if (lastSection) currentSection = lastSection.id;
  }

  navLinks.forEach((link) => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href');
    // Check if the link's href matches the current section ID
    if (linkHref === `#${currentSection}`) {
      link.classList.add('active');
    }
  });

  // Special case for top of page
  if (pageYOffset < sections[0].offsetTop - offset) {
    // Before the first section
    navLinks.forEach((link) => link.classList.remove('active'));
    const homeLink = document.querySelector(
      '.navbar-nav .nav-link[href="#hero"]'
    );
    if (homeLink) homeLink.classList.add('active');
  }
}
window.addEventListener('scroll', changeNavOnScroll);
// Initial check in case page loads scrolled down
changeNavOnScroll();