export interface Book {
    name: string;
    url: string;
}

export enum TABS {
    WEREAD = "weread",
    LIBBY = "libby",
    PHYSICAL_BOOK = 'book'
}

export const TABS_FORM_STORAGE_KEY_MAP = {
    [TABS.PHYSICAL_BOOK]: '@PhysicalBookForm',
    [TABS.LIBBY]: '@LibbyForm',
    [TABS.WEREAD]: '@WereadForm'
}