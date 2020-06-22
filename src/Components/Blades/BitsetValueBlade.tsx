import React from "react";

import { Blade } from "./Host";
import { uuid } from "../../Types/uuid";
import { FixedUInt } from "../../Types/FixedUInt";
import { useStoreState, useStoreActions } from "../../Store";
import { Field } from "../Field";
import { TextField } from "@fluentui/react";
import { Bitset } from "../../Store/Bitsets/Models/Bitset";

export interface BitsetValueBladeProps {
    bitsetId: uuid;
    value: FixedUInt;
}

export function BitsetValueBlade(props: BitsetValueBladeProps): JSX.Element {

    const [bitset, value, tag] = useStoreState(store => {
        const bs: Bitset = store.bitsets.bitSetsById[props.bitsetId];
        const t = bs.values?.get(props.value) ?? [props.value, { name: props.value.toString() }];
        return [bs, ...t];
    });

    const { setValueTag } = useStoreActions(store => store.bitsets);

    return <Blade title={`${value.value.toString(2)}: ${tag.name}`}>
        <Field label="Value">
            {value.value.toString(2)}
        </Field>
        <Field label="Name" subLabel="of the Value">
            <TextField value={tag.name} onChange={updateName} />
        </Field>
        <Field label="Description" subLabel="for the value">
            <TextField multiline={true} rows={5} value={tag.description ?? ""} onChange={updateDescription} />
        </Field>
    </Blade>;

    function updateName<T>(e: React.FormEvent<T>, newName?: string) {
        setValueTag({
            id: bitset.id, value, tag: {
                name: newName ?? "",
                description: tag.description || undefined
            }
        });
    }
    function updateDescription<T>(e: React.FormEvent<T>, newDescription?: string) {
        setValueTag({
            id: bitset.id, value, tag: {
                name: tag.name ?? "",
                description: newDescription || undefined
            }
        });
    }
}