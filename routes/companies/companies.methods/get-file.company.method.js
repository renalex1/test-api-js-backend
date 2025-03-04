const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Получает данные файла по его имени.
 * @param {string} name - Название файла.
 * @returns {Promise<Object|null>} - Объект файла или null, если файл не найден.
 */
async function getFileByName(name) {
  try {
    return await prisma.photo.findFirst({
      where: { name }
    });
  } catch (err) {
    return null
  }
}

module.exports = { getFileByName };
