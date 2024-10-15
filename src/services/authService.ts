import User, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // Para gerar tokens aleatórios
import nodemailer from 'nodemailer'; // Para enviar emails

// Função para registrar usuário
export const registerUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  // Verificar se o usuário já existe no banco de dados
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('E-mail já cadastrado');
  }

  // Criação do hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criação do novo usuário
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  // Retorna o usuário criado como IUser
  return newUser;
};

// Função para login do usuário
export const loginUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  // Buscar o usuário no banco de dados utilizando o email como critério
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('E-mail inválido');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Senha incorreta');
  }

  user.loginCount = (user.loginCount || 0) + 1;
  user.lastLogin = new Date();

  await user.save();

  return user;
};

// Função para solicitar redefinição de senha
export const requestPasswordReset = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  // Geração do token de redefinição de senha
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Definir o token e a data de expiração (ex: 1 hora)
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hora de validade

  await user.save();

  // Configurar o serviço de email (exemplo usando nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seuemail@gmail.com',
      pass: 'suasenha'
    }
  });

  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: user.email,
    subject: 'Redefinição de Senha',
    text: `Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: ${resetLink}`
  };

  // Enviar email
  await transporter.sendMail(mailOptions);
};

// Função para redefinir a senha
export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<void> => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() } // Verifica se o token não expirou
  });

  if (!user) {
    throw new Error('Token inválido ou expirado');
  }

  // Atualizar a senha do usuário
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
};
