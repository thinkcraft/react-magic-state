export function canObserve(target: any) {
    if (target instanceof Object) {
        if (target instanceof Date) {
            return false;
        }

        return true;
    }

    return false;
}