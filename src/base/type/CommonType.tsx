import { ReactNode } from "react";

export type ParentType = {
    children?: ReactNode;
    className?: string;
    id?: string;
};

export type AnimateVariables = {
    initial?: object;
    animate?: object;
    exit?: object;
};

export type LinkProps = {
    content: ReactNode;
    link?: string;
    target?: string;
};

export type EventProps = {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onHover?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onDoubleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onTap?: (e: React.TouchEvent<HTMLDivElement>) => void;
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};

export type ImageProps={
    src:string;
    width?:number;
    height?:number;
    alt?:string;
    className?: string;
    loading:"eager"|"normal"
}