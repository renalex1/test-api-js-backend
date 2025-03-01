const logger = require("../../../services/logger.service")(module);
const { OK, BAD_REQUEST } = require("../../../constants/http-codes");
const JwtService = require("../../../services/jwt.service");
const jwtConfig = require("../../../config").jwt;
const { PrismaClient, AuthMethod, UserRole } = require('@prisma/client');
const prisma = new PrismaClient();
const { hash } = require('argon2');

/**
 * @todo: Предполагается к удалению по факту реализации требований тестового задания.
 * POST /users
 * Служебный эндпоинт для регистрации пользователя.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function postCreateUser(req, res) {
  logger.init("post create user");

  const { email, password, full_name, role } = req.query;

  let isAdmin = false;
  const authHeader = req.headers['authorization'];
  if (role == UserRole.ADMIN && authHeader && authHeader.startsWith('Bearer ')) {

    const reqToken = authHeader.split(' ')[1];

    const getUserData = new JwtService(jwtConfig).decode(reqToken).data;
    const findAdmin = await prisma.user.findUnique({ where: { email: getUserData.pld.email, } })

    isAdmin = findAdmin.role === UserRole.ADMIN ? true : false;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    logger.error("User already exists");
    return res.status(BAD_REQUEST).json({ message: "User already exists" });
  }

  const hashedPassword = await hash(password);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      fullName: full_name,
      role: isAdmin ? role : UserRole.REGULAR,
      isVerified: false,
      method: AuthMethod.CREDENTIALS
    },
    include: { accounts: true }
  });

  const token = new JwtService(jwtConfig).encode(newUser).data;

  await prisma.account.create({
    data: {
      userId: newUser.id,
      type: 'credentials',
      provider: AuthMethod.CREDENTIALS,
      accessToken: token,
      expiresAt: 10
    }
  });

  const user = await prisma.user.findUnique({ where: { email }, include: { accounts: true } })
  delete user.password;

  res.header("Authorization", `Bearer ${token}`);
  logger.success("User created successfully");

  return res.status(OK).json({ message: "User created successfully", user });
}

module.exports = {
  postCreateUser,
};
