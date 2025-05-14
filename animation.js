// Function to animate skill bars
function animateSkillBars() {
    console.log("Animating skill bars");
    const skillLevels = document.querySelectorAll('.skill-level');
   
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level') + '%';
        skill.style.width = level;
    });
}

// Better function to check if element is in viewport or partially visible
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Element is considered "in viewport" if it's partly visible
    // (at least 30% of the element is in the viewport)
    const elementHeight = rect.height;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visiblePercent = visibleHeight / elementHeight;
    
    console.log("Element visibility:", {
        top: rect.top,
        bottom: rect.bottom,
        windowHeight: windowHeight,
        visibleHeight: visibleHeight,
        visiblePercent: visiblePercent
    });
    
    return visiblePercent > 0.3; // At least 30% visible
}

// Initialize animations when elements come into view
document.addEventListener('DOMContentLoaded', () => {
    // Get the about section
    const aboutSection = document.querySelector('.about-section');
    const skillsContainer = document.querySelector('.skills-container');
    
    if (!aboutSection) {
        console.error('About section not found!');
        return;
    }
   
    // Define a variable to track if animations have been triggered
    let animationsTriggered = false;
    console.log("Animation script loaded, waiting for scroll", animationsTriggered);
   
    // Function to check scroll position and trigger animations
    function checkScroll() {
        // Look specifically at the skills section visibility
        const targetElement = skillsContainer || aboutSection;
        const isVisible = isInViewport(targetElement);
        
        console.log("Checking scroll, in viewport:", isVisible, "triggered:", animationsTriggered);
        
        if (isVisible && !animationsTriggered) {
            console.log("Triggering animations now!");
            
            // Animate immediately
            animateSkillBars();
            
            // Set flag to true so animations only trigger once
            animationsTriggered = true;
            
            // We can remove the scroll listener since animation is done
            window.removeEventListener('scroll', checkScroll);
        }
    }
   
    // Check on initial load
    setTimeout(checkScroll, 500); // Short delay to ensure DOM is fully ready
    
    // And on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Force animation if it hasn't triggered after 5 seconds
    // This is a fallback in case the scroll detection doesn't work
    setTimeout(() => {
        if (!animationsTriggered) {
            console.log("Forcing animation after timeout");
            animateSkillBars();
            animationsTriggered = true;
            window.removeEventListener('scroll', checkScroll);
        }
    }, 5000);
});

    // Initialize contact form animations
    document.addEventListener('DOMContentLoaded', function() {
        // Add animation for skill bars (from your existing code)
        const skillLevels = document.querySelectorAll('.skill-level');
        setTimeout(() => {
            skillLevels.forEach(level => {
                const dataLevel = level.getAttribute('data-level');
                level.style.width = dataLevel + '%';
            });
        }, 500);
        
        // Contact form animation
        const contactForm = document.querySelector('.contact-form');
        const formGroups = document.querySelectorAll('.form-group');
        
        if (contactForm) {
            // Add animation to form elements
            formGroups.forEach((group, index) => {
                group.style.animationDelay = (index * 0.1) + 's';
                group.classList.add('fade-in');
            });
            
            // Form validation
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // You would typically handle form submission with AJAX here
                // For now, just show a success message
                const submitBtn = document.querySelector('.submit-btn');
                submitBtn.innerHTML = 'Message Sent!';
                submitBtn.classList.add('success');
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = 'Send Message';
                    submitBtn.classList.remove('success');
                }, 3000);
            });
        }
    });
    
    // Intersection Observer for animation when scrolling
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe contact cards
    document.addEventListener('DOMContentLoaded', function() {
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            observer.observe(card);
        });
    });