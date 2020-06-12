import { FixedUInt } from "./FixedUInt";
import { Dictionary } from "./Dictionary";

/**
 * If the item has iteratable set of values
 */
export interface HasValues {
    /** The number of bits in the values */
    bitCount: bigint;
    /** All values in the bit set */
    values(): Iterable<FixedUInt>;
}

/**
 * Gets the carasian product of al the concatted sets with values
 * @param sets 
 */
export function* cartasianProduct(sets: ReadonlyArray<HasValues>): Generator<FixedUInt> {
    if (sets.length === 0)
        return;

    const first: HasValues = sets[0];
    const rest = sets.slice(1);

    for (const value of first.values()) {
        if (rest.length > 0)
            for (const childValue of cartasianProduct(rest))
                yield value.concat(childValue);
        else
            yield value;
    }
}

/**
 * Intersects fixed size integer sets, where all integers must be same length
 * @param set1 The first set (the larger set, preferably for speed and mem usage)
 * @param set2 The smaller set (the smaller set, preferably for speed and mem usage)
 */
export function* intersect(set1: Iterable<FixedUInt>, set2: Iterable<FixedUInt>): Generator<FixedUInt> {

    const seen: Dictionary<FixedUInt> = {};

    // we start at set2, since it's often the small one
    for (const item2 of set2)
        seen[item2.value.toString()] = item2;

    // yield items from set 1, found in set2
    for (const item1 of set1) {
        const key = item1.value.toString();
        if (key in seen)
            yield item1;
    }
}

/**
 * Finds overlaps between two sets of fixed size integer, where the MSB's are used to find the overlap
 * @param set1 The first set
 * @param set2 The second set
 */
export function* overlap(set1: Iterable<FixedUInt>, set2: Iterable<FixedUInt>): Generator<FixedUInt>
{
    const seen: Dictionary<FixedUInt> = {};
    throw new Error("Not Implemented");
}