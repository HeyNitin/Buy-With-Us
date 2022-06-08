var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const emailValidator = (email) => {
  if (mailformat.test(email)) {
    return true;
  }
  return false;
};

export { emailValidator };
