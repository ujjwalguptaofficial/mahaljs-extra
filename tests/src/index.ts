import { Mahal } from "mahal";
import Main from "./components/main";
import MahalTest from "mahal-test-utils";
import { createRenderer } from "mahal-html-compiler";

export const app = new Mahal(Main, document.querySelector('#app') as HTMLElement);
app.extend.formatter('upper', (value) => {
    return value.toUpperCase();
})
if (process.env.NODE_ENV !== "test") {
    app.create();
}
else {
    app.extend.plugin(MahalTest, null);
}