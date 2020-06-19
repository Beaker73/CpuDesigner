import { ArchitectureStoreModel } from "./StoreModel";
import { action } from "easy-peasy";

export * from "./StoreModel";

export const architectureStore: ArchitectureStoreModel = {
    name: "",
    setName: action((store, value) => void(store.name = value)),
    bitCount: 8,
    setBitCount: action((store, value) => void(store.bitCount = value)),
}