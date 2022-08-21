import { Component, replaceNullProp } from "mahal";

// tslint:disable-next-line
export const On = (propName: string): MethodDecorator => {
    return ((target: Component, methodName: string, descriptor: PropertyDescriptor) => {
        replaceNullProp(target, '__events__', () => new Map());
        target['__events__'].set(propName, descriptor.value);
    });
};