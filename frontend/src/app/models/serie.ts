export interface Serie {
    id?: number,
    nombre: string,
    temporadas: string,
    urlImg: string,
    valoracion: number,
    valoracionModificada?: number[];
    float?: boolean;
    urlSerie: string
}
