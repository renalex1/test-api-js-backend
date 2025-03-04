const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Создаем данные контракта
 * и возвращает результат.
 * @param {Object} data
 * @return {Object}
 */
async function addOne(data) {
  return await prisma.contract.create({
    data: {
      ...data,
    }
  });
}

module.exports = { addOne };
