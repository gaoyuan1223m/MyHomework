const fp = require("lodash/fp")

const cars = [{
    name: "Ferrari FF", horsepower: 600, dollar_value: 700000, in_stock: true
}, {
    name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false
}, {
    name: "Jaguar XKR-s", horsepower: 550, dollar_value: 132000, in_stock: false
}, {
    name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false
}]
/**
 * 练习一
 */
let isLastInStock = function (cars) {
    return fp.flowRight(fp.prop("in_stock"), fp.last)(cars)
}

// console.log(isLastInStock(cars))

/**
 * 练习二
 */
let getNameOfFirstCar = function (cars) {
    return fp.flowRight(fp.prop("name"), fp.first)(cars)
}

// console.log(getNameOfFirstCar(cars))



/**
 * 练习三 
 */
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = function (cars) {
    return fp.flowRight(_average, fp.map(fp.prop("dollar_value")))(cars)
}

// console.log(averageDollarValue(cars))

/**
 * 练习4
 */
let _underscore = fp.replace(/\W+/g, "_")

let sanitizeNames = function (names) {
    return fp.map(fp.flowRight(_underscore, fp.toLower))(names)
}

// console.log(sanitizeNames(["HELLL World", "World HELLO III"]))