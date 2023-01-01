module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    //allow underscore dangle
    "no-underscore-dangle": 0,
  },
};
