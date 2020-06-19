import { Action } from "easy-peasy";

export interface ArchitectureStoreModel {
    name: string;
    setName: Action<ArchitectureStoreModel, string>;

    bitCount: number;
    setBitCount: Action<ArchitectureStoreModel, number>;
}
