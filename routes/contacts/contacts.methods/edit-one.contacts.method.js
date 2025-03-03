const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Редактирует данные контакта с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */
async function editOne(id, data) {
  return await prisma.contact.update({
    where: {
      id: Number(id),
    },
    data,
    include: { companies: true },
  });
}

module.exports = { editOne };
