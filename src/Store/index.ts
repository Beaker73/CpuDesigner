import { createStore, createTypedHooks, createTransform, persist } from "easy-peasy";

import { architectureStore } from "./Architecture";
import { bitsetsStore } from "./Bitsets";
import { instructionsStore } from "./Instructions";
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
        switch(key) {
            case "configuration":
                return {...data};
        }
        console.log({ data, key });
        return data;
    }
);

export const store = createStore(persist(rootStore, {
    storage: "localStorage",
    transformers: [
        transformer,
    ],
}));

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
