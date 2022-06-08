var passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const passwordValidator = (password) => {
  if (passwordFormat.test(password)) {
    return true;
  }
  return false;
};

export { passwordValidator };
