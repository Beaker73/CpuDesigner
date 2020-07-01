import { FixedUInt, maxValueForBitCount, toBase36, fromBase36 } from "./FixedUInt";
import { Dictionary } from "../Types/Dictionary";

export class FixedUIntMap<T> {
    private readonly _bitCount: number;
    private readonly _map: Map<bigint, T> = new Map<bigint, T>();

    /**
     * Construct a map for fixed size values 
     * @param bitCount The number of bits of the values in the map
     */
    constructor(bitCount: number, items?: Iterable<[bigint, T]>) {
        if (bitCount < 1 || bitCount > FixedUInt.maxBitCount)
            throw new Error(`bitCount out of range (1-${FixedUInt.maxBitCount})`);
        this._bitCount = bitCount;

        if (items) {
            const maxValue = maxValueForBitCount(bitCount);
            for (const item of items) {
                if (item[0] > maxValue)
                    throw new Error(`value (${item}) out of range (${maxValue})`);
                this._map.set(item[0], item[1]);
            }
        }
    }

    public has(value: FixedUInt | bigint) {
        if (value instanceof FixedUInt) {
            if (value.bitCount > this._bitCount)
                throw new Error(`bitCount $(value.bitCount) of value out of range ($this._bitCount)`);
            value = value.value;
        }
        const maxValue = maxValueForBitCount(this._bitCount);
        if (value > maxValue)
            throw new Error(`value (${value}) out of range (${maxValue})`);
        return this._map.has(value);
    }

    /** Add the value to the map */
    public add(value: FixedUInt | bigint, tag: T) {
        if (value instanceof FixedUInt) {
            if (value.bitCount > this._bitCount)
                throw new Error(`bitCount $(value.bitCount) of value out of range ($this._bitCount)`);
            value = value.value;
        }
        const maxValue = maxValueForBitCount(this._bitCount);
        if (value > maxValue)
            throw new Error(`value (${value}) out of range (${maxValue})`);
        this._map.set(value, tag);
    }
    public update(value: FixedUInt | bigint, tag: T) {
        if (value instanceof FixedUInt) {
            if (value.bitCount > this._bitCount)
                throw new Error(`bitCount $(value.bitCount) of value out of range ($this._bitCount)`);
            value = value.value;
        }
        const maxValue = maxValueForBitCount(this._bitCount);
        if (value > maxValue)
            throw new Error(`value (${value}) out of range (${maxValue})`);
        if (!this._map.has(value))
            throw new Error("No value ${value} found in map");
        this._map.set(value, tag);
    }
    public delete(value: FixedUInt | bigint): void {
        if (value instanceof FixedUInt) {
            if (value.bitCount > this._bitCount)
                throw new Error(`bitCount $(value.bitCount) of value out of range ($this._bitCount)`);
            value = value.value;
        }
        const maxValue = maxValueForBitCount(this._bitCount);
        if (value > maxValue)
            throw new Error(`value (${value}) out of range (${maxValue})`);
        this._map.delete(value);
    }

    /** Gets the value at the specified index */
    public get(index: bigint | FixedUInt): [FixedUInt, T] | undefined {
        if (index instanceof FixedUInt) {
            if (index.bitCount > this._bitCount)
                throw new Error(`bitCount $(index.bitCount) of index out of range ($this._bitCount)`);
            index = index.value;
        }
        const maxValue = maxValueForBitCount(this._bitCount);
        if (index > maxValue)
            throw new Error(`index (${index}) out of range (${maxValue})`);
        const tag = this._map.get(index)
        if (tag)
            return [new FixedUInt(this._bitCount, index), tag];
        return void 0;
    }

    /** Number of bits of the numbers in the set */
    public get bitCount(): number { return this._bitCount; }
    /** Count of numbers in the set */
    public get size(): number { return this._map.size; }

    public clone(): FixedUIntMap<T> {
        return new FixedUIntMap<T>(this.bitCount, this.nakedItems());
    }

    *[Symbol.iterator](): Generator<FixedUInt> {
        return this.values();
    }

    /** Iterator on the value and their tags */
    public *items(): Generator<[FixedUInt, T]> {
        const bitCount = this._bitCount;
        for (const item of this._map) {
            yield [new FixedUInt(bitCount, item[0]), item[1]];
        }
    }

    private *nakedItems(): Generator<[bigint, T]> {
        for (const item of this._map) {
            yield item;
        }
    }

    /** Iterator on the values in the set */
    public *values(): Generator<FixedUInt> {
        const bitCount = this._bitCount;
        for (const item of this._map.keys()) {
            yield new FixedUInt(bitCount, item);
        }
    }

    /** Iterator on the naked values in the set */
    public *nakedValues(): Generator<bigint> {
        for (const item of this._map.keys()) {
            yield item;
        }
    }


    public static parseDictionary<T>(bitCount: number, dict: Dictionary<T>): FixedUIntMap<T> {
        return new FixedUIntMap<T>(
            bitCount,
            Object.entries(dict).map(([k, v]) => [fromBase36(k), v]));
    }

    public toJSON(): { bitCount: number, values: Dictionary<T> } {
        return {
            bitCount: this._bitCount,
            values: Object.fromEntries(this.jsonEntries())
        }
    }
    private *jsonEntries(): Generator<[string, T]> {
        for (const item of this._map) {
            yield [toBase36(item[0]), item[1]];
        }
    }

}

/**
 * A set of FixedUInt's
 */
export class FixedUIntSet {
    private readonly _bitCount: number;
    private readonly _set: Set<bigint> = new Set<bigint>();

    /**
     * Construct a set for fixed size values 
     * @param bitCount The number of bits of the values in the set
     */
    constructor(bitCount: number, items?: Iterable<bigint>) {
        if (bitCount < 1 || bitCount > FixedUInt.maxBitCount)
            throw new Error(`bitCount out of range (1-${FixedUInt.maxBitCount})`);
        this._bitCount = bitCount;

        if (items) {
            const maxValue = maxValueForBitCount(bitCount);
            for (const item of items) {
                if (item > maxValue)
                    throw new Error(`value (${item}) out of range (${maxValue})`);
                this._set.add(item);
            }
        }
    }

    /** Add the value to the set */
    public add(value: FixedUInt | bigint) {
        if (value instanceof FixedUInt) {
            if (value.bitCount > this._bitCount)
                throw new Error(`bitCount $(value.bitCount) of value out of range ($this._bitCount)`);
            value = value.value;
        }
        const maxValue = maxValueForBitCount(this._bitCount);
        if (value > maxValue)
            throw new Error(`value (${value}) out of range (${maxValue})`);
        this.add(value);
    }

    /** Gets the value at the specified index */
    public get(index: bigint): FixedUInt | undefined {
        const tag = this._set.has(index)
        if (tag)
            return new FixedUInt(this._bitCount, index);
        return void 0;
    }

    /** Number of bits of the numbers in the set */
    public get bitCount(): number { return this._bitCount; }
    /** Count of numbers in the set */
    public get size(): number { return this._set.size; }

    *[Symbol.iterator](): Generator<FixedUInt> {
        return this.values();
    }

    /** Iterator on the values in the set */
    *values(): Generator<FixedUInt> {
        const bitCount = this._bitCount;
        for (const item of this._set) {
            yield new FixedUInt(bitCount, item);
        }
    }

    /** Iterator on the naked values in the set */
    *nakedValues(): Generator<bigint> {
        for (const value of this._set)
            yield value;
    }
}

