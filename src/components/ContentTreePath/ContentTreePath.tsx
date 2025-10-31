import { ContentTreePathProps } from "./ContentTreePath.types";

import { tv } from "tailwind-variants";

const containerStyles = tv({
    base: "flex items-center text-gray-500 font-medium text-sm"
});

const labelStyles = tv({
    base: "text-(--neutral-800) font-semibold",
});

const separatorStyles = tv({
    base: "!ml-1 text-(--neutral-gray) font-semibold",
});

export default function ContentTreePath ({
    text = "Caminho",
    path = "",
} : ContentTreePathProps) {
    return (
        <div className={containerStyles()}>
            <p className={labelStyles()}>
                {text}
            </p>
            <p className={separatorStyles()}>
                {path}
            </p>
        </div>
    );
}