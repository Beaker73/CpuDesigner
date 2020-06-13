import React, { useState } from "react";

import { bladeContext } from "./BladeContext";
import { BladeList } from "./BladeList";

export interface BladeHostProps extends React.HTMLAttributes<HTMLDivElement> {
    root: React.FunctionComponent;
}

/**
 * Blade host provides the context for the blades
 * It also host the BladeList that physicly shows the blades
 */
export function BladeHost(props: BladeHostProps): JSX.Element {

    const [blades, setBlades] = useState<React.FunctionComponent[]>([props.root]);

    const bladeInstances = blades.map((bladeType, i) => {
        const blade = React.createElement(bladeType);
        return <bladeContext.Provider value={{ openBlade, bladeId: i }}>
            {blade}
        </bladeContext.Provider>
    });

    return <bladeContext.Provider value={{ openBlade }}>
        <BladeList {...props}>
            {bladeInstances}
        </BladeList>
    </bladeContext.Provider >;

    function openBlade(afterBlade: number, blade: React.FunctionComponent) {
        setBlades(b => [...b.slice(0, afterBlade + 1), blade]);
    }
}
