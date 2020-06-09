import { v4 } from "uuid";

export type uuid = string;

export interface Instruction {
    id: uuid;   
}

export function newInstruction(): Instruction {
    return {
        id: v4(),
    };
}