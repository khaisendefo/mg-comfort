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
