const express = require('express');
// const User = require('../models/User');

const router = express.Router();

//rota para mostrar a pagina signup
router.get('/signup', (req, res) => {
  res.render('auth-views/signup');
});

//função para verificar os dados
const verifyData = (req, res) => {
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

    return;
  }

  if (!(password === confirmationPassword)) {
    const errors = {
      passwordError: 'Senhas não conferem',
      confirmationPasswordError: 'Senhas não conferem',
    };

    res.render('auth-views/signup', errors);

    return;
  }
};

//rota para cadastrar usuário
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, cpf, password, confirmationPassword } = req.body;

    verifyData(req, res);
    // const newUser = new User({
    //   fullName,
    //   email,
    //   cpf,
    //   password,
    // });

    // await newUser.save();
    console.log(req.body);

    // res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
