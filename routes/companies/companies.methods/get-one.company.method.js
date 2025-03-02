const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Возвращает данные компании с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */
async function getOne(id) {
  return await prisma.company.findUnique({
    where: {
      id: Number(id),
    },
    include: { photos: true }
  });
}

module.exports = { getOne };
