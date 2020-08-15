import { useState } from "react";

export function useMapState<K, V>(
    defaultState: Map<K, V> | (() => Map<K, V>),
): [Map<K, V>, (newMap: Map<K, V>) => void, (key: K, value: V) => void] {
    const [stateMap, setStateMap] = useState(defaultState);

    function setSingleEntry(key: K, value: V) {
        const newMap = new Map(stateMap);
        newMap.set(key, value);
        setStateMap(newMap);
    }

    return [stateMap, setStateMap, setSingleEntry];
}

export function useUniqueArrayState<T>(defaultState: T[]): [
    T[],
    {
        remove: (item: T) => void;
        removeAt: (index: number) => void;
        add: (item: T) => void;
        set: (newState: T[]) => void;
    },
] {
    const [arr, setArr] = useState(defaultState);

    function arrayWithoutIndex(array: T[], index: number) {
        return array.slice(0, index).concat(array.slice(index + 1));
    }

    return [
        arr,
        {
            remove(item) {
                setArr((prevArr) => {
                    if (!prevArr.includes(item)) return prevArr;

                    const itemIndex = prevArr.findIndex((x) => x == item);

                    return arrayWithoutIndex(prevArr, itemIndex);
                });
            },
            removeAt(index) {
                setArr((prevArr) => arrayWithoutIndex(prevArr, index));
            },
            add(item) {
                setArr((prevArr) => (prevArr.includes(item) ? prevArr : prevArr.concat(item)));
            },
            set: setArr
        },
    ];
}
