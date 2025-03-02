const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Получаем список компаний с фильтрацией, сортировкой и пагинацией.
 * @param {Object} params - Параметры для фильтрации, сортировки и пагинации.
 * @param {string} [params.status] - Фильтрация по статусу компании.
 * @param {string} [params.type] - Фильтрация по типу компании.
 * @param {string} [params.sortBy] - Поле для сортировки (например, 'name' или 'createdAt').
 * @param {string} [params.sortOrder] - Порядок сортировки ('asc' или 'desc').
 * @param {number} [params.page] - Номер страницы для пагинации.
 * @param {number} [params.pageSize] - Количество записей на странице.
 * @return {Object} - Список компаний с указанными параметрами.
 */
async function getCompanies(query) {
  const {
    status,
    type,
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    pageSize = 10,
  } = query;

  const where = {};

  if (status) {
    where.status = status;
  }

  if (type) {
    where.type = {
      has: type,
    };
  }

  const companies = await prisma.company.findMany({
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip: (page - 1) * pageSize,
    take: parseInt(pageSize, 10),
    include: {
      photos: true,
      contacts: true,
      contracts: true,
    },
  });

  companies.forEach(company => {
    company.address = company.address ?? 'Не указан';
  });

  const totalCompanies = await prisma.company.count({ where });

  return {
    companies,
    pagination: {
      totalCompanies,
      totalPages: Math.ceil(totalCompanies / pageSize),
      currentPage: page,
    },
  };
}

module.exports = { getCompanies };
