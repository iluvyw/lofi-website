module.exports = {
  gravatar: (email) => {
    const hashed = md5(email);
    return `https://www.gravatar.com/avatar/${hashed}.jpg?d=identicon`;
  },
};
