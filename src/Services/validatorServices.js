const nameFormat = /^[a-zA-Z]{2,25}( [a-zA-Z]{2,25})+$/;
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const nameValidator = (name) => nameFormat.test(name);

export const emailValidator = (email) => mailformat.test(email);

export const passwordValidator = (password) => passwordFormat.test(password);
