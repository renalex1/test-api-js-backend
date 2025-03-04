const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Создаем данные файла
 * и возвращает результат.
 * @param {Object} data
 * @return {Object}
 */
async function editFile(id, data) {
  return await prisma.photo.update({
    where: { id },
    data: {
      ...data,
    }
  });
}

module.exports = { editFile };
