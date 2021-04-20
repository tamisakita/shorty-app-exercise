const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost/shorty-database', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Conectado no banco de dados!');

    // const newUser = {
    //   fullName: 'Patricia',
    //   email: 'patricia@patricia.com.br',
    //   cpf: '123.456.789-00',
    //   password: '123456',
    // };

    // User.create(newUser)
    //   .then((user) => {
    //     console.log(user);
    //   });

    // editar dados do usuário
    // User.findOneAndUpdate({ _id: '607e0962b6969726ce6c6023' }, { $set: { fullName: 'Patricia Sakita' } })
    //   .then((updatedUser) => {
    //     console.log('usuário atualizado', updatedUser)
    //   });

    // deletar usuário
    // User.findOneAndDelete({ _id: '607e0962b6969726ce6c6023' })
    // .then((deletedUser) => {
    //   console.log('usuário deletado', deletedUser)
    // });

    
  });
