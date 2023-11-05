import { Product } from "../types/product";

export interface Pedido {
    id: number;
    usuarioId: number;
    produtoId: number;
    qnt: number;
    valorTotal: number;
    nomeUsuario: string;
    statusPedido: string;
    statusEntrega: string;
    statusPagamento: string;
    tipoEntrega: string;
    tipoPagamento: string;
    itemPedido: itemPedido[];   
}

export interface itemPedido{
    id: number;
    pedidoId: number;
    produto: Product[];
    qnt: number;
    valorTotal: number;
}