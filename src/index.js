/* ДЗ 2 - работа с исключениями и отладчиком */

function exceptionEmptyArray (array) {
    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
    if (!array || !Array.isArray(array) || !array.length) {
        throw new Error('empty array');
    }
}

function exceptionNotFunction (fn) {
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }
}

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    exceptionEmptyArray (array);
    exceptionNotFunction (fn);
    var res = true;

    for (var i = 0; i < array.length; i++) {
        res = res && fn(array[i]);
    }

    return res;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    exceptionEmptyArray (array);
    exceptionNotFunction (fn);
    var res = false;

    for (var i = 0; i < array.length; i++) {
        res = res || fn(array[i]);
    }
    
    return res;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments (fn) {
    var res = [];
    var j = 0;

    exceptionNotFunction (fn);
    for (var i = 1; i < arguments.length; i++) {
        try {
            fn(arguments[i]);
        } catch (e) {
            res [j++] = arguments [i];
        }
    }

    return res;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function exceptionNotNumber (number) {
    if (typeof number !== 'number') {
        throw new Error('number is not a number');
    }
}
function calculator(number = 0) {
    exceptionNotNumber (number);
    var res = {
        sum: sum,
        dif: dif,
        div: div,
        mul: mul
    }

    function sum() {
        var s = number;

        for (var i = 0; i < arguments.length; i++) {
            s += arguments[i];
        }
        
        return s;
    }
    function dif() {
        var difference = number;

        for (var i = 0; i < arguments.length; i++) {
            difference -= arguments[i];
        }
        
        return difference;
    }
    function div() {
        var quotient = number;

        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] == 0) {
                throw new Error ('division by 0');
            }
            quotient /= arguments[i];
        }
        
        return quotient;
    }
    function mul() {
        var product = number;

        for (var i = 0; i < arguments.length; i++) {
            product *= arguments[i];
        }
        
        return product;
    }
    
    return res;
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
