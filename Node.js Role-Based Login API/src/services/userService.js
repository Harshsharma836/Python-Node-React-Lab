import { logger } from "../middleware/log.middleware.js";

const userService = {
  profile: () => {
    let msg = `This is a user profile route"`;
    logger.info("This is a user profile route");
    return msg;
  },
};

export default userService;