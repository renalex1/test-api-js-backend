const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Создаем данные контакта
 * и возвращает результат.
 * @param {Object} data
 * @return {Object}
 */
async function addOne(data) {
  return await prisma.contact.create({
    data: {
      ...data,
    }
  });
}

module.exports = { addOne };
