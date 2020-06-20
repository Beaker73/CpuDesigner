import { Action, Thunk, Computed } from "easy-peasy";

import { Bitset } from "./Models/Bitset";
import { Dictionary } from "../../Types/Dictionary";
import { uuid } from "../../Types/uuid";
import { StoreModel } from "..";

type NewBitsetPayload = { id: uuid }

export interface BitsetsStoreModel {
    /** Dictionary of all the stored bitsets */
    bitSetsById: Dictionary<Bitset>;
    /** Set name on bitset */
    setName: Action<BitsetsStoreModel, { id: uuid, name: string }>;
    /** Set bitcount on bitset */
    setBitCount: Action<BitsetsStoreModel, { id: uuid, bitCount: number }>;

    /** Gets the bitset with the provided id */
    getBitsetById: Computed<BitsetsStoreModel, (id: uuid) => Bitset | undefined>;
    /** Adds a the bitset */
    addBitset: Action<BitsetsStoreModel, Bitset>;
    /** Creates a new bitset */
    newBitset: Thunk<BitsetsStoreModel, NewBitsetPayload, void, StoreModel, Bitset>;
}

