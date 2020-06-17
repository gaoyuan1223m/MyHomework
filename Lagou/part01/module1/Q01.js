
async function fn() {
    let v = await Promise
        .resolve("hello")
        .then(v => v + " " + "lagou")
        .then(v => v + " " + "I ❤ you")
    console.log(v)
}

fn()