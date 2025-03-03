const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Получаем список компаний с фильтрацией, сортировкой и пагинацией.
 * @param {number} userId - ID пользователя для фильтрации компаний.
 * @param {Object} query - Параметры для фильтрации, сортировки и пагинации.
 * @param {string} [query.status] - Фильтрация по статусу компании.
 * @param {string} [query.type] - Фильтрация по типу компании.
 * @param {string} [query.sortBy] - Поле для сортировки (например, 'name' или 'createdAt').
 * @param {string} [query.sortOrder] - Порядок сортировки ('asc' или 'desc').
 * @param {number} [query.page] - Номер страницы для пагинации.
 * @param {number} [query.pageSize] - Количество записей на странице.
 * @return {Object} - Список компаний с указанными параметрами.
 */
async function getCompanies(userId, query) {
  const {
    status,
    type,
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    pageSize = 10,
  } = query;

  const where = {
    userId: Number(userId),
  };

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
