import { useState } from "react";

export function useMapState<K, V>(defaultState: Map<K, V> | (() => Map<K, V>)) {
    const [stateMap, setStateMap] = useState(defaultState);

    function setSingleEntry(key: K, value: V) {
        const newMap = new Map(stateMap);
        newMap.set(key, value);
        setStateMap(newMap);
    }

    return [stateMap, setStateMap, setSingleEntry] as const;
}

export function useUniqueArrayState<T>(defaultState: T[]) {
    const [arr, setArr] = useState(defaultState);

    function arrayWithoutIndex(array: T[], index: number) {
        return array.slice(0, index).concat(array.slice(index + 1));
    }

    return [
        arr,
        {
            remove(item: T) {
                setArr(prevArr => {
                    if (!prevArr.includes(item)) return prevArr;

                    const itemIndex = prevArr.findIndex(x => x == item);

                    return arrayWithoutIndex(prevArr, itemIndex);
                });
            },
            removeAt(index: number) {
                setArr(prevArr => arrayWithoutIndex(prevArr, index));
            },
            add(item: T) {
                setArr(prevArr => (prevArr.includes(item) ? prevArr : prevArr.concat(item)));
            },
            set: setArr,
        },
    ] as const;
}
