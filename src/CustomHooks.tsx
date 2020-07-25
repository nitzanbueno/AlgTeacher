import {useState} from "react";

export function useMapState<K, V>(defaultState: Map<K, V> | (() => Map<K, V>)): [Map<K, V>, (newMap: Map<K, V>) => void, (key: K, value: V) => void] {
    const [stateMap, setStateMap] = useState(defaultState);

    function setSingleEntry(key: K, value: V) {
        const newMap = new Map(stateMap);
        newMap.set(key, value);
        setStateMap(newMap);
    }

    return [stateMap, setStateMap, setSingleEntry];
}
