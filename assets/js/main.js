const gallerySlider = () => {
  const sliderElement = document.querySelector('.portfolio__slider');
  if (!sliderElement) return; // Проверяем, есть ли элемент слайдера

  const splide = new Splide(sliderElement, {
    perPage: 3,
    perMove: 1,
    gap: '15px',
    autoplay: true,
    interval: 2500,
    pauseOnHover: true,
    pagination: false,
    arrows: false,
    breakpoints: {
      1000: {
        perPage: 2,
        gap: '10px',
      },
      700: {
        perPage: 1,
      }
    }
  });

  splide.mount();

  const prevButton = document.querySelector('.portfolio__slider-nav-arrow--prev');
  const nextButton = document.querySelector('.portfolio__slider-nav-arrow--next');

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => splide.go('<'));
    nextButton.addEventListener('click', () => splide.go('>'));

    const updateArrowState = () => {
      if (splide.index === 0) {
        prevButton.classList.add('portfolio__slider-nav-arrow--is-disabled');
      } else {
        prevButton.classList.remove('portfolio__slider-nav-arrow--is-disabled');
      }

      const lastSlideIndex = splide.Components.Controller.getEnd();

      if (splide.index === lastSlideIndex) {
        nextButton.classList.add('portfolio__slider-nav-arrow--is-disabled');
      } else {
        nextButton.classList.remove('portfolio__slider-nav-arrow--is-disabled');
      }
    };

    splide.on('mounted move updated', updateArrowState); // Упрощенная подписка на события
    updateArrowState(); // Обновляем состояние кнопок при инициализации
  }
};

gallerySlider();

const reviewsSlider = () => {
  const sliderElement = document.querySelector('.reviews__slider');
  if (!sliderElement) return; // Проверяем, есть ли элемент слайдера

  const splide = new Splide(sliderElement, {
    perPage: 3,
    perMove: 1,
    pagination: false,
    arrows: false,
    gap: '15px',

    breakpoints: {
      1000: {
        perPage: 2,
        gap: '15px',
      },
      700: {
        perPage: 1,
      }
    }
  });

  splide.mount();

  const prevButton = document.querySelector('.reviews__slider-nav-arrow--prev');
  const nextButton = document.querySelector('.reviews__slider-nav-arrow--next');

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => splide.go('<'));
    nextButton.addEventListener('click', () => splide.go('>'));

    const updateArrowState = () => {
      if (splide.index === 0) {
        prevButton.classList.add('reviews__slider-nav-arrow--is-disabled');
      } else {
        prevButton.classList.remove('reviews__slider-nav-arrow--is-disabled');
      }

      const lastSlideIndex = splide.Components.Controller.getEnd();

      if (splide.index === lastSlideIndex) {
        nextButton.classList.add('reviews__slider-nav-arrow--is-disabled');
      } else {
        nextButton.classList.remove('reviews__slider-nav-arrow--is-disabled');
      }
    };

    splide.on('mounted move updated', updateArrowState); // Упрощенная подписка на события
    updateArrowState(); // Обновляем состояние кнопок при инициализации
  }
};

reviewsSlider();

const toggleMenu = () => {
  document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.header-burger');
    const nav = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.mobile-menu__close'); // Кнопка закрытия
    const buttonToClose = document.querySelector('.mobile-menu__button'); // Новая кнопка для закрытия меню
    const overlay = document.querySelector('.mobile-menu__overlay');
    const body = document.body;

    function closeNav() {
      toggleButton.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('no-scroll');
    }

    toggleButton.addEventListener('click', function () {
      const isActive = toggleButton.classList.toggle('active');
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
      if (isActive) {
        body.classList.add('no-scroll');
      } else {
        body.classList.remove('no-scroll');
      }
    });

    document.addEventListener('click', function(event) {
      if (!nav.contains(event.target) && !toggleButton.contains(event.target) && !overlay.contains(event.target) && !buttonToClose.contains(event.target)) {
        closeNav();
      }
    });

    overlay.addEventListener('click', closeNav);

    closeButton.addEventListener('click', closeNav); // Закрытие при клике на кнопку close

    buttonToClose.addEventListener('click', closeNav); // Закрытие при клике на mobile-menu__button

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && nav.classList.contains('active')) {
        closeNav();
      }
    });
  });
};

toggleMenu();
