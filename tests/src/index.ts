import { Mahal } from "mahal";
import Main from "./components/main";
import MahalTest from "@mahaljs/test-utils";
import { MahalUtilPlugin } from "@mahaljs/util"

export const app = new Mahal(Main as any, document.querySelector('#app') as HTMLElement);
app.extend.formatter('upper', (value) => {
    return value.toUpperCase();
})
app.extend.plugin(MahalUtilPlugin);
if (process.env.NODE_ENV !== "test") {
    app.create();
}
else {
    app.extend.plugin(MahalTest, null);
}