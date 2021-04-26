//arquivo com funcoes que lidam com senha
const bcrypt = require('bcryptjs');

//quantidade de vezes que passa pelo encryptador
const saltRounds = 10;

//função para encryptar senha
const generateEncryptedPassword = async password => {
  const salt = await bcrypt.genSalt(saltRounds);

  const encryptedPassword = bcrypt.hashSync(password, salt);

  return encryptedPassword;
};

module.exports = generateEncryptedPassword;
