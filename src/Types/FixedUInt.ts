import { HasValues } from "./HasValues";

/**
 * Fixed lenght unsigned integer, upto 16384 bits long
 */
export class FixedUInt implements HasValues {

    /** The maximum of bits handled by FixedUInt */
    public static maxBitCount: bigint = 16364n;

    /** The number of bits in the fixed size unsigned integer */
    public readonly bitCount: bigint;
    /** The value of the fixed size unsigned integer */
    public readonly value: bigint;

    /**
     * Constructs a new fixed size unsigned integer
     * @param bitCount The number of bits the integer is long
     * @param value The value of the fixed size integer
     */
    constructor(bitCount: bigint, value: bigint) {
        if (bitCount < 1 || bitCount > FixedUInt.maxBitCount)
            throw new Error(`number of bits (${bitCount}) out of range (1-${FixedUInt.maxBitCount})`);

        this.bitCount = bitCount;
        this.value = value;

        if (this.value < 0 || this.value > this.maxValue)
            throw new Error(`value (${value}) out of range (0-${this.maxValue}), based on number of bits (${this.bitCount})`);
    }

    /** The maximum value based on the number of bits */
    public get maxValue(): bigint {
        return (1n << this.bitCount) - 1n;
    }

    /**
     * Get value of specific bit
     * @param index The index of the bit to get (where 0 is lsb)
     */
    public getBit(index: bigint): boolean {
        if (index < 0 || index >= this.bitCount)
            throw new Error(`index (${index}) out of range (0-${this.bitCount - 1n})`);
        return (this.value & (1n << index)) !== 0n;
    }

    /**
     * Concats another fixed integer to this fixed integer
     * @param other The value to concat
     * @returns The fixed integer with the combined value
     */
    public concat(other: FixedUInt): FixedUInt {
        return new FixedUInt(
            this.bitCount + other.bitCount,
            (this.value << other.bitCount) | other.value
        );
    }

    /** The list of values */
    *values(): Generator<FixedUInt> {
        yield this;
    }

    /** Output the fixed integer */
    public toString(): string {
        let bitString = this.value.toString(2);
        const missing = Number(this.bitCount - BigInt(bitString.length));
        bitString = "0".repeat(missing) + bitString;
        return `${this.bitCount}'b${bitString}`;
    }

    /**
     * Checks if the equally sized bit ranges fully match
     * @param other The fixed integer to compare against
     */
    public equals(other: FixedUInt): boolean {
        // different length is false by default
        if (this.bitCount !== other.bitCount)
            return false;
        // same length, now values must match
        return this.value === other.value;
    }

    /**
     * Check if the MSB's of the longest value all match with the full value of the shortest
     * @param other The value to compare against.
     */
    public msbEquals(other: FixedUInt): boolean {
        const [long, short] = this.bitCount > other.bitCount ? [this, other] : [other, this];

        // take msb part of longest. Then compare if both equal.
        const shiftCount = long.bitCount - short.bitCount;
        const longMsbValue = long.value >> shiftCount;

        return longMsbValue === short.value;
    }

}

/**
 * Generate multiple fixed integers of the same size, for a sequence of bigints
 * @param bitCount the bit count for the generated fixed size integers
 * @param values the dequence of values to convert
 */
export function* toFixedUInt(bitCount: bigint, values: Iterable<bigint>): Generator<FixedUInt> {
    for (const v of values)
        yield new FixedUInt(bitCount, v);
}