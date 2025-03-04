const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Мягкое удаление контракта.
 * Устанавливает `deletedAt` без полного удаления записи.
 * @param {number} id - ID контракта для удаления.
 * @return {boolean} - `true`, если удаление успешно, или `false`, если контракта уже удалена или не найдена.
 */
async function removeOne(id) {
  const contract = await prisma.contract.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return true;
}

module.exports = { removeOne };
