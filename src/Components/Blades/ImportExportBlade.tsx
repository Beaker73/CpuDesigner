import React, { useMemo, useRef } from "react";
import { saveAs } from "file-saver";
import { DefaultButton, Stack, getTheme, mergeStyleSets } from "@fluentui/react";

import { Blade } from "@beaker73/fluentui-blades";
import { Field } from "../Field";
import { useStoreState } from "../../Store";
import { FileButton } from "../FileButton";

export interface ImportExportBladeProps {
}

export function ImportExportBlade(props: ImportExportBladeProps): JSX.Element {

    const theme = getTheme();
    const state = useStoreState(store => store);

    return <Blade title="Import and Export">
        <Stack tokens={{ childrenGap: theme.spacing.m }}>
            <Field label="Full architecture">
                <Stack horizontal tokens={{ childrenGap: theme.spacing.m }}>
                    <FileButton mimeType="application/json" onClick={onFileSelected} iconProps={{ iconName: "Upload" }}>Upload...</FileButton>
                    <DefaultButton iconProps={{ iconName: "Download" }} onClick={generate}>Download</DefaultButton>
                </Stack>
            </Field>
            <Field label="Arch.json file" subLabel="8 bit workshop" url="https://8bitworkshop.com/redir.html?platform=verilog">
                <Stack horizontal>
                    <DefaultButton iconProps={{ iconName: "Download" }}>Export...</DefaultButton>
                </Stack>
            </Field>
        </Stack>
    </Blade>;

    function generate(): void {
        const blob = new Blob([JSON.stringify(state)], { type: "application/json" });
        saveAs(blob, "arch.json");
    }

    function onFileSelected(file: File): void {
        const reader = new FileReader();
        reader.addEventListener("load", e => {
            if (e.target) {
                const json = e.target.result;
                if (typeof (json) === "string") {
                    const targetState = JSON.parse(json);
                    // for now we replace local storage and reload page.
                    Object.entries(targetState)
                        .forEach(([k, v]) => {
                            localStorage.setItem("[EasyPeasyStore]@" + k, JSON.stringify({ data: v }));
                        });
                    window.location.reload();
                }
            }
        });
        reader.readAsText(file);
    }
}