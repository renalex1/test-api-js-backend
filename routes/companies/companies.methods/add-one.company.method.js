const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Создаем данные компании
 * и возвращает результат.
 * @param {Object} data
 * @return {Object}
 */
async function addOne(data) {
  const contractData = {
    no: data.contract.no, issueDate: data.contract.issue_date
  }
  const photoData = { ...data.photos[0] }
  delete data.contract
  delete data.photos

  const company = await prisma.company.create({
    data: {
      ...data,
    }
  });

  await prisma.photo.create({
    data: {
      ...photoData,
      companies: {
        connect: { id: company.id },
      }
    }
  });

  await prisma.contract.create({
    data: {
      ...contractData,
      companies: {
        connect: { id: company.id },
      }
    }
  });

  return await prisma.company.findUnique({
    where: { id: company.id },
    include: { photos: true, contacts: true, contracts: true },
  });
}

module.exports = { addOne };
