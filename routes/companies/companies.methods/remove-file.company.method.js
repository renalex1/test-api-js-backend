const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Мягкое удаление файла
 * @param {Object} data
* @return {boolean} - `true`, если удаление успешно, или `false`, если компания уже удалена или не найдена.
 */
async function removeFile(id) {
  const photo = await prisma.photo.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  await prisma.company.update({
    where: { id: photo.companyId },
    data: {
      photos: {
        disconnect: { id: photo.id },
      },
    },
  });

  return true;
}

module.exports = { removeFile };
