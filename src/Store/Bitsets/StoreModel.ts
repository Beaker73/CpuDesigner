import { Action, Thunk } from "easy-peasy";

import { Bitset } from "./Models/Bitset";
import { Dictionary } from "../../Types/Dictionary";

type NewBitsetPayload = { bitCount: bigint, name: string }

export interface BitsetsStoreModel {
    bitSetsById: Dictionary<Bitset>;
    newBitset: Action<BitsetsStoreModel, NewBitsetPayload>;
}