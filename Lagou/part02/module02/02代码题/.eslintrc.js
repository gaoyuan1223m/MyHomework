
module.exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/standard"
    ],
    "parserOptions": {
        "parser": "babel-eslint"
    },
    "rules": {
        "indent": ["error", 4]
    }
}