import { uuid, newUuid } from "../../../Types/uuid";
import { FixedUIntSet } from "../../../Types/FixedUIntSet";

export interface Bitset {
    id: uuid;
    bitCount: bigint;
    name: string;
    sets: FixedUIntSet<string>;
}

export function newBitset(bitCount: bigint, name?: string): Bitset {
    return {
        id: newUuid(),
        name: name ?? "",
        bitCount,
        sets: new FixedUIntSet<string>(bitCount),
    };
}