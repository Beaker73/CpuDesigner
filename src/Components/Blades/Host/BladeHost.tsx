import React, { useState, useRef, useEffect, PropsWithChildren } from "react";

import { bladeContext } from "./BladeContext";
import { BladeList } from "./BladeList";

export interface BladeHostProps extends React.HTMLAttributes<HTMLDivElement> {
    root: DefineBladeProps;
}

export interface DefineBladeProps {
    bladeType: React.FunctionComponent,
    bladeProps: {}
};

/**
 * Blade host provides the context for the blades
 * It also host the BladeList that physicly shows the blades
 */
export function BladeHost(props: BladeHostProps): JSX.Element {

    const [blades, setBlades] = useState<DefineBladeProps[]>([props.root]);

    const bladeInstances = blades.map((blade, i) => {
        const BladeType = blade.bladeType;
        return <bladeContext.Provider value={{ openBlade, closeBlade, bladeId: i }}>
            <BladeType key={blade.bladeType.name + ":" + JSON.stringify(blade.bladeProps)} {...blade.bladeProps} />
        </bladeContext.Provider>

    });

    return <bladeContext.Provider value={{ openBlade }}>
        <BladeList {...props}>
            {bladeInstances}
        </BladeList>
    </bladeContext.Provider >;

    function openBlade(afterBladeId: number, blade: DefineBladeProps) {
        setBlades(b => [...b.slice(0, afterBladeId + 1), blade]);
    }

    function closeBlade(bladeId: number) {
        setBlades(b => b.slice(0, bladeId));
    }
}
