import { Tema } from './Tema'

export class Postagem
{
    public id: number
    public titulo: string
    public texto: string
    public date: Date //Já preenche automaticamente
    public tema: Tema
}