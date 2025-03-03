const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Мягкое удаление компании и связанных данных.
 * Устанавливает `deletedAt` без полного удаления записи.
 * @param {number} id - ID компании для удаления.
 * @return {boolean} - `true`, если удаление успешно, или `false`, если компания уже удалена или не найдена.
 */
async function removeOne(id) {
  const company = await prisma.company.findUnique({
    where: { id },
  });

  if (company.deletedAt) {
    return false;
  }

  const deletedAt = new Date();

  await prisma.company.update({
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
