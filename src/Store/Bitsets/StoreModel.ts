import { Action, Thunk, Computed } from "easy-peasy";

import { Bitset } from "./Models/Bitset";
import { Dictionary } from "../../Types/Dictionary";
import { uuid } from "../../Types/uuid";

type NewBitsetPayload = { bitCount: bigint, name: string }

export interface BitsetsStoreModel {
    bitSetsById: Dictionary<Bitset>;
    getBitsById: Computed<BitsetsStoreModel, (id: uuid) => Bitset>;
    newBitset: Action<BitsetsStoreModel, NewBitsetPayload>;
}