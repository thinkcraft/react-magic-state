export class SetAdapter<T = any> {
    private readonly _target: Set<T>;

    get size() {
        return this._target.size;
    }

    constructor(target: Set<T>) {
        this._target = target;
    }

    add(value: T) {
        this._target.add(value);

        return this;
    }
}