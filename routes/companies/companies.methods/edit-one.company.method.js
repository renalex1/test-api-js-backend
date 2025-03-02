const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Редактирует данные компании с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */
async function editOne(id, data) {
  return await prisma.company.update({
    where: {
      id: Number(id),
    },
    data: data,
    include: { photos: true }
  });
}

module.exports = { editOne };
