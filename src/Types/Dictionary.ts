import { stringSorter } from "./String";

export type Dictionary<T> = { [key: string]: T };

/**
 * Converts a dictionary to an array, sorted by key
 * @param dict The dictionary to convert
 * @returns An array with all values of the dictionary sorted by key
 */
export function dictToArray<T>(dict: Dictionary<T>): T[] {
    return Object
        .entries(dict)
        .sort((a, b) => stringSorter(a[0], b[0]))
        .map(([k, v]) => v);
}