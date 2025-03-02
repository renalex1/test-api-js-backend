const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Возвращает данные пользователя с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */
async function getOne(id) {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
}

module.exports = { getOne };
