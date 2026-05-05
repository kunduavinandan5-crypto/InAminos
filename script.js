document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Progress Bar
  const scrollProgress = document.getElementById('scrollProgress');
  
  // 2. Navigation State
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  // Update scroll progress and nav styling on scroll
  window.addEventListener('scroll', () => {
    // Progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = scrolled + '%';
    }

    // Nav pill background
    if (nav) {
      if (winScroll > 50) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }
  });

  // Mobile Menu Toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-open');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // 3. Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Number Counters (Intersection Observer)
  const statNums = document.querySelectorAll('.stat__num');
  const statOptions = {
    threshold: 0.5
  };

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'), 10) || 0;
        let count = 0;
        const duration = 2000; // ms
        const increment = countTo / (duration / 16); // 60fps

        const updateCount = () => {
          count += increment;
          if (count < countTo) {
            target.innerText = Math.ceil(count).toLocaleString();
            requestAnimationFrame(updateCount);
          } else {
            target.innerText = countTo.toLocaleString() + (countTo > 1000 ? '+' : '');
          }
        };
        updateCount();
        observer.unobserve(target);
      }
    });
  }, statOptions);

  statNums.forEach(stat => statObserver.observe(stat));
});
