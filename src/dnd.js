/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let div = document.createElement('div');
    let minWidth = 50;
    let minHeight = 50;
    let maxWidth = Math.floor(document.documentElement.clientWidth / 2);
    let maxHeight = Math.floor(document.documentElement.clientHeight / 2);
    let randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    div.classList.add('draggable-div');
    div.style.width = randomInt(minWidth, maxWidth) + 'px';
    div.style.height = randomInt(minHeight, maxHeight) + 'px';
    div.style.top = randomInt(minHeight, maxHeight) + 'px';
    div.style.left = randomInt(minWidth, maxWidth) + 'px';
    div.style.backgroundColor = 'rgb(' + randomInt(0, 255) + ',' + randomInt(0, 255) + ',' + randomInt(0, 255) + ')';
    div.style.position = 'absolute';

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.addEventListener('mousedown', (event) => {
        let moveTo = (event) => {
            target.style.left = event.pageX - shiftX + 'px';
            target.style.top = event.pageY - shiftY + 'px';
        }
        let coordinates = target.getBoundingClientRect();
        let shiftX = event.pageX - coordinates.left;
        let shiftY = event.pageY - coordinates.top;

        target.style.zIndex = 1000;
        document.addEventListener('mousemove', moveTo);

        target.addEventListener('mouseup', function mouseUp() {
            document.removeEventListener('mousemove', moveTo);
            target.removeEventListener('mouseup', mouseUp);
        });
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
