const dbsConfig = require("../config").dbs;
const logger = require("./logger.service")(module);

/**
 * Базовый класс сервиса работы с базой данных
 */
class Database {
  #uri;

  #id;

  #database;

  #connection;

  constructor(config) {
    this.#uri = config.uri;
    this.#id = config.id;
    this.#database = config.database;
  }

  /**
   * Открывает соединение с БД.
   * @return {Promise<void>}
   */
  async connect() {
    try {
      // todo: метод установки соединения с БД
      logger.info(`Connected to ${this.#id}`);
    } catch (error) {
      logger.error(`Unable to connect to ${this.#id}:`, error.message);
    }
  }

  /**
   * Закрывает соединение с БД.
   * @return {Promise<void>}
   */
  async disconnect() {
    if (this.#connection) {
      try {
        // todo: метод закрытия соединения с БД
        logger.info(`Disconnected from ${this.#id}`);
      } catch (error) {
        logger.error(`Unable to disconnect from ${this.#id}:`, error.message);
      }
    }
  }

  /**
   * Возвращает объект соединения с БД,
   * @return {Object}
   */
  get connection() {
    return this.#connection;
  }
}

const sampleDB = new Database(dbsConfig.sample_db);

module.exports = { sampleDB };
