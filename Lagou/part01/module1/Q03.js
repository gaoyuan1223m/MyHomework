const fp = require("lodash/fp")

class Container {
    static of(value) {
        return new Container(value)
    }

    constructor(value) {
        this._value = value
    }

    map(fn) {
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of(value) {
        return new Maybe(value)
    }

    isNothing() {
        return this._v == null
    }

    constructor(x) {
        this._v = x
    }

    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._v))
    }
}


/**
 * 练习1
 */

let maybe1 = Maybe.of([5, 6, 1])

let ex1 = (x) => {
    return maybe1.map(fp.map(fp.add(x)))
}
// console.log(ex1(2))

/**
 * 练习2
 */

let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "..."])

let ex2 = () => {
    return xs.map(fp.first)
}
// console.log(ex2())

/**
 * 练习3
 */
let safeProp = fp.curry((x, o) => Maybe.of(o[x]))
let user = { id: 2, name: "Albert" }
let ex3 = () => {
    return safeProp("name")(user).map(fp.first)
}
// console.log(ex3())

/**
 * 练习 4
 */

let ex4 = (n) => Maybe.of(n).map(parseInt)._v

