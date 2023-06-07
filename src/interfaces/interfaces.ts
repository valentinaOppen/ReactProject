export interface IProduct {
    id: string,
    logo: string,
    name: string,
    description: string,
    date_release: Date,
    date_revision: Date
}

export interface IProductState {
    list: Array<IProduct>,
    productSelected?: IProduct | null,
    loading: boolean;
    error?: any;
}


export interface IColumnsTable {
    property: string,
    text?: string,
    class?: string,
    icon?: string,
    iconClass?: string,
    options?: string[],
    type: "string" | "date" | "image" | "menu"
}
