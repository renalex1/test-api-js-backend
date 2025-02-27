const { startServer } = require("./server");
const logger = require("./services/logger.service")(module);
// todo: разкомментировать для работы с БД
const { sampleDB } = require("./services/database.service");

(async () => {
  try {
    // todo: разкомментировать для работы с БД
    await sampleDB.connect();
    startServer();
  } catch (error) {
    logger.error(error.message);
    // todo: разкомментировать для работы с БД
    await sampleDB.disconnect();
    logger.shutdown(() => process.exit(1));
  }
})();

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
  process.on(signal, async () => {
    // todo: разкомментировать для работы с БД
    await sampleDB.disconnect();
    logger.info(`Caught signal ${signal}`);
    logger.shutdown(() => process.exit(0));
  })
);

process.on("uncaughtException", async (error) => {
  // todo: разкомментировать для работы с БД
  await sampleDB.disconnect();
  logger.error(`Uncaught exception! ${error.message}`);
  logger.shutdown(() => process.exit(1));
});
