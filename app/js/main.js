$(function () {
  //script tabs
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
    //скролл рабочий
    $(".navmenu__list-link").on("click", function (e) {
      const scroll_el = $(this).attr('href');
      $('.comparison__wrap').animate({ scrollTop: $('.comparison__wrap').scrollTop() + ($(scroll_el).offset().top - $('.comparison__wrap').offset().top) });
      e.preventDefault();
      return false;
    });
    $('.navmenu__list-link:first').click();
  }
  //script accordion
  if ($(window).width() <= '766') {
    $('.tabs__accordion-item').on('click', function (e) {
      e.preventDefault();

      $('.tabs__content-item').removeClass('tabs__content-item--active');
      $(this).next('.tabs__content-item').slideToggle($('.tabs__accordion').height() / 2);
      $(this).toggleClass('tabs__accordion-item--active');
      e.preventDefault();
    });
    $('.tabs__accordion-item').click();
     //скролл рабочий
    $(".navmenu__list-link").on("click", function (e) {
      const anchor = $(this);
      const scroll_el = $(this).attr('href');
      $('.comparison__wrap').animate({ 
        scrollLeft: $('.comparison__wrap').scrollLeft() + ($(scroll_el).offset().left - $('.comparison__wrap').offset().left) 
      });
      e.preventDefault();
      return false;
    });
    $('.navmenu__list-link:first').click();
  }
  //dark headera
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
  //burger
  $('.menu__burger').on('click', function () {
    $('.menu__list').toggleClass('menu__list--active');
    $('.menu__close-zone').toggleClass('menu__close-zone--active');
  });
  $('.menu__close-zone').on('click', function () {
    $('.menu__list').removeClass('menu__list--active');
    $('.menu__close-zone').removeClass('menu__close-zone--active');
  });
  // скрипт скролл Хеадер     
  $(".menu__list-link").on("click", function (e) {
    const anchor = $(this);

    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top-84
    }, 777);
    e.preventDefault();
    return false;
  });
  
  // SCROLL CODE

  mainMenuScroll();
  comparisonMenuScroll();

});

function mainMenuScroll() {
  let mainMenu = [],
      targetsPosition = [document.querySelector('.subheader').getBoundingClientRect().height],
      targetHeight,
      targetMargin,
      target,
      navbarHeight;

  document.querySelectorAll('.menu__list-link').forEach(function(link, index) {
    mainMenu[index] = link.getAttribute('href');
    target = document.querySelector(mainMenu[index]);
    targetHeight = target.getBoundingClientRect().height;
    targetsPosition[index + 1] = targetHeight + targetsPosition[index];
  });
  
  navbarHeight = document.querySelector('.navbar').getBoundingClientRect().height + 1;
  document.addEventListener('scroll', function(e) {
    for(let i = 0; i < targetsPosition.length; i++) {
      if (targetsPosition[i] <= document.documentElement.scrollTop + navbarHeight) {
        document.querySelector('.menu__list-link--active') ? document.querySelector('.menu__list-link--active').classList.remove('menu__list-link--active') : null;
        document.querySelector(`[href="${mainMenu[i]}"]`).classList.add('menu__list-link--active');
      }
    }
  });
}

function comparisonMenuScroll() {
  document.querySelector('[href="#block_1"]').classList.add('navmenu__list-link--active');

  let comparisionWrap = document.querySelector('.comparison__wrap');
  let targets = document.querySelectorAll('.comparison__grid');
  let targetsPosition = [0];
  targets.forEach(function(target, index) {
    
    let targetWidth, 
        targetMargin, 
        targetHeight;
        
    if (document.documentElement.clientWidth >= '767') {
      targetHeight = target.getBoundingClientRect().height;
      targetMargin = parseInt(getComputedStyle(target).marginTop) + parseInt(getComputedStyle(target).marginBottom);
      targetsPosition[index + 1] = targetHeight + targetsPosition[index] + targetMargin;
    } else {  
      targetWidth = target.getBoundingClientRect().width;
      targetMargin = parseInt(getComputedStyle(target).marginLeft) + parseInt(getComputedStyle(target).marginRight);
      targetsPosition[index + 1] = targetWidth + targetsPosition[index] + targetMargin;
    }
  });

  comparisionWrap.addEventListener('scroll', function(e) {
    for(let i = 0; i < targetsPosition.length; i++) {
      if (document.documentElement.clientWidth >= '767') {
        if (targetsPosition[i] < comparisionWrap.scrollTop) {
          if (!document.querySelector(`[href="#block_${i+1}"]`).classList.contains('navmenu__list-link--active')) {
            document.querySelector('.navmenu__list-link--active').classList.remove('navmenu__list-link--active');
            document.querySelector(`[href="#block_${i+1}"]`).classList.add('navmenu__list-link--active');
          }
        }
      } else {
        if (targetsPosition[i] < comparisionWrap.scrollLeft) {
          if (!document.querySelector(`[href="#block_${i+1}"]`).classList.contains('navmenu__list-link--active')) {
            document.querySelector('.navmenu__list-link--active').classList.remove('navmenu__list-link--active');
            document.querySelector(`[href="#block_${i+1}"]`).classList.add('navmenu__list-link--active');
          }
        }
      }
    }
  });
}


