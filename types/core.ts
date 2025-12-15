export type Theme = 'light' | 'dark'

export interface ItemType {
    id: number | string
}

export type ReadingGroup = string;

export interface Gas {
    name: string;
    value: string;
}

export type ColorDataMap = {
    [key: string]: ColorData
}

export declare interface ColorData {
    title: string;
    foreground: string;
    background: string;
}

export type URL_TPL = {
    url_tpl: string
    replacements: string[]
    replacement_hints: string[]
}

export interface GasStatus {

}

export interface GasProperty {
    siUnit: string,
    icon: string,
    label: string,
    status?: string[]
}

export type FormErrorType = { [key: string]: string };