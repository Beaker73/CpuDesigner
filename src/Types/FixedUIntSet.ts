import { FixedUInt } from "./FixedUInt";
import { Dictionary } from "./Dictionary";


type Item<T = void> = T extends void ? FixedUInt : [FixedUInt, T];
type InputItem<T = void> = T extends void ? (FixedUInt | bigint) : [(FixedUInt | bigint), T];

/**
 * A sparse set of FixedUInt's, optionaly tagged with extra data
 */
export class FixedUIntSet<T = void>
{
    private _count: bigint = 0n;
    private set: Dictionary<Item<T>> = {};

    /**
     * Construct a set for fixed size values 
     * @param bitCount The number of bits of the values in the set
     */
    constructor(bitCount: bigint, items?: Iterable<InputItem<T>>) {
        if (bitCount < 1 || bitCount > FixedUInt.maxBitCount)
            throw new Error(`bitCount out of range (1-${FixedUInt.maxBitCount})`);
        this.bitCount = bitCount;

        if (items) {
            for (const item of items) {
                if (isTagged(item) && typeof item[0] === "bigint")
                    this.addVal(item[0], item[1]);
                else if (isValue(item) && typeof item === "bigint")
                    this.addVal(item as bigint, void 0 as unknown as T);
                else
                    this.add(item as Item<T>);
            }
        }
    }

    /** Add the value to the set */
    public addVal(value: bigint, tag: T) {
        const fixed = new FixedUInt(this.bitCount, value);
        if (tag)
            this.add([fixed, tag] as Item<T>);
        else
            this.add(fixed as Item<T>);
    }

    /** Gets the value at the specified index */
    public get(index: bigint): Item<T> | undefined {
        const key = index.toString();
        return this.set[key];
    }

    /** Add the item to the set */
    public add(value: Item<T>) {
        if (isTagged(value)) {
            if (value[0].bitCount !== this.bitCount)
                throw new Error(`The bit count of ${value} does not match expected ${this.bitCount}`);
            const key = value[0].value.toString();
            if (!(key in this.set))
                this._count++;
            this.set[key] = value;
        } else if (isValue(value)) {
            if (value.bitCount != this.bitCount)
                throw new Error(`The bit count of ${value} does not match expected ${this.bitCount}`);
            const key = value.value.toString();
            if (!(key in this.set))
                this._count++;
            this.set[key] = value;
        }
    }

    /** Number of bits of the numbers in the set */
    public readonly bitCount: bigint;
    /** Count of numbers in the set */
    public get count(): bigint { return this._count; }

    *[Symbol.iterator](): Generator<Item<T>> {
        return this.items();
    }

    public toJSON(): any {

        const json: any = {
            bitCount: this.bitCount.toString(),
            taggedValues: {},
            values: [],
        };

        for( const item of this.items() ) {
            if(isTagged(item))
                json.taggedValues[item[0].toString()] = item[1];
            else if(isValue(item))
                json.values.push(item.toString());
        }

        return json;
    }

    /** Iterator on the values in the set */
    *values(): Generator<FixedUInt> {
        for (const item of this.items()) {
            if (isTagged(item))
                yield item[0];
            else if (isValue(item))
                yield item;
        }
    }

    /** Iterator on the items in the set */
    *items(): Generator<Item<T>> {
        for (const key in this.set)
            yield this.set[key];
    }
}

/** Test if the item is a tagged value */
function isTagged<T, I extends FixedUInt | bigint>(value: I | [I, T]): value is [I, T] {
    return Array.isArray(value) && value.length == 2;
}

/** Test if the item is a pure value */
function isValue<T, I extends FixedUInt | bigint>(value: I | [I, T]): value is I {
    return !Array.isArray(value) && (value instanceof FixedUInt || typeof value === "bigint");
}

