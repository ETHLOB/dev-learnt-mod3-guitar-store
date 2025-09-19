import db from '../data/db.ts'

export type guitarraType = typeof db[0] & { cantidad?: number }
export const guitarraNull: guitarraType = {
    id: 0,
    nombre: '',
    imagen: '',
    descripcion: '',
    precio: 0
}