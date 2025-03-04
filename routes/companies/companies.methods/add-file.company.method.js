const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Создаем данные файла
 * и возвращает результат.
 * @param {Object} data
 * @return {Object}
 */
async function addFile(id, data) {
  const file = await prisma.photo.create({
    data: {
      ...data,
    }
  });

  await prisma.company.update({
    where: {
      id: Number(id),
    },
    data: {
      photos: {
        connect: { id: file.id },
      }
    },
  });

  return file
}

module.exports = { addFile };
