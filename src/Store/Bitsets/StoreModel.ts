import { Action, Thunk, Computed } from "easy-peasy";

import { Bitset } from "./Models/Bitset";
import { Dictionary } from "../../Types/Dictionary";
import { uuid } from "../../Types/uuid";
import { StoreModel } from "..";

type NewBitsetPayload = { id: uuid }

export interface BitsetsStoreModel {
    /** Dicitonary of all the stored bitsets */
    bitSetsById: Dictionary<Bitset>;
    
    /** Gets the bitset with the provided id */
    getBitsetById: Computed<BitsetsStoreModel, (id: uuid) => Bitset | undefined>;
    /** Gets the bitset with the provided name */
    getBitsetByName: Computed<BitsetsStoreModel, (name: string) => Bitset | undefined>;
    /** Adds a the bitset */
    addBitset: Action<BitsetsStoreModel, Bitset>;
    /** Creates a new bitset */
    newBitset: Thunk<BitsetsStoreModel, NewBitsetPayload, void, StoreModel, Bitset>;
}

