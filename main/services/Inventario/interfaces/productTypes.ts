export interface Filters {
    limit: number;
}

export interface ProductType {
    _id?: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    precio: number;
}
export interface Fields {
    _id?: string
    nombre?: string;
    descripcion?: string;
    cantidad?: number;
    precio?: number;
}