import { HasValues } from "../../../Types/HasValues";
import { uuid, newUuid } from "../../../Types/uuid";

export interface Instruction {
    id: uuid;
    bitSets: HasValues[];
    mnemonic: string;
    description: string;
}
