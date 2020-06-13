import * as React from "react";
import { DetailsList, IColumn, ICommandBarItemProps } from "@fluentui/react";

import { Blade } from "./Host";

export function OpcodesListBlade(): JSX.Element {

    const columns: IColumn[] = [
        { key: "name", name: "Name", fieldName: "name", minWidth: 150, isRowHeader: true },
        { key: "bits", name: "Bits", fieldName: "bitCount", minWidth: 50 },
        { key: "values", name: "Values", fieldName: "count", minWidth: 50 },
    ];

    const items: any[] = [];

    const buttons: ICommandBarItemProps[] = [
        { key: "add", name: "Add...", iconProps: { iconName: "Add" }, onClick: addOpcode }, 
    ];

    return <Blade size={4} title="Opcode" buttons={buttons}>
        <DetailsList columns={columns} items={items} />
    </Blade>;

    function addOpcode(): void {
        
    }
}