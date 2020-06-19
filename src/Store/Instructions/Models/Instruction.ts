import { HasValues } from "../../../Types/HasValues";
import { uuid, newUuid } from "../../../Types/uuid";

export interface Instruction {
    id: uuid;
    bitSets: HasValues[];
    mnemonic: string;
    description: string;

    readonly bitCount: number,
}

export function newInstruction(): Instruction {

    var instr: Omit<Instruction, "bitCount"> = {
        id: newUuid(),
        bitSets: [],
        mnemonic: "",
        description: ""
    };

    Object.defineProperty(instr, "bitCount", {
        get: function() {
            return instr.bitSets.reduce((b, s) => b + s.bitCount, 0);
        }
    });

    return instr as Instruction;
}