import App from "./app";
import { TranslationController } from "./translation.controller";

const translationController = new TranslationController();
const app = new App(3000, [translationController]);

app.listen();
