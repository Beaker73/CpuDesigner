import { v4 } from "uuid";
import { HasValues } from "../../../Types/HasValues";
import { FixedUInt } from "../../../Types/FixedUInt";
import { InstructionsStoreModel } from "../StoreModel";

export type uuid = string;

export interface Instruction {
    id: uuid;
    bitSets: HasValues[];
    mnemonic: string;
    description: string;

    readonly bitCount: bigint,
}

export function newInstruction(): Instruction {

    var instr: Omit<Instruction, "bitCount"> = {
        id: v4(),
        bitSets: [],
        mnemonic: "",
        description: ""
    };

    Object.defineProperty(instr, "bitCount", {
        get: function() {
            return instr.bitSets.reduce((b, s) => b + s.bitCount, 0n);
        }
    });

    return instr as Instruction;
}