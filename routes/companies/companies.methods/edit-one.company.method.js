const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Редактирует данные компании с указанным идентификатором
 * и возвращает результат.
 * @param {string} id
 * @param {Object} data
 * @return {Object}
 */
async function editOne(id, data) {
  const contractData = data.contract ? {
    no: data.contract.no,
    issueDate: data.contract.issue_date
  } : null;

  const photoData = (data.photos && Array.isArray(data.photos) && data.photos.length > 0) ? { ...data.photos[0] } : null;

  delete data.contract
  delete data.photos

  const company = await prisma.company.update({
    where: {
      id: Number(id),
    },
    data: data,
    include: { photos: true, contacts: true, contracts: true },
  });

  if (contractData && company.contracts.length > 0) {
    await prisma.contract.update({
      where: {
        id: company.contracts[0].id,
      },
      data: contractData,
    });
  }

  if (photoData && company.photos.length > 0) {
    await prisma.photo.update({
      where: {
        id: company.photos[0].id,
      },
      data: photoData,
    });
  }

  return await prisma.company.findUnique({
    where: { id: company.id },
    include: { photos: true, contacts: true, contracts: true },
  });
}

module.exports = { editOne };
