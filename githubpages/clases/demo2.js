import { Demo1 } from "./demo1.js";

export class DemoList {

    constructor() {
        this.list = [];
    }

    agregar(name, value) {
        this.list.push(new Demo1(name, value));
    }
}