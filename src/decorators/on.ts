import { Component, replaceNullProp, TYPE_ALL_LIFE_CYCLE_EVENT } from "mahal";

// tslint:disable-next-line
function on(propName: TYPE_ALL_LIFE_CYCLE_EVENT): MethodDecorator;
function on(propName: string): MethodDecorator
function on(propName: any): MethodDecorator {
    return ((target: Component, methodName: string, descriptor: PropertyDescriptor) => {
        const obj = {};
        replaceNullProp(target, '__events__', () => obj);
        const watchers: { [key: string]: Map<Function, boolean> } = target['__events__'];
        let savedWatcher = watchers[propName];
        if (!savedWatcher) {
            savedWatcher = watchers[propName] = new Map();
        }
        savedWatcher.set(descriptor.value, true);
    });
}

export const On = on;
