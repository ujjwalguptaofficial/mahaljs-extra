import { Component, replaceNullProp } from "mahal";

// tslint:disable-next-line
export const watch = (propName: string): MethodDecorator => {
    return ((target: Component, methodName: string, descriptor: PropertyDescriptor) => {
        const obj = {};
        replaceNullProp(target, '_watchers_', () => obj);
        const watchers: { [key: string]: Map<Function, boolean> } = target['_watchers_'];
        let savedWatcher = watchers[propName];
        if (!savedWatcher) {
            savedWatcher = watchers[propName] = new Map();
        }
        savedWatcher.set(descriptor.value, true);
    });
};