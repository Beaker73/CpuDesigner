import { Action, Thunk, Computed } from "easy-peasy";

import { Bitset } from "./Models/Bitset";
import { Dictionary } from "../../Types/Dictionary";
import { uuid } from "../../Types/uuid";
import { StoreModel } from "..";
import { FixedUIntMap } from "../../Types/FixedUIntSet";

type NewBitsetPayload = { id: uuid }

export interface BitsetsStoreState {
    /** Dictionary of all the stored bitsets */
    bitSetsById: Dictionary<Bitset>;
}

export interface BitsetsStoreModel extends BitsetsStoreState {
    /** Set name on bitset */
    setName: Action<BitsetsStoreModel, { id: uuid, name: string }>;
    /** Set bitcount on bitset */
    setBitCount: Action<BitsetsStoreModel, { id: uuid, bitCount: number }>;

    /** Gets the bitset with the provided id */
    getBitsetById: Computed<BitsetsStoreModel, (id: uuid) => Bitset | undefined>;
    /** Adds a the bitset */
    addBitset: Action<BitsetsStoreModel, Bitset>;
    /** Deletes the bitset wit i */
    deleteBitset: Action<BitsetsStoreModel, {id: uuid}>;
    /** Creates a new bitset */
    newBitset: Thunk<BitsetsStoreModel, NewBitsetPayload, void, StoreModel, Bitset>;
    /** Generate a full set of entries for the bitset */
    generateSet: Action<BitsetsStoreModel, { id: uuid }>
}

export function deserializeBitsetsState(state: BitsetsStoreState): BitsetsStoreState {
    return {
        bitSetsById: Object.fromEntries(Object
            .entries(state.bitSetsById)
            .map(([k,v]) => ([k, ({
                ...v,
                values: !v.values 
                    ? null 
                    : FixedUIntMap.parseDictionary(v.values.bitCount, v.values.values as unknown as Dictionary<string>)
            })]))),
    }
}