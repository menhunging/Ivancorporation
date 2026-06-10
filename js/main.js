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
    const showroomsSwiper = new Swiper(".showrooms-main__slider", {
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

  if ($(".modal").length > 0 && typeof MicroModal !== "undefined") {
    MicroModal.init({
      openTrigger: "data-modal",
      onShow: () => {
        $("body").addClass("modal-open");
      },
      onClose: () => {
        $("body").removeClass("modal-open");
      },
    });

    $("[data-modal]").on("click", function (e) {
      e.preventDefault();
    });
  }

  if ($(".fabric-all__slider").length > 0) {
    const fabricDesktopMedia = window.matchMedia("(min-width: 1024px)");
    const fabricSwiperMedia = window.matchMedia("(min-width: 768px)");
    const $fabricSlider = $(".fabric-all__slider");
    let fabricAllSwiper = null;

    function getFabricSwiperOptions() {
      return {
        slidesPerView: "auto",
        spaceBetween: 0,
        navigation: {
          nextEl: ".fabric-all .btnSwiperNext",
          prevEl: ".fabric-all .btnSwiperPrev",
        },
      };
    }

    function onFabricSlideClick(_swiper, event) {
      const $target = $(event.target);
      const $item = $target.closest(
        ".fabric-all__item:not(.fabric-all__item--empty)",
      );

      if (!$item.length || $target.closest(".fabric-all__invis").length) {
        return;
      }

      handleFabricOpen($item);
    }

    function initFabricSwiper() {
      if (
        !fabricSwiperMedia.matches ||
        !$fabricSlider.length ||
        $fabricSlider[0].swiper
      ) {
        return;
      }

      fabricAllSwiper = new Swiper($fabricSlider[0], getFabricSwiperOptions());
      fabricAllSwiper.on("click", onFabricSlideClick);
      $fabricSlider.removeClass("is-destroyed");
      $(".fabric-all").removeClass("is-slider-disabled");
    }

    function destroyFabricSwiper() {
      if (fabricAllSwiper) {
        fabricAllSwiper.destroy(true, true);
        fabricAllSwiper = null;
      }

      $fabricSlider.addClass("is-destroyed");
      $(".fabric-all").addClass("is-slider-disabled");
    }

    function toggleFabricSwiper() {
      if (fabricSwiperMedia.matches) {
        initFabricSwiper();
      } else {
        destroyFabricSwiper();
      }
    }

    function isFabricDesktop() {
      return fabricDesktopMedia.matches;
    }

    function closeFabricInvis() {
      $(".fabric-all__body > .fabric-invis-block").removeClass("opened");
      $(".fabric-all__slider").removeClass("opacity");
      $(document).off("click.fabricInvis");
    }

    function fillFabricContent($container, $item) {
      const title = $item.find(".fabric-all__content .caption").text().trim();
      const caption = $item.find(".fabric-all__invis .caption").text().trim();
      const text = $item.find(".text-small").text().trim();
      const imgSrc = $item.find(".picture-block img").attr("data-src-big");

      $container.find(".fabric-invis-block__title").text(title);
      $container.find(".fabric-invis-block__content .caption").text(caption);
      $container.find(".fabric-invis-block__controls .text").text(text);

      const $picture = $container.find(".picture-block");

      if ($picture.length && imgSrc) {
        $picture.find("img").attr("src", imgSrc);

        const $webpSource = $picture.find("source[type='image/webp']");

        if ($webpSource.length) {
          $webpSource.attr("srcset", imgSrc);
        }
      }
    }

    function openFabricInvis($item) {
      if (!isFabricDesktop()) return;

      closeFabricInvis();
      fillFabricContent($(".fabric-all__body > .fabric-invis-block"), $item);

      $(".fabric-all__body > .fabric-invis-block").addClass("opened");
      $(".fabric-all__slider").addClass("opacity");

      setTimeout(function () {
        $(document).on("click.fabricInvis", function (event) {
          if (!$(event.target).closest(".fabric-invis-block").length) {
            closeFabricInvis();
          }
        });
      }, 0);
    }

    function openFabricModal(modalId, $item) {
      if (isFabricDesktop() || !modalId || typeof MicroModal === "undefined") {
        return;
      }

      const $modal = $("#" + modalId);

      if ($item && $item.length) {
        fillFabricContent($modal.find(".fabric-invis-block"), $item);
      }

      setTimeout(function () {
        MicroModal.show(modalId, {
          onShow: () => {
            $("body").addClass("modal-open");
          },
          onClose: () => {
            $("body").removeClass("modal-open");
          },
        });
      }, 200);
    }

    function handleFabricOpen($item) {
      if (!$item.length) return;

      if (isFabricDesktop()) {
        openFabricInvis($item);
        return;
      }

      openFabricModal($item.attr("data-modal-fabric"), $item);
    }

    $(".fabric-all").on("click", ".fabric-all__invis", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const $item = $(this).closest(
        ".fabric-all__item:not(.fabric-all__item--empty)",
      );
      handleFabricOpen($item);
    });

    $(".fabric-all").on(
      "click",
      ".fabric-all__item:not(.fabric-all__item--empty)",
      function (event) {
        if (fabricSwiperMedia.matches) return;

        if ($(event.target).closest(".fabric-all__invis").length) return;

        handleFabricOpen($(this));
      },
    );

    $(".back-fabric-invis").on("click", function (event) {
      event.preventDefault();
      closeFabricInvis();
    });

    toggleFabricSwiper();

    fabricSwiperMedia.addEventListener("change", toggleFabricSwiper);

    fabricDesktopMedia.addEventListener("change", function () {
      if (!isFabricDesktop()) {
        closeFabricInvis();
      }
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

  if ($(".fabric-block__list").length > 0) {
    const fabricLists = $(".fabric-block__list");
    const isMobile = $(window).width() < 767;

    function initMasonry(list) {
      list.masonry({
        itemSelector: ".fabric-block__item",
      });
    }

    function resetMasonry() {
      fabricLists.each(function () {
        const list = $(this);
        if (!list.data("masonry")) return;
        list.masonry("reloadItems");
        list.masonry("layout");
      });
    }

    if (isMobile) {
      fabricLists.each(function () {
        const list = $(this);
        const body = list.closest(".fabric-block__body");
        const firstItem = list.children(".fabric-block__item").first();

        if (firstItem.length && !firstItem.hasClass("full")) {
          firstItem.appendTo(body).addClass("full");
        }

        initMasonry(list);
      });
    } else {
      fabricLists.each(function () {
        initMasonry($(this));
      });
    }

    setTimeout(function () {
      $(".fabric-block__body").addClass("is-loaded");
    }, 300);

    $(window).on("resize", function () {
      resetMasonry();
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
});
