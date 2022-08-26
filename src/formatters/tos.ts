export const toString = (value) => {
    switch (typeof value) {
        case 'string':
            return value;
        case 'number':
            return (value as number).toString();
        default:
            return JSON.stringify(value);
    }
}