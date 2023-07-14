import express, { Request, Response } from "express";
import { getRoomsEndpoint } from "./endpoints/getRooms";
import { init } from "./service/redis";
import { newRoom } from "./endpoints/newRoom";
import { setName } from "./endpoints/setName";
import cookieParser from "cookie-parser";
import { whoAmI } from "./endpoints/whoAmI";
import bodyParser from "body-parser";
import { getRoomEndpoint } from "./endpoints/getRoom";
import { getUserEndpoint } from "./endpoints/getUser";
import { startGame } from "./endpoints/startGame";
import { advanceCycleEndpoint } from "./endpoints/advanceCycle";
import { killEndpoint } from "./endpoints/kill";
import { join } from "./endpoints/join";
const app = express();
const port = 3000;

async function main() {
  app.use(bodyParser.json());
  app.use(cookieParser());
  // CORS middleware
  app.use((req: Request, res: Response, next: () => void) => {
    res.header("Access-Control-Allow-Origin", req.header("origin"));
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Cookie, Set-Cookie"
    );
    next();
  });

  app.get("/", async (_: Request, res: Response) => {
    await new Promise((r) => setTimeout(r, 50));
    res.send("hi");
  });
  app.get("/rooms", getRoomsEndpoint);
  app.post("/rooms", newRoom);
  app.post("/name", setName);
  app.get("/whoami", whoAmI);
  app.get("/room/:roomId", getRoomEndpoint);
  app.get("/user/:userId", getUserEndpoint);
  app.post("/start-game", startGame);
  app.post("/advance-cycle", advanceCycleEndpoint);
  app.post("/kill", killEndpoint);
  app.post("/join", join);

  await init();

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}
main().catch(console.error);
