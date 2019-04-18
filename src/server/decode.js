import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const decode = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
  comfirmToken(token, key) {
    jwt.verify(token, key, (err, authData) => {
      if (err) {
        return 'false';
      }
      return { authData };
    });
  },
};

export default decode;
