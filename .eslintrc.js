module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended"],
    rules: {
        "no-console": "off",
        "no-debugger": "off",
        //禁止出现未使用的变量
        "no-unused-vars": 'off',
    },
    // parserOptions: {
    //     parser: '@babel/eslint-parser'
    // }
};
