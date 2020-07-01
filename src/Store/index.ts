import { createStore, createTypedHooks, createTransform, persist } from "easy-peasy";

import { architectureStore } from "./Architecture";
import { bitsetsStore, deserializeBitsetsState } from "./Bitsets";
import { instructionsStore, deserializeInstructionState } from "./Instructions";
import { StoreModel } from "./StoreModel";

export * from "./Architecture";
export * from "./Instructions";
export * from "./StoreModel"

const rootStore: StoreModel = {
    architecture: architectureStore,
    bitsets: bitsetsStore,
    instructions: instructionsStore,
}

const transformer = createTransform(
    (data, key) => {
        return data;
    },
    (data, key) => {
        switch(key) {
            case "bitsets":
                data = deserializeBitsetsState(data);
                break;
            case "instructions":
                data = deserializeInstructionState(data);
                break;
        }
        return data;
    }
);

export const store = createStore(persist(rootStore, {
    storage: "localStorage",
    transformers: [
        transformer,
    ]
}));

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
