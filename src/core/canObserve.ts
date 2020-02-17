const observableTypes = new WeakMap<Function, boolean>();

export function canObserve(target: any) {
    if (!target) {
        return false;
    }

    const constructor = target?.constructor as Function;

    if (observableTypes.has(constructor)) {
        return observableTypes.get(constructor);
    }

    let result = false;

    if (constructor === Object) {
        result = true;
    }
    else if (constructor === Array) {
        result = true;
    }
    else if (!isBuiltIn(constructor)) {
        result = true;
    }

    observableTypes.set(constructor, result);

    return result;
}

function isBuiltIn(constructor: Function) {
    return (constructor.toString().indexOf("[native code]") >= 0);
}