import { Mahal, Plugin } from "mahal";
import { toS } from "./formatterrs";

export * from "./decorators";
export * from "./formatterrs";

export class MahalUtilPlugin extends Plugin {
    setup(app: Mahal, options: any) {
        app.extend.formatter('toS', toS);
    }
}