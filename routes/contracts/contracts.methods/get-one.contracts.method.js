const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Возвращает данные контракта с указанным идентификатором.
 * @param {string} id
 * @return {Object|null}
 */
async function getOne(id) {
  return await prisma.contract.findUnique({
    where: {
      id: Number(id),
    },
    include: { companies: true },
  });
}

module.exports = { getOne };
