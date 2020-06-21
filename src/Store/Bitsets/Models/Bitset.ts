import { uuid } from "../../../Types/uuid";
import { Dictionary } from "../../../Types/Dictionary";
import { FixedUIntMap } from "../../../Types/FixedUIntSet";

export interface Bitset {
    id: uuid;
    name: string;
    bitCount: number;
    values: null | FixedUIntMap<string>;
}
