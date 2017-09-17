/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
let cookieModule = require('./index');

function isMatching(full, chunk) {
    return (full.name.toLowerCase().indexOf(chunk.toLowerCase()) != -1 ||
        full.value.toLowerCase().indexOf(chunk.toLowerCase()) != -1);
}

function refresh() {
    while (listTable.lastChild) {
        listTable.removeChild(listTable.lastChild);
    }
    let cookiesArr = [];

    if (document.cookie) {
        let cookies = document.cookie.split('; ');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split('=');

            cookiesArr.push({
                name: cookie[0],
                value: cookie[1]
            });
        }
        let filterValue = filterNameInput.value;

        cookiesArr = cookiesArr.filter(item => isMatching(item, filterValue));
        for (let i = 0; i < cookiesArr.length; i++) {
            let tr = document.createElement('tr');
            let nameTd = document.createElement('td');
            let valueTd = document.createElement('td');
            let btnTd = document.createElement('td');
            let deleteBtn = document.createElement('button');

            nameTd.textContent = cookiesArr[i].name;
            valueTd.textContent = cookiesArr[i].value;
            deleteBtn.name = cookiesArr[i].name;
            deleteBtn.textContent = 'Удалить';
            btnTd. appendChild(deleteBtn);
            tr.appendChild(nameTd);
            tr.appendChild(valueTd);
            tr.appendChild(btnTd);
            listTable.appendChild(tr);
        }
    }

}

filterNameInput.addEventListener('keyup', function() {
    refresh();
});

addButton.addEventListener('click', () => {
    let name = addNameInput.value;
    let value = addValueInput.value;

    if (name) {
        cookieModule.createCookie(name, value);
        refresh();
    }
});

listTable.addEventListener('click', (event) => {
    let target = event.target;

    if (target.tagName == 'BUTTON') {
        let name = target.name;

        cookieModule.deleteCookie(name);
        target.parentElement.parentElement.remove();
    }
});

