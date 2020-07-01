import { uuid } from "../../../Types/uuid";
import { FixedUIntMap } from "../../../Types/FixedUIntSet";
import { FixedUInt } from "../../../Types/FixedUInt";

export interface Bitset {
    id: uuid;
    name: string;
    bitCount: number;
    values: null | FixedUIntMap<BitsetValueTag>;
}

/** Values as returned by map when iterating the items() */
export type BitsetValue = [FixedUInt, BitsetValueTag];

/** The tag part of the values in the bitset */
export interface BitsetValueTag {
    name: string;
    description?: string;
}