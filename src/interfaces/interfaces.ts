export interface IProduct {
    id:string,
    logo: string,
    name: string,
    description: string,
    date_release: Date,
    date_revision: Date
}

export interface IProductState {
    list: Array<IProduct>,
    loading: boolean;
}



