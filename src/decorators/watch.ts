import { Component, EventBus, replaceNullProp } from "mahal";

// tslint:disable-next-line
export const Watch = (propName: string): MethodDecorator => {
    return ((target: Component, methodName: string, descriptor: PropertyDescriptor) => {
        replaceNullProp(target, '__watchBus__', new EventBus());
        target.watch(propName, descriptor.value);
    });
};