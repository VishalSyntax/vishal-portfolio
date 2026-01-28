var swiper = new Swiper(".mySwiper", {
  effect: "cube",
  allowTouchMove: false,
  grabCursor: false,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  mousewheel: {
    thresholdDelta: 70,
    sensitivity: 1,
    forceToAxis: false,
  },
  allowSlideNext: true,
  allowSlidePrev: true,
  touchEventsTarget: 'wrapper',
});

swiper.on('slideChange', function () {
    for (let i of document.querySelectorAll(".Links li")) i.classList.remove("activeLink")
    Array.from(document.querySelectorAll(".Links li"))[swiper.activeIndex].classList.add("activeLink")
});

function Navigate(indx) {
    for (let i of document.querySelectorAll(".Links li")) i.classList.remove("activeLink")
    Array.from(document.querySelectorAll(".Links li"))[indx].classList.add("activeLink")
    swiper.slideTo(indx, 1000, true)
}

// Smart scroll for services and projects
let scrollTimeout;

function handleSmartScroll(container, isServices) {
  if (!container) return;
  
  container.addEventListener('wheel', function(e) {
    const isAtTop = container.scrollTop <= 5;
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
    
    // If scrolling within content, prevent swiper navigation
    if (!isAtTop && !isAtBottom) {
      e.stopPropagation();
      return;
    }
    
   
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Reset any scroll state after delay
    }, 100);
  });
}


document.addEventListener('DOMContentLoaded', function() {

  const allLinks = document.querySelectorAll('a, button, input, textarea');
  allLinks.forEach(element => {
    element.style.pointerEvents = 'auto !important';
    element.style.position = 'relative';
    element.style.zIndex = '99999';
    element.style.cursor = 'pointer';
  });
  
 
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach(slide => {
    slide.style.pointerEvents = 'auto !important';
  });
  
 
  const projectSlide = document.querySelector('.projects-slider');
  const contactSlide = document.querySelector('.contact-slider');
  
  if (projectSlide) {
    projectSlide.style.pointerEvents = 'auto !important';
    projectSlide.style.overflow = 'visible';
  }
  
  if (contactSlide) {
    contactSlide.style.pointerEvents = 'auto !important';
    contactSlide.style.overflow = 'visible';
  }
});

// EmailJS Integration
emailjs.init("oozoJQByjGWTYuF42");

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = document.querySelector('.send_btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    emailjs.sendForm('service_k8t04ny', 'template_a6e1y7d', this)
        .then(function() {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#28a745';
            document.getElementById('contactForm').reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '#80ed99';
                btn.disabled = false;
            }, 3000);
        }, function(error) {
            btn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
            btn.style.background = '#dc3545';
            console.error('EmailJS Error:', error);
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '#80ed99';
                btn.disabled = false;
            }, 3000);
        });
});