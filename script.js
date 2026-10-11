// ==========================================
// КОНФИГУРАЦИЯ (Меняй данные под себя)
// ==========================================
const CONFIG = {
  "unlockDate": "01.10.2026",
  "stories": [
    {
      "type": "image",
      "url": "1.png",
      "title": "Так все начиналось",
      "caption": "Одни из первых упоминаний о тебе, в этом году :) "
    },
    {
      "type": "image",
      "url": "2.png",
      "title": "Место где все началось",
      "caption": "Расскажу тебе чуть больше, чем ты знала"
    },
    {
      "type": "image",
      "url": "3.png",
      "title": "За день до...",
      "caption": "Посмотри на дату"
    },
    {
      "type": "image",
      "url": "4.png",
      "title": "Да, да и тут все планировал",
      "caption": "Ты весь день из головы не вылазила, на время смотри)"
    },
    {
      "type": "image",
      "url": "5.jpg",
      "title": "Наши первые покатушки ",
      "caption": "И те самые атмосферные свечки"
    },
    {
      "type": "image",
      "url": "6.jpg",
      "title": "А это начало новой истории",
      "caption": "И не только нашей :/"
    },
    {
      "type": "image",
      "url": "7.jpg",
      "title": "А это моя любимая фотка",
      "caption": "Сделана она совершенно случайно, надеясь на отсутствие посторонних глаз"
    },
    {
      "type": "image",
      "url": "8.jpg",
      "title": "Просто оставлю это здесь ",
      "caption": "Без комментариев"
    },
    {
      "type": "image",
      "url": "9.jpg",
      "title": "Один из лучших вечеров",
      "caption": "Так атмосферно было, я смотрел не отрывая глаз"
    },
    {
      "type": "image",
      "url": "10.jpg",
      "title": "А вообще..",
      "caption": "Кайфую с тебя любой, и такой"
    },
    {
      "type": "image",
      "url": "11.jpg",
      "title": "И такой..",
      "caption": ""
    },
    {
      "type": "image",
      "url": "12.jpg",
      "title": "И такой..",
      "caption": ""
    }
  ],
  "invite": {
    "title": "А теперь, пойдем на свидание ",
    "desc": "Нашу историю, нужно продолжать, добавим еще пару кадров в наш альбом ",
    "date": "В эту субботу, днем",
    "place": "Место — сюрприз, где тебе нужно быть, узнаешь чуть позже ",
    "dressCode": "Твоя самая искренняя улыбка"
  }
};

// ==========================================
// ЛОГИКА САЙТА
// ==========================================

// Генерация фоновых сердечек
function createFloatingHearts() {
  const container = document.getElementById("heartsBg");
  const heartIcons = ["❤️", "💖", "🌸", "✨", "🤍"];
  
  setInterval(() => {
    const el = document.createElement("div");
    el.className = "floating-heart";
    el.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    el.style.left = Math.random() * 95 + "vw";
    el.style.animationDuration = Math.random() * 4 + 5 + "s";
    el.style.fontSize = Math.random() * 16 + 14 + "px";
    container.appendChild(el);

    setTimeout(() => el.remove(), 9000);
  }, 700);
}

// Автоматическая маска для поля ввода даты (ДД.ММ.ГГГГ)
const dateInput = document.getElementById("dateInput");
dateInput.addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "");
  if (v.length > 2 && v.length <= 4) {
    v = v.slice(0, 2) + "." + v.slice(2);
  } else if (v.length > 4) {
    v = v.slice(0, 2) + "." + v.slice(2, 4) + "." + v.slice(4, 8);
  }
  e.target.value = v;
  document.getElementById("errorMsg").style.display = "none";
});

// Проверка пароля и анимация
const unlockBtn = document.getElementById("unlockBtn");
const lockScreen = document.getElementById("lockScreen");
const storyScreen = document.getElementById("storyScreen");
const heartLock = document.getElementById("heartLock");
const errorMsg = document.getElementById("errorMsg");

unlockBtn.addEventListener("click", () => {
  const entered = dateInput.value.trim();

  if (entered === CONFIG.unlockDate) {
    // Успешный ввод: запуск зум-анимации сердца
    heartLock.classList.add("unlock-success");
    errorMsg.style.display = "none";

    setTimeout(() => {
      lockScreen.classList.remove("active");
      storyScreen.classList.add("active");
      initStory();
    }, 700);
  } else {
    // Ошибка ввода
    errorMsg.style.display = "block";
    dateInput.style.borderColor = "#ff4b72";
  }
});

// Нажатие Enter в инпуте
dateInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") unlockBtn.click();
});

// ЛОГИКА СЛАЙДОВ / ИСТОРИЙ
let currentSlide = 0;
const storyContent = document.getElementById("storyContent");
const progressBar = document.getElementById("progressBar");
const prevSlideBtn = document.getElementById("prevSlideBtn");
const nextSlideBtn = document.getElementById("nextSlideBtn");
const inviteScreen = document.getElementById("inviteScreen");

function initStory() {
  // Создаем полоски прогресса
  progressBar.innerHTML = "";
  CONFIG.stories.forEach((_, idx) => {
    const step = document.createElement("div");
    step.className = `progress-step ${idx === 0 ? "active" : ""}`;
    progressBar.appendChild(step);
  });

  renderSlide(0);
}

function renderSlide(index) {
  const item = CONFIG.stories[index];
  
  // Обновляем прогресс-бар
  Array.from(progressBar.children).forEach((bar, idx) => {
    if (idx <= index) bar.classList.add("active");
    else bar.classList.remove("active");
  });

  // Рендерим фото/видео
  let mediaHtml = "";
  if (item.type === "video") {
    mediaHtml = `<video src="${item.url}" autoplay loop muted playsinline></video>`;
  } else {
    mediaHtml = `<img src="${item.url}" alt="${item.title}" />`;
  }

  storyContent.innerHTML = `
    <div class="media-container">${mediaHtml}</div>
    <div class="story-text-box">
      <h3 class="story-title">${item.title}</h3>
      <p class="story-caption">${item.caption}</p>
    </div>
  `;

  // Видимость кнопки "Назад"
  prevSlideBtn.style.visibility = index === 0 ? "hidden" : "visible";
  nextSlideBtn.innerText = index === CONFIG.stories.length - 1 ? "Что дальше? ✨" : "Дальше →";
}

nextSlideBtn.addEventListener("click", () => {
  if (currentSlide < CONFIG.stories.length - 1) {
    currentSlide++;
    renderSlide(currentSlide);
  } else {
    // Переход к экрану приглашения
    storyScreen.classList.remove("active");
    inviteScreen.classList.add("active");
    initInvite();
  }
});

prevSlideBtn.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    renderSlide(currentSlide);
  }
});

// ЭКРАН ПРИГЛАШЕНИЯ
function initInvite() {
  document.getElementById("inviteTitle").innerText = CONFIG.invite.title;
  document.getElementById("inviteDesc").innerText = CONFIG.invite.desc;
  document.getElementById("inviteDate").innerText = CONFIG.invite.date;
  document.getElementById("invitePlace").innerText = CONFIG.invite.place;
  document.getElementById("inviteDressCode").innerText = CONFIG.invite.dressCode;

  const triggerAccept = () => {
    document.getElementById("choiceButtons").style.display = "none";
    document.getElementById("acceptedMessage").style.display = "block";

    // Праздничный салют из конфетти
    if (typeof confetti === "function") {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    }
  };

  document.getElementById("btnYes").addEventListener("click", triggerAccept);
  document.getElementById("btnOfCourse").addEventListener("click", triggerAccept);
}

// Запуск анимаций фона
createFloatingHearts();
