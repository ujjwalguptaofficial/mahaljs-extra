import { Component, replaceNullProp } from "mahal";

// tslint:disable-next-line
export const Watch = (propName: string): MethodDecorator => {
    return ((target: Component, methodName: string, descriptor: PropertyDescriptor) => {
        const obj = {};
        replaceNullProp(target, '__watchers__', () => obj);
        const watchers: { [key: string]: Map<Function, boolean> } = target['__watchers__'];
        let savedWatcher = watchers[propName];
        if (!savedWatcher) {
            savedWatcher = watchers[propName] = new Map();
        }
        savedWatcher.set(descriptor.value, true);
    });
};