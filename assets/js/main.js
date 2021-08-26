/**
* Template Name: iPortfolio - v3.3.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()


//form validation




var name_val = false;
var email_val = false;
var number_val = false;
var message_val = false;


$("#name").on('input', function () {
  this.value = this.value.replace(/[^a-zA-Z ]/, '')


  if (this.value.charAt(0) == " ") {
    $("#name_err").html("User name should not start with space")
    $(this).css({ borderColor: "red" })
    name_val = false;
  }

  else if (this.value.length < 3) {
    $("#name_err").text("User name should be atleast 2 character")
    $(this).css({ borderColor: "red" })
    name_val = false;

  }




  else if (this.value.length > 20) {
    $("#name_err").text("User name should be max 20  character")
    $(this).css({ borderColor: "red" })
    name_val = false;

  }


  else if (this.value.includes("  ")) {
    $("#name_err").text("User name should not have more spaces ")
    $(this).css({ borderColor: "red" })
    name_val = false;

  }



  else {
    $(this).css({ borderColor: "green" })
    $("#name_err").html("")
    name_val = true
  }
})




















$("#email").on('input', function () {
  var email_field = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,20})?$/;

  if (this.value.length < 0) {
    email_err.html("email should not be blank")
    $(this).css({ borderColor: "red" })
    email_val = false;

  }
  else if (this.value.charAt(0) == " ") {
    $("#email_err").html("Email should not start with space")
    $(this).css({ borderColor: "red" })
    name_val = false;
  }

  else if (this.value.includes("  ")) {
    $("#email_err").text("Email should not have more 2 spaces ")
    $(this).css({ borderColor: "red" })
    name_val = false;

  }

  else if (!email_field.test(this.value)) {
    $("#email_err").html("invalid format")
    $(this).css({ borderColor: "red" })
    email_val = false;

  }
  else {
    $("#email_err").html("")
    $(this).css({ borderColor: "green" })
    email_val = true
  }

})




$("#number").on('input', function () {
  this.value = this.value.replace(/[^0-9]/, '').replace(/(\..*)\./, '$1');;
  if (this.value.length != 10) {
    $("#number_err").html("Enter 10 number")
    $(this).css({ borderColor: "red" })
    number_val = false;

  }

  else {
    $("#number_err").html("")
    $(this).css({ borderColor: "green" })
    number_val = true;

  }


})







$("#message").on('input', function () {
  if (this.value.length < 6) {
    $("#message_err").html("Enter atleast 5 words")
    $(this).css({ borderColor: "red" })
    message_val = false
  }
  else {
    $(this).css({ borderColor: "green" })
    $("#message_err").html("")
    message_val = true;
  }




})







//form submission


$("#submit-form").submit((e) => {
  e.preventDefault()

  if (name_val == true && email_val == true && number_val == true && message_val == true) {
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbyv3tKlSQGHETWCB3WGcZxYpvWL8deSAvzYDnfXUpOs9CxfE1IaX5P0G0lJdEJP2GhUKg/exec",
      data: $("#submit-form").serialize(),
      method: "post",
      success: function (response) {
        alert("Form submitted successfully")
        window.location.reload()
        //window.location.href="https://google.com"
      },
      error: function (err) {
        alert("Something Error")

      }
    })
  }

  else {


    $("#name").css({ borderColor: "red" })
    $("#email").css({ borderColor: "red" })
    $("#number").css({ borderColor: "red" })
    $("#message").css({ borderColor: "red" })

  }



})
