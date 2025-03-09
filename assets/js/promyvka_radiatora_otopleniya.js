// burger
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

// input mask
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7(999) 999-99-99');
im.mask(inputs);

// reviews slider
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

// faq accordion
const faqAccordion = () => {
  const faqItems = document.querySelectorAll('.faq__accordion-item');

  faqItems.forEach(function (item) {
    const top = item.querySelector('.faq__accordion-top');
    const body = item.querySelector('.faq__accordion-body');
    const icon = item.querySelector('.faq__accordion-icon svg');

    top.addEventListener('click', function () {
      // Закрываем все остальные активные элементы
      faqItems.forEach(function (otherItem) {
        const otherBody = otherItem.querySelector('.faq__accordion-body');
        const otherIcon = otherItem.querySelector('.faq__accordion-icon svg');
        
        if (otherItem !== item && otherBody.classList.contains('active')) {
          otherBody.classList.remove('active');
          otherBody.style.maxHeight = '0';
          if (otherIcon) {
            otherIcon.style.transform = 'rotate(0deg)';
          }
        }
      });

      // Переключаем активность текущего элемента
      if (body.classList.contains('active')) {
        body.classList.remove('active');
        body.style.maxHeight = '0';
        if (icon) {
          icon.style.transform = 'rotate(0deg)';
        }
      } else {
        body.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
        if (icon) {
          icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  });
};
faqAccordion();


// modal
const toggleModal = () => {
  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelector('.modal'); 
    const body = document.body; 
    const modalOpenButtons = document.querySelectorAll('.modal-open'); 
    const modalCloseButton = document.querySelector('.modal__close'); 
    const modalOverlay = modal.querySelector('.modal__overlay'); 

    function openModal() {
      modal.classList.add('active');
      body.classList.add('body-no-scroll'); 
    }

    function closeModal() {
      modal.classList.remove('active');
      body.classList.remove('body-no-scroll'); 
    }

    modalOpenButtons.forEach(button => {
      button.addEventListener('click', openModal);
    });

    modalCloseButton.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (event) => {
      const modalWindow = modal.querySelector('.modal__window');
      if (!modalWindow.contains(event.target)) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  });
};
toggleModal();

// send form 
const sendFormTelegram = () => {
  document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.form');

    forms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = form.querySelector('[name="Имя"]')?.value.trim();
        const phone = form.querySelector('[name="Телефон"]')?.value.trim();
        const messageContent = form.querySelector('[name="Сообщение"]')?.value.trim() || 'Без сообщения';
        const consent = form.querySelector('.form-checkbox')?.checked;
        const purpose = form.querySelector('.form-purpose')?.value || 'Не указано';

        if (!name || !phone || !consent) {
          alert("Пожалуйста, заполните все обязательные поля.");
          return;
        }

        fetch('send.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            message: messageContent,
            purpose
          })
        })
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            alert('Ваша заявка успешно отправлена!');
            form.reset();
          } else {
            alert('Ошибка при отправке заявки.');
          }
        })
        .catch(error => {
          console.error('Ошибка сети:', error);
          alert('Ошибка соединения. Попробуйте позже.');
        });
      });
    });
  });
};
sendFormTelegram();