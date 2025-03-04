const config = require("../config");

/**
 * Возвращает URL на основании указанного запроса.
 * @param {Object} req
 * @return {string}
 */
function getUrlForRequest(req) {
  const { port } = config;
  return `${req.protocol}://${req.hostname}${
    port === "80" || port === "443" ? "" : `:${port}`
  }/`;
}

/**
 * Возвращает URL файла.
 * @param {Object} req
 * @param {string} fileName
 * @return {string}
 */
function getFileUrl(req, fileName) {
  const { id: userId } = req.payload;
  const url = getUrlForRequest(req);
  return `${url}images/${userId}/${fileName}`;
}

module.exports = { getUrlForRequest, getFileUrl };
