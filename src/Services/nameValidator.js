const pattern = /^[a-zA-Z]{2,25}( [a-zA-Z]{2,25})+$/;

export const nameValidator = (name) => pattern.test(name);
