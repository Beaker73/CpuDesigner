import * as React from "react";
import { StoreProvider } from "easy-peasy";
import { Fabric } from "@fluentui/react";

// store
import { store } from "../Store";

// components
import { InstructionList } from "./InstructionList";

export function Shell(): JSX.Element {

    return <Fabric>
        <StoreProvider store={store}>
            <InstructionList />
        </StoreProvider>
    </Fabric>
}