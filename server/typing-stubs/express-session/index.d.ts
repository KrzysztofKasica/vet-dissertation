import "express-session";
declare module "express-session" {
  interface SessionData {
    clientId: number;
    doctor: boolean;
  }
}
