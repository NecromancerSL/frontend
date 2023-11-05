import { useState, useEffect } from 'react';
import api from '../../../../services/api';
import { Pedido } from '../../../../types/pedido';
import { Card, CardContent, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const PedidoList = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatusPedido, setSelectedStatusPedido] = useState('');
  const [selectedStatusEntrega, setSelectedStatusEntrega] = useState('');
  const [selectedStatusPagamento, setSelectedStatusPagamento] = useState('');

  useEffect(() => {
    api.get('/listarpedidos')
      .then((response) => {
        setPedidos(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleEditClick = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setSelectedStatusPedido(pedido.statusPedido);
    setSelectedStatusEntrega(pedido.statusEntrega);
    setSelectedStatusPagamento(pedido.statusPagamento);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedPedido(null);
  };

  const handleSaveChanges = () => {
    // Implemente a lógica para enviar as alterações para a API e atualizar o estado do pedido
    // Após a conclusão, feche o modal.
    setOpenModal(false);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar os pedidos.</div>;
  }

  return (
    <Card>
      <br />
      <CardContent>
        <Typography variant="h5" component="div">
          Lista de Pedidos
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Nome do Usuário</TableCell>
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
              {pedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell>{pedido.id}</TableCell>
                  <TableCell>{pedido.qnt}</TableCell>
                  <TableCell>{pedido.nomeUsuario}</TableCell>
                  <TableCell>R$ {pedido.valorTotal.toFixed(2)}</TableCell>
                  <TableCell>{pedido.statusPedido}</TableCell>
                  <TableCell>{pedido.statusEntrega}</TableCell>
                  <TableCell>{pedido.statusPagamento}</TableCell>
                  <TableCell>{pedido.tipoPagamento}</TableCell>
                  <TableCell>{pedido.tipoEntrega}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditClick(pedido)}>Editar</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Modal open={openModal} onClose={handleModalClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
          <h2>Editar Pedido #{selectedPedido?.id}</h2>
          <FormControl style={{ width: '100%' }}>
            <InputLabel>Status do Pedido</InputLabel>
            <Select
              value={selectedStatusPedido}
              onChange={(e) => setSelectedStatusPedido(e.target.value as string)}
              style={{ width: '100%' }}
            >
              <MenuItem value="Em andamento">Em andamento</MenuItem>
              <MenuItem value="Concluído">Concluído</MenuItem>
              <MenuItem value="Cancelado">Cancelado</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ width: '100%' }}>
            <InputLabel>Status de Entrega</InputLabel>
            <Select
              value={selectedStatusEntrega}
              onChange={(e) => setSelectedStatusEntrega(e.target.value as string)}
              style={{ width: '100%' }}
            >
              <MenuItem value="Pendente">Pendente</MenuItem>
              <MenuItem value="Entregue">Entregue</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl style={{ width: '100%' }}>
            <InputLabel>Status de Pagamento</InputLabel>
            <Select
              value={selectedStatusPagamento}
              onChange={(e) => setSelectedStatusPagamento(e.target.value as string)}
              style={{ width: '100%' }}
            >
              <MenuItem value="Aguardando pagamento">Aguardando pagamento</MenuItem>
              <MenuItem value="Pago">Pago</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSaveChanges} style={{ width: '100%' }}>Salvar Alterações</Button>
        </div>
      </Modal>
    </Card>
  );
};

export default PedidoList;
