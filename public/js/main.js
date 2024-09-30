function revealFunction() {
    // window.sr = ScrollReveal({ duration: 1000, distance: '150px', easing: 'ease-out' });

    // sr.reveal('.reveal-left', { origin: 'left', reset: false });
    // sr.reveal('.reveal-top', { origin: 'top', reset: false });
    // sr.reveal('.reveal-bottom', { origin: 'bottom', reset: false });
    // sr.reveal('.reveal-right', { origin: 'right', reset: false });

    // sr.reveal('.reveal-reset-true', { origin: 'bottom', reset: true });
    // sr.reveal('.reveal-rotate', { origin: 'bottom', rotate: { x: 1000, z: 1000 }, reset: true });
    // sr.reveal('.reveal-bottom-reset', { origin: 'bottom', reset: true });

    // h3 için ScrollReveal ayarı (daha hızlı ve daha kısa mesafe)
    ScrollReveal().reveal('.reveal-bottom-1', {
      origin: 'bottom',
      distance: '250px',  // Daha kısa mesafe
      duration: 1500,    // Daha kısa süre
      easing: 'ease-out',
      reset: false
    });

    // h1 için ScrollReveal ayarı (daha yavaş ve daha uzun mesafe)
    ScrollReveal().reveal('.reveal-bottom-2', {
      origin: 'bottom',
      distance: '50px',  // Daha uzun mesafe
      duration: 2000,     // Daha uzun süre
      easing: 'ease-in',
      reset: false
    });

    ScrollReveal().reveal('.reveal-top-1', {
      origin: 'top',
      distance: '150px',  // Daha kısa mesafe
      duration: 1000,    // Daha kısa süre
      easing: 'ease-out',
      reset: false
    });

    ScrollReveal().reveal('.reveal-left-1', {
      origin: 'left',
      distance: '250px',  // Daha kısa mesafe
      duration: 1500,    // Daha kısa süre
      easing: 'ease-out',
      reset: false
    });

    ScrollReveal().reveal('.reveal-right-1', {
      origin: 'right',
      distance: '250px',  // Daha kısa mesafe
      duration: 1500,    // Daha kısa süre
      easing: 'ease-out',
      reset: false
    });

    ScrollReveal().reveal('.reveal-rotate-1', {
      origin: 'bottom',
      distance: '0px',  // Daha kısa mesafe
      duration: 1500,    // Daha kısa süre
      easing: 'ease-out',
      rotate: { x: 1000, z: 1000 },
      reset: false
    });

    ScrollReveal().reveal('.reveal-rotate-2', {
      origin: 'top',
      distance: '0px',  // Daha kısa mesafe
      duration: 1500,    // Daha kısa süre
      easing: 'ease-in',
      rotate: { x: 1000, z: 1000 },
      reset: false
    });

    ScrollReveal().reveal('.reveal-scale-1', {
      origin: 'left',
      distance: '0px',  // Daha kısa mesafe
      duration: 1300,    // Daha kısa süre
      easing: 'ease-in',
      scale: 0.85,
      reset: false
    });

    ScrollReveal().reveal('.reveal-scale-2', {
      origin: 'right',
      distance: '0px',  // Daha kısa mesafe
      duration: 1300,    // Daha kısa süre
      easing: 'ease-in',
      scale: 0.85,
      reset: false
    });
  }

  window.addEventListener('load', () => {
    revealFunction();
  });