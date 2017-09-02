/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let res = [];

    for (let i = 0; i < array.length; i++) {
        res.push(fn(array[i], i, array));
    }
    
    return res;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let i = initial ? 0 : 1;

    if (!initial) {
        initial = array[0];
    }
    for (i; i < array.length; i++) {
        initial = fn(initial, array[i], i, array);
    }
    
    return initial;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj[prop] ? true : false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    let res = [];

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            res.push(prop);
        }
    }

    return res;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let res = [];

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            res.push(prop.toUpperCase());
        }
    }

    return res;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    let length = array.length;
    let res = [];

    from = from || 0;
    if (from < 0 && from + length < 0) {
        from = 0;
    }
    from = (from >= 0) ? from : from + length;
    to = (typeof to !== 'undefined') ? to : length;
    if (to < 0) {
        to = to + length;
    }
    if (to > length) {
        to = length;
    }
    for (let i = from; i < to; i++) {
        res.push(array[i]);
    }

    return res;
}
/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value*value;

            return true;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
