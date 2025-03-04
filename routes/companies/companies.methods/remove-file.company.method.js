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

  return !!photo;
}

module.exports = { removeFile };
