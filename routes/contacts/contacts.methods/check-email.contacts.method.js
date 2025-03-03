
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Проверяет существование email у контактах в базе данных.
 * @param {string} email
 * @return {boolean}
 */
async function checkEmailExist(email) {
  const contact = await prisma.contact.findFirst({
    where: { email },
  });

  return !!contact;
}

module.exports = { checkEmailExist };
