$(document).ready(function () {
  if ($(".burger").length > 0) {
    let burger = $(".burger");
    let body = $("body");
    let overlay = $(".overlay");
    let menu = $(".menu");

    burger.on("click", function () {
      handleClick();
    });

    function handleClick() {
      if (burger.hasClass("opened")) {
        closeMenu();
      } else {
        burger.addClass("opened");
        menu.addClass("opened").slideDown(300);
        overlay.addClass("visible");
        body.addClass("is-openMenu");
        overlay.on("click", function () {
          closeMenu();
        });
      }
    }

    function closeMenu() {
      burger.removeClass("opened");
      menu.removeClass("opened").slideUp(300);
      overlay.removeClass("visible");
      body.removeClass("is-openMenu");
      overlay.off("click");
    }

    $(window).resize(function () {
      $(window).width() < 768 && closeMenu();
    });
  }

  if ($(".header").length > 0) {
    function toggleHeaderScrolledClass() {
      if ($(window).scrollTop() > 0) {
        $(".header").addClass("is-scrolled");
      } else {
        $(".header").removeClass("is-scrolled");
      }
    }

    toggleHeaderScrolledClass();
    $(window).on("scroll", toggleHeaderScrolledClass);
  }

  if ($(".hero__slider").length > 0) {
    const heroSwiper = new Swiper(".hero__slider", {
      slidesPerView: 1,
      spaceBetween: 16,
      effect: "fade",
      fadeEffect: { crossFade: true },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        // prevEl: ".hero__slider .btnSwiperPrev",
        nextEl: ".hero__slider .btnSwiperNext",
      },
    });
  }

  if ($(".teams__slider").length > 0) {
    const teamsSwiper = new Swiper(".teams__slider", {
      slidesPerView: 3,
      spaceBetween: 80,
      breakpoints: {
        0: {
          slidesPerView: 1.8,
          spaceBetween: 12,
        },
        390: {
          slidesPerView: 2.1,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 18,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 18,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1550: {
          slidesPerView: 3,
          spaceBetween: 80,
        },
      },
    });
  }

  if ($(".showrooms-main__slider").length > 0) {
    const teamsSwiper = new Swiper(".showrooms-main__slider", {
      slidesPerView: "auto",
      spaceBetween: 30,
      breakpoints: {
        0: {
          spaceBetween: 12,
        },
        768: {
          spaceBetween: 12,
        },
        1280: {
          spaceBetween: 24,
        },
        1550: {
          spaceBetween: 30,
        },
      },
    });
  }

  if ($("[data-fancybox]").length > 0) {
    Fancybox.bind("[data-fancybox]", {
      speedIn: 600,
      speedOut: 600,
    });
  }

  if ($("[data-gallery-trigger]").length > 0) {
    $(document).on("click", "[data-gallery-trigger]", function (e) {
      e.preventDefault();

      const galleryName = $(this).data("galleryTrigger");
      const groupNodes = $('[data-fancybox="' + galleryName + '"]');

      if (!groupNodes.length) return;

      const items = groupNodes
        .map(function () {
          const src = $(this).attr("href");
          return { src: src, type: "image" };
        })
        .get()
        .filter(Boolean);

      Fancybox.show(items, {
        startIndex: 0,
      });
    });
  }

  // base
  if ($(".faq-list").length > 0) {
    $(".faq-section__quest").on("click", function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).parents(".faq-item").removeClass("opened");
        $(this).next(".faq-section__answer").stop().slideUp();
      } else {
        $(".faq-item").removeClass("opened");
        $(".faq-section__quest").removeClass("active");
        $(".faq-section__answer").stop().slideUp();

        $(this).parents(".faq-item").addClass("opened");
        $(this).addClass("active");
        $(this).next(".faq-section__answer").stop().slideDown();
      }
    });
  }

  if ($(".phone-input").length > 0) {
    $(".phone-input").map(function () {
      // phone input
    });
  }

  if ($(".thisYear").length > 0) {
    let date = new Date();
    $(".thisYear").text(date.getFullYear());
  }

  if ($(".subcategories-slider").length > 0) {
    const sliders = document.querySelectorAll(".subcategories-slider");
    let mySwipers = [];

    function sliderinit() {
      sliders.forEach((slider, index) => {
        let navNext = undefined;
        let navPrev = undefined;

        if (!slider.swiper) {
          navNext = $(slider)
            .parents(".subcategories")
            .find(".btnSwiperNext")[0];
          navPrev = $(slider)
            .parents(".subcategories")
            .find(".btnSwiperPrev")[0];

          mySwipers[index] = new Swiper(slider, {
            slidesPerView: 3,
            spaceBetween: 24,
            navigation: {
              nextEl: navNext && navNext,
              prevEl: navPrev && navPrev,
            },
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            },
          });
        } else {
          return;
        }
      });
    }

    sliders.length && sliderinit();
  }

  if ($(".tabs").length > 0) {
    $(".tabs").tabslet({
      mouseevent: "click",
      attribute: "href",
      animation: true,
    });
  }

  if ($(".modal").length > 0) {
    MicroModal.init({
      openTrigger: "data-modal",

      onShow: () => {
        $("body").addClass("modal-open");
      },

      onClose: () => {
        $("body").removeClass("modal-open");
      },
    });

    $("[data-modal]").map(function () {
      $(this).click((e) => e.preventDefault());
    });
  }
});
