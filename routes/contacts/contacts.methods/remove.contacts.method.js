const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Мягкое удаление контакта.
 * Устанавливает `deletedAt` без полного удаления записи.
 * @param {number} id - ID контакта для удаления.
 * @return {boolean} - `true`, если удаление успешно, или `false`, если контакта уже удалена или не найдена.
 */
async function removeOne(id) {
  await prisma.contact.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return true;
}

module.exports = { removeOne };
