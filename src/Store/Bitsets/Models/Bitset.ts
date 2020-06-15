import { uuid } from "../../../Types/uuid";
import { Dictionary } from "../../../Types/Dictionary";

export interface Bitset {
    id: uuid;
    name: string;
    bitCount: number;
    values: Dictionary<string>
}
