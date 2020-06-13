import React, { useMemo } from "react";
import { StoreProvider } from "easy-peasy";
import { Fabric, mergeStyleSets, getTheme } from "@fluentui/react";

// store
import { store } from "../Store";

// components
import { BladeHost } from "./Blades/Host";
import { ArchitectureBlade } from "./Blades/ArchitectureBlade";

export function Shell(): JSX.Element {

    const theme = getTheme();
    const style = useMemo(useStyle, [theme]);

    return <Fabric className={style.root}>
        <StoreProvider store={store}>
            <BladeHost className={style.root} root={ArchitectureBlade} />
        </StoreProvider>
    </Fabric>;


    function useStyle() {
        return mergeStyleSets({
            root: {
                position: "fixed",
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
                border: 0,
                padding: 0,
                backgroundColor: theme.semanticColors.bodyFrameBackground,
            }
        });
    }
}