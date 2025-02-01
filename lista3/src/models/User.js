const bcrypt = require('bcrypt');

class User {

  static currentId = 0; 

  // constructor para criar um novo usuário
  constructor(name_user,email_user,password_user){
  
    this.id_user = User.getId();
  
    this.name_user = name_user;
  
    this.email_user = email_user;
  
    this.password_user = password_user;
  
  }

  static getUsers() {
    return User.users;
  }

  // Método para pegar o id
  static getId() {
    return User.currentId++;
  }

  // Método para verificar a senha
  async verifyPassword(password) {

    return await bcrypt.compare(password, this.password_user);

  }

  // Método para criptografar a senha
  async hashPassword(password) {
   
    const salt = await bcrypt.genSalt(10);
   
    return await bcrypt.hash(password, salt);
  
  }

  // Método para encontrar o usuário pelo email
  static async findByEmail(email) {
   
    const usuario = User.users.find(usuario => usuario.email_user === email);
      
    return usuario||null;
  }

  // Método para adicionar um novo usuário
  static async addNewUser(name,email,password){

    const user =  new User(name,email,password);

    if (await User.findByEmail(email)) {
      
      return null;
    
    }

    user.password_user = await user.hashPassword(password);

    User.users.push(user);

    return user;

  }


}

// Array de usuários
(async () => {
  const hashedPassword = await new User().hashPassword('123456');
  const hashedPasswordMaria = await new User().hashPassword('123456');
  const hashedPasswordAdmin= await new User().hashPassword('admin');

  User.users = [
    new User(1, 'João', 'joao@hotmail.com', hashedPassword),
    new User(2, 'Maria', 'maria@gmail.com', hashedPasswordMaria),
    new User(3, 'admin','admin@gmail.com', hashedPasswordAdmin )
  ];

}
)();

module.exports = User;