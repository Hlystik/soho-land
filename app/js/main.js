$(function () {

  if ($(window).width() >= '767') {
    $('.tabs__triggers-item').on('click', function (e) {
      e.preventDefault();

      $('.tabs__triggers-item').removeClass('tabs__triggers-item--active');
      $('.tabs__content-item').removeClass('tabs__content-item--active');

      $(this).addClass('tabs__triggers-item--active');
      $($(this).attr('href')).addClass('tabs__content-item--active');
      e.preventDefault();
    });
    $('.tabs__triggers-item:first').click();
  }
  if ($(window).width() <= '766') {
    $('.tabs__accordion-item').on('click', function (e) {
      e.preventDefault();

      $('.tabs__content-item').removeClass('tabs__content-item--active');
      $(this).next('.tabs__content-item').slideToggle($('.tabs__accordion').height() / 2);
      $(this).toggleClass('tabs__accordion-item--active');
      e.preventDefault();
    });
    $('.tabs__accordion-item').click();
  }

  $(window).on("scroll", function () {
    if ($(this).scrollTop() >= 1) {
      $('.navbar').addClass("darkheader");
    }
  });
  $(window).on("scroll", function () {
    if ($(this).scrollTop() < 1) {
      $('.navbar').removeClass("darkheader");
    }
  });
  $('.menu__burger').on('click', function () {
    $('.menu__list').toggleClass('menu__list--active');
    $('.menu__close-zone').toggleClass('menu__close-zone--active');
  });
  $('.menu__close-zone').on('click', function () {
    $('.menu__list').removeClass('menu__list--active');
    $('.menu__close-zone').removeClass('menu__close-zone--active');
  });
  // если в href начинается с # или ., то ловим клик
  /* $('a[href^="#"], a[href^="."]').click(function (e) {

    // возьмем содержимое атрибута href
    var scroll_el = $(this).attr('href');
    //left = $(scroll_el).offset().left
    // проверим существование элемента чтобы избежать ошибки
    if ($(scroll_el).length != 0) {
      // анимируем скроолинг к элементу scroll_el
      $('.comparison__wrap').animate({
        scrollTop: $(scroll_el).offset().top
      }, 100);
    }

    return false; // выключаем стандартное действие
  }); */
  /*   jQuery("a.scrollto").click(function () {
        elementClick = jQuery(this).attr("href")
        destination = jQuery(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 3000);
        return false;
        });
       */
 /*  $(".menu__list-link").on("click", function (e) {
    const anchor = $(this);
    $('.menu__list-link').removeClass('menu__list-link--active');
    $(anchor).addClass('menu__list-link--active');
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top-84
    }, 777);
    e.preventDefault();
    return false;
  }); */
  
});

const getId = (link) => link.getAttribute('href').replace('#', '');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.menu__list-link').forEach((link) => {
        link.classList.toggle(
          'menu__list-link--active', 
          getId(link) === entry.target.id
        );
      });
    }
  });
}, {
  threshold: 0.7,
});

document.querySelectorAll('.section').forEach(
  (section) => observer.observe(section),
);

document.querySelector('.menu__list').addEventListener('click', (event) => {
  if (event.target.classList.contains('menu__list-link')) {
    event.preventDefault();

    const id = getId(event.target);
    
    console.log('clicked');
    window.scrollTo({
      top: document.getElementById(id).offsetTop,
      behavior: 'smooth',
    });
  }
});