import React from 'react'
export interface IconType extends React.HTMLAttributes < any > {
    type: string;
    size?: string;
    disabled?: boolean;
    additionalClasses?: string | Array<string>
}
export enum IconSize {
    S = "small",
    M = "normal",
    L = "large"
}