import app from "./config/express";

import { logger } from "./config/logger";

const port = 3200;

app.listen(port, async () => {
  logger.info(`Server listening on port : ${port}`);
});
