export interface GenericProp {
    className?: string;
    onClick?: (e?: any) => void;
    [otherProps: string]: any;
    placeholder?: string;
}