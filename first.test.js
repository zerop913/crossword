// Очистка кроссворда
function clearCrossword() {
  const inputs = document.getElementsByClassName("inpt");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].classList.remove("hint"); // Удаляем класс "hint"
  }
}

// Тестирование функции clearCrossword
describe("clearCrossword", () => {
  // Проверка, что функция правильно очищает все поля ввода
  test("clearing all fields", () => {
    // Создаем HTML с полями ввода и кнопкой
    document.body.innerHTML = `
        <input class="inpt" value="A" />
        <input class="inpt" value="B" />
        <input class="inpt" value="C" />
        <button class="clear-btn"></button>
      `;

    // Вызываем функцию, которую хотим протестировать
    clearCrossword();

    // Проверяем, что все поля ввода очищены
    const inputs = document.getElementsByClassName("inpt");
    for (let i = 0; i < inputs.length; i++) {
      expect(inputs[i].value).toBe("");
    }
  });
});
