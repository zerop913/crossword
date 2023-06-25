// Очистка кроссворда
function clearCrossword() {
  const inputs = document.getElementsByClassName("inpt");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].classList.remove("hint"); // Удаляем класс "hint"
  }
}

// Подсказка
let hintCount = 0;

function showHint() {
  // Проверяем, достигнуто ли ограничение по использованию подсказок
  if (hintCount >= 5) {
    // Выводим уведомление о том, что больше подсказок нет
    showNotification(
      "Нет доступных подсказок",
      "Вы использовали все доступные подсказки",
      "text-gray-800"
    );
    return;
  }

  const inputs = document.getElementsByClassName("inpt");
  const emptyIndices = getEmptyIndices(inputs); // Получаем индексы пустых ячеек

  if (emptyIndices.length === 0) {
    return; // Если нет пустых ячеек, выходим из функции
  }

  const hintIndex = getRandomEmptyIndex(emptyIndices); // Получаем случайный индекс пустой ячейки

  const hintValue = getHintValue(inputs[hintIndex].id);

  inputs[hintIndex].value = hintValue;
  inputs[hintIndex].classList.add("hint");

  // Блокируем кнопку на 10 секунд
  hintBtn.disabled = true;
  hintBtn.style.cursor = "not-allowed";

  // Таймер для отсчета времени до доступности кнопки
  let countdown = 10;
  const countdownTimer = setInterval(function () {
    hintBtn.innerText = `Подсказка (${countdown}s)`;
    countdown--;
    if (countdown < 0) {
      clearInterval(countdownTimer);
      hintBtn.disabled = false;
      hintBtn.innerText = "Подсказка";
      hintBtn.style.cursor = "pointer";
    }
  }, 1000);

  // Через 2 секунды возвращаем все на свои места
  setTimeout(function () {
    resetHints(inputs);
  }, 2000);

  // Увеличиваем счетчик использованных подсказок
  hintCount++;
}

// Получение случайного индекса пустой ячейки
function getRandomEmptyIndex(emptyIndices) {
  const randomIndex = Math.floor(Math.random() * emptyIndices.length);
  return emptyIndices[randomIndex];
}

// Получение индексов пустых ячеек
function getEmptyIndices(inputs) {
  const emptyIndices = [];
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (!input.value) {
      emptyIndices.push(i);
    }
  }
  return emptyIndices;
}

// Получение значения подсказки по id
function getHintValue(id) {
  const hints = {
    1: "Р",
    2: "И",
    3: "Ф",
    4: "М",
    5: "А",
    6: "Н",
    7: "Ц",
    8: "Е",
    9: "Н",
    10: "Т",
    11: "Е",
    12: "В",
    13: "Р",
    14: "О",
    15: "С",
    16: "П",
    17: "О",
    18: "Р",
    19: "В",
    20: "Е",
    21: "С",
    22: "А",
    23: "Л",
  };

  return hints[id] || "";
}

// Сброс подсказок
function resetHints(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.classList.contains("hint")) {
      input.classList.remove("hint");
    }
  }
}

// Проверка правильности введенных букв
function checkLetters(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const inputValue = input.value.trim().toUpperCase();
    const hintValue = getHintValue(input.id);

    if (inputValue !== hintValue) {
      return false; // Возвращаем false, если введенная буква не соответствует подсказке
    }
  }

  return true; // Если все буквы правильные, возвращаем true
}

// Проверка, решен ли кроссворд
function checkCrossword() {
  const inputs = document.getElementsByClassName("inpt");
  const isCrosswordSolved = checkLetters(inputs);

  if (isCrosswordSolved) {
    showNotification(
      "Кроссворд решен!",
      "Поздравляю, вы успешно разгадали кроссворд!",
      "text-gray-800"
    );
    clearCrossword(); // Очищаем кроссворд, так как он решен
  } else {
    showNotification(
      "Кроссворд не решен!",
      "Попробуйте еще раз.",
      "text-gray-800"
    );
  }
}

// Показать уведомление
function showNotification(title, message, textColorClass) {
  const notificationOverlay = document.getElementById("notification-overlay");
  const closeButton = document.getElementById("close-notification-btn");
  const notificationTitle = document.querySelector(".notification .text-xl");
  const notificationMessage = document.querySelector(
    ".notification .text-gray-800"
  );

  notificationTitle.innerText = title;
  notificationMessage.innerText = message;
  notificationMessage.classList.add(textColorClass);

  notificationOverlay.style.display = "flex";
  closeButton.addEventListener("click", function () {
    notificationOverlay.style.display = "none";
  });
}

// Обработчик кнопки очистки
const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", clearCrossword);

// Обработчик кнопки подсказки
const hintBtn = document.querySelector(".hint-btn");
hintBtn.addEventListener("click", showHint);

// Обработчик кнопки проверки результата
const checkResultBtn = document.getElementById("check-result-btn");
checkResultBtn.addEventListener("click", checkCrossword);

// Добавление обработчика события на каждую ячейку ввода
const inputs = document.getElementsByClassName("inpt");
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (e) {
    const input = e.target;
    const inputValue = input.value.trim();

    // Проверяем, была ли введена буква
    if (inputValue.length === 1 && /^[a-zA-Zа-яА-Я]$/.test(inputValue)) {
      // Перемещаем фокус на следующую доступную ячейку, если она существует
      let nextInput = inputs[i + 1];
      while (nextInput && nextInput.value.trim() !== "") {
        nextInput = inputs[i + 2];
        i++;
      }
      if (nextInput) {
        nextInput.focus();
      }
    }
  });
}

// Функция для проверки, содержит ли строка только русские буквы
function containsOnlyRussianLetters(str) {
  var russianLettersRegex = /^[а-яА-ЯёЁ]+$/i;
  return russianLettersRegex.test(str);
}

// Получаем все поля ввода
var inputFields = document.querySelectorAll(".inpt");

// Добавляем обработчик события "input" для каждого поля ввода
inputFields.forEach(function (field) {
  field.addEventListener("input", function (event) {
    var inputValue = event.target.value;
    // Проверяем, содержит ли введенное значение только русские буквы
    if (!containsOnlyRussianLetters(inputValue)) {
      // Если значение содержит недопустимые символы, очищаем поле ввода
      event.target.value = "";
    }
  });
});
