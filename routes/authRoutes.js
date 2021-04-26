const express = require('express');
const User = require('../models/User');
const generateEncryptedPassword = require('../utils/passwordManager');

const router = express.Router();

//rota para mostrar a pagina signup
router.get('/signup', (req, res) => {
  res.render('auth-views/signup');
});

//função para verificar os dados
const verifyData = async (req, res) => {
  const { fullName, email, cpf, password, confirmationPassword } = req.body;

  if (!fullName || !email || !cpf || !password || !confirmationPassword) {
    const errors = {
      fullNameError: !fullName ? 'Campo nome obrigatório' : undefined,
      emailError: !email ? 'Campo email obrigatório' : undefined,
      cpfError: !cpf ? 'Campo CPF obrigatório' : undefined,
      passwordError: !password ? 'Campo senha obrigatório' : undefined,
      confirmationPasswordError: !confirmationPassword ? 'Campo confirmação de senha obrigatório' : undefined,
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  //verificando se a senha tem 6 digitos
  if (password.length < 6) {
    const errors = {
      passwordError: password.length < 6 ? 'Sua senha deve ter no mínimo 6 dígitos' : undefined,
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  //verificando se as senhas sao iguais
  if (!(password === confirmationPassword)) {
    const errors = {
      passwordError: 'Senhas não conferem',
      confirmationPasswordError: 'Senhas não conferem',
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  //verificando se o usuário já existe
  const userEmailExists = await User.find({ email });
  const userCpfExists = await User.find({ cpf });

  if (userEmailExists.length > 0 || userCpfExists.leng > 0) {
    const errors = {
      emailError: userEmailExists.length ? 'Email já cadastrado' : undefined,
      cpfError: userCpfExists.length ? 'CPF já cadastrado' : undefined,
    };
    res.render('auth-views/signup', errors);

    return false;
  }

  return true;
};

//rota para cadastrar usuário
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, cpf, password } = req.body;

    const idDataValid = await verifyData(req, res);

    if (!idDataValid) return;

    const newUser = new User({
      fullName,
      email,
      cpf,
      password: await generateEncryptedPassword(password),
    });

    console.log(newUser);

    await newUser.save();
    // console.log(req.body);

    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
