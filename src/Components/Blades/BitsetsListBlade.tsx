import * as React from "react";
import { DetailsList, IColumn } from "@fluentui/react";

import { Blade } from "./Host";

export function BitsetsListBlade(): JSX.Element {

    const columns: IColumn[] = [
        { key: "name", name: "Name", fieldName: "name", minWidth: 200, isRowHeader: true },
    ];

    const items: any[] = [];

    return <Blade size={4} title="Bitsets">
        <DetailsList columns={columns} items={items} />
    </Blade>;
}