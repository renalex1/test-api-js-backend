const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Мягкое удаление компании и связанных данных.
 * Устанавливает `deletedAt` без полного удаления записи.
 * @param {number} id - ID компании для удаления.
 * @return {boolean} - `true`, если удаление успешно.
 */
async function removeOne(id) {
  const deletedAt = new Date();

  const company = await prisma.company.update({
    where: { id },
    data: { deletedAt },
  });

  await prisma.photo.updateMany({
    where: { companyId: id },
    data: { deletedAt },
  });

  await prisma.contact.updateMany({
    where: { companyId: id },
    data: { deletedAt },
  });

  await prisma.contract.updateMany({
    where: { companyId: id },
    data: { deletedAt },
  });

  return true;
}

module.exports = { removeOne };
