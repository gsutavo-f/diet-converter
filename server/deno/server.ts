import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";

const app = new Application();
const PORT = 3001;

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({port: PORT});
console.log(`Server listenig on port ${PORT}`)