import { User } from "src/user/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
