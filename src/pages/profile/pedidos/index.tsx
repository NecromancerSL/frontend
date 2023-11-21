import { useState, useEffect } from 'react';
import api from "../../../services/api";
import { Typography, Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Pedido } from "../../../types/pedido";
import Cookies from "js-cookie";

export default function UserOrders() {
  const userId = Cookies.get("userId");
  const [orders, setOrders] = useState<Pedido[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await api.get(`/listarpedidos/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos do usuário:", error);
      }
    };

    fetchUserOrders();
  }, [userId]);

  const handleCancelOrder = async (id: number, statusPedido: string) => {
    if (statusPedido === 'Cancelado') {
      alert('Este pedido já foi cancelado.');
      return;
    }

    const pedidoId = id.toString();
    const confirmCancel = window.confirm("Tem certeza de que deseja cancelar este pedido?");

    if (confirmCancel) {
      try {
        await api.put(`/cancelarpedido/${pedidoId}`);
        console.log("Pedido cancelado com sucesso.");

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, statusPedido: 'Cancelado' } : order
          )
        );
      } catch (error) {
        console.error("Erro ao cancelar o pedido:", error);
      }
    }
  };

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <Typography variant="h5" component="div">
        Pedidos do Usuário
      </Typography>
      <Card style={{ marginTop: "16px" }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Numero Pedido</TableCell>
                  <TableCell>Valor Total</TableCell>
                  <TableCell>Status do Pedido</TableCell>
                  <TableCell>Status de Entrega</TableCell>
                  <TableCell>Status de Pagamento</TableCell>
                  <TableCell>Tipo de Pagamento</TableCell>
                  <TableCell>Tipo de Entrega</TableCell>
                  <TableCell>Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>R$ {order.valorTotal.toFixed(2)}</TableCell>
                    <TableCell>{order.statusPedido}</TableCell>
                    <TableCell>{order.statusEntrega}</TableCell>
                    <TableCell>{order.statusPagamento}</TableCell>
                    <TableCell>{order.tipoPagamento}</TableCell>
                    <TableCell>{order.tipoEntrega}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleCancelOrder(order.id, order.statusPedido)}
                      >
                        Cancelar Pedido
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}