import React, { useRef, useMemo, PropsWithChildren } from "react";
import { DefaultButton, mergeStyleSets, IIconProps } from "@fluentui/react";

export interface FileUploadButtonProps {
    iconProps?: IIconProps;
    mimeType?: string;
    onClick?: (file: File) => void;
}

export function FileButton(props: PropsWithChildren<FileUploadButtonProps>): JSX.Element {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const style = useMemo(useStyle, []);

    return <>
        <DefaultButton iconProps={props.iconProps} onClick={() => fileInputRef.current?.click()}>{props.children}</DefaultButton>
        <input ref={fileInputRef} className={style.file} type="file" onChange={onFile} accept=".json" />
    </>

    function onFile<T>(e: React.ChangeEvent<T>): void {
        const files: FileList | undefined = (e.target as any).files;
        if (files && files.length) {
            const file = files[0];
            if (!props.mimeType || file.type === props.mimeType) {
                if (props.onClick)
                    props.onClick(file);
            }
        }
    }

    function useStyle() {
        return mergeStyleSets({
            file: {
                display: 'none',
            }
        })
    }
}