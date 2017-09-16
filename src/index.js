/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {

    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.responseType = 'json';
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status == 200) {
                let cities = xhr.response.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                
                resolve(cities);
            } else {
                reject(xhr.statusText);
            }
        })
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
