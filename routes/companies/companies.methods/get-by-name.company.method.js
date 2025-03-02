const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Возвращает данные компании с указанным именем.
 * @param {string} name
 * @return {Object|null}
 */
async function getByNameOrEntity(name, businessEntity) {
  return await prisma.company.findFirst({
    where: {
      OR: [
        { name: name },
        { businessEntity: businessEntity }
      ]
    }
  });
}


module.exports = { getByNameOrEntity };
