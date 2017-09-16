/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return require('./index').loadAndSortTowns();
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    return (full.toLowerCase().indexOf(chunk.toLowerCase()) != -1);
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
// let townsPromise;
let cities = [];
let errorBlock = document.createElement('div');
let txtDiv = document.createElement('div');
let reloadBtn = document.createElement('button');
let funcSuccess = data => {
    filterBlock.style.display = 'block';
    loadingBlock.style.display = 'none';
    errorBlock.style.display = 'none';
    cities = data;
}
let funcErr = () => {
    errorBlock.style.display = 'block';
    loadingBlock.style.display = 'none';
}

errorBlock.style.display = 'none';
txtDiv.textContent = 'Не удалось загрузить города';
reloadBtn.textContent = 'Повторить';
errorBlock.appendChild(txtDiv);
errorBlock.appendChild(reloadBtn);
homeworkContainer.appendChild(errorBlock);

loadTowns().then(funcSuccess, funcErr);

filterInput.addEventListener('keyup', () => {
    let inputStr = filterInput.value.trim();
    let filteredList = [];

    while (filterResult.lastChild) {
        filterResult.removeChild(filterResult.lastChild);
    }
    if (inputStr) {
        filteredList = cities.filter(item => isMatching(item.name, inputStr));
        for (let i = 0; i < filteredList.length; i++) {
            let div = document.createElement('div');

            div.textContent = filteredList[i].name;
            filterResult.appendChild(div);
        }
    }
});

reloadBtn.addEventListener('click', () => {
    loadTowns().then(funcSuccess, funcErr);
});

export {
    loadTowns,
    isMatching
};
