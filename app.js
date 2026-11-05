document.addEventListener('DOMContentLoaded', () => {
  // Mode switcher elements
  const modeButtons = document.querySelectorAll('.mode-btn');
  const originalViews = document.querySelectorAll('.original-view');

  const imgHome = document.getElementById('img-screen-home');
  const imgIndicators = document.getElementById('img-screen-indicators');
  const imgChat = document.getElementById('img-screen-chat');

  const tagHome = document.getElementById('tag-home');
  const tagIndicators = document.getElementById('tag-indicators');
  const tagChat = document.getElementById('tag-chat');

  const descHome = document.getElementById('home-desc');
  const descIndicators = document.getElementById('indicators-desc');
  const descChat = document.getElementById('chat-desc');

  const descriptions = {
    minimal: {
      tag: 'ВЕРСИЯ 1: МИНИМАЛИЗМ',
      home: 'Центр управления здоровьем в минималистичном стиле. Баннер AI-ассистента с аутентичной шелковой волной, лаконичный трекер питания, компактные чипы челленджей без стоковых фото и неоновый прогресс карты здоровья.',
      indicators: 'Чистый 7-дневный дашборд шагов: ровная базовая линия дат без рамок, акцент «Сегодня» на текущей среде, всплывающий тултип 10 420 шагов, 12-столбчатая гистограмма динамики дня и 4 компактные карточки показателей.',
      chat: 'Центрированный минималистичный брендинг «biome» с неоновой точкой, подлинная 3D-сфера бренда в роли аватара консультанта, структурированные рекомендации по сну и восстановлению и быстрые чипы действий.'
    },
    pro: {
      tag: 'ВЕРСИЯ 2: PRO HUD (ДАННЫЕ)',
      home: 'Инженерная панель управления (HUD). Статус подключенных часов (Apple Watch Ultra), круговое кольцо готовности (Readiness 88%), полная раскладка Б/Ж/У с 3 прогресс-барами, живая полоса биомаркеров (ВСР 62мс, Пульс 52, SpO2 98%) и протокол тренировок.',
      indicators: 'Максимальная биометрическая плотность: большой круговой спидометр активности шагов (10 420 / 10 000) с дистанцией (7.8 км) и калориями (420 ккал), 24-часовой штрихкод активности, кривая ЭКГ пульса, 4-фазная архитектура сна и шкала био-возраста.',
      chat: 'Клинический AI-консультант (v3.2 Neural Health Engine). Прикрепленный срез биомаркеров за день, клиническое заключение, структурированный протокол вечерней силовой тренировки и интерактивный чеклист с отметками выполнения.'
    }
  };

  function setMode(mode) {
    modeButtons.forEach(btn => {
      if (btn.getAttribute('data-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (mode === 'compare') {
      // In compare mode, show original side by side with current version
      originalViews.forEach(v => v.classList.remove('hidden'));
    } else {
      originalViews.forEach(v => v.classList.add('hidden'));

      // Switch screen images
      if (imgHome) imgHome.src = imgHome.getAttribute(`data-${mode}`);
      if (imgIndicators) imgIndicators.src = imgIndicators.getAttribute(`data-${mode}`);
      if (imgChat) imgChat.src = imgChat.getAttribute(`data-${mode}`);

      // Update tags
      const d = descriptions[mode];
      if (tagHome) tagHome.textContent = d.tag;
      if (tagIndicators) tagIndicators.textContent = d.tag;
      if (tagChat) tagChat.textContent = d.tag;

      // Update descriptions
      if (descHome) descHome.textContent = d.home;
      if (descIndicators) descIndicators.textContent = d.indicators;
      if (descChat) descChat.textContent = d.chat;
    }
  }

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode');
      setMode(mode);
    });
  });

  // Lightbox Modal
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');

  const zoomableImages = document.querySelectorAll('.phone-frame img, .board-preview-card img, .zoomable');
  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
});
