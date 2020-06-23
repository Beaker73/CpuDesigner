import * as React from "react";
import { DetailsList, IColumn, ICommandBarItemProps, SelectionMode } from "@fluentui/react";

import { OpcodeBlade } from "./OpcodeBlade";
import { Blade, useBlade } from "./Host";
import { newUuid } from "../../Types";
import { useStoreActions, useStoreState, Instruction } from "../../Store";

export function OpcodesListBlade(): JSX.Element {

    const blade = useBlade();
    const newInstruction = useStoreActions(store => store.instructions.newInstruction);
    const instructions = useStoreState(store => store.instructions.all);

    const buttons: ICommandBarItemProps[] = [
        { key: "add", name: "Add", iconProps: { iconName: "Add" }, onClick: addOpcode },
    ];

    const columns: IColumn[] = [
        { key: "name", name: "Name", fieldName: "mnemonic", minWidth: 150, isRowHeader: true },
        { key: "fill", name: "Fill", minWidth: 50 },
    ];

    const items: any[] = Object.values(instructions);

    return <Blade title="Opcodes" buttons={buttons}>
        <DetailsList columns={columns} items={items} selectionMode={SelectionMode.none} onActiveItemChanged={editItem} />
    </Blade>;

    function addOpcode(): void {
        const id = newUuid();
        newInstruction({id});
        blade.openBlade(OpcodeBlade, { id });
    }

    function editItem(item: Instruction): void {
        blade.openBlade(OpcodeBlade, {id: item.id});
    }
}