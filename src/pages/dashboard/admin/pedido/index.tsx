import React from 'react';
import api from '../../../../services/api';
import { Pedido } from '../../../../types/pedido';
import { User } from '../../../../types/User';
import {
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function PedidoList() {
  const [pedidos, setPedidos] = React.useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedPedido, setSelectedPedido] = React.useState<Pedido | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedStatusPedido, setSelectedStatusPedido] = React.useState('');
  const [selectedStatusEntrega, setSelectedStatusEntrega] = React.useState('');
  const [selectedStatusPagamento, setSelectedStatusPagamento] = React.useState('');
  const [selectedUsuario, setSelectedUsuario] = React.useState<User | null>(null);
  const [openUsuarioModal, setOpenUsuarioModal] = React.useState(false);

  React.useEffect(() => {
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

  const buscarDetalhesUsuario = async (nomeUsuario: string) => {
    try {
      const response = await api.get(`/buscarusuario/${nomeUsuario}`);
      setSelectedUsuario(response.data);
      setOpenUsuarioModal(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes do usuário:', error);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedPedido(null);
  };

  const handleSaveChanges = async () => {
    if (!selectedPedido) {
      console.error('Selected pedido is null');
      return;
    }

    const { id } = selectedPedido;
    const pedidoId = id.toString();

    try {
      await api.put(`/editarstatuspedido/${pedidoId}`, {
        statusPedido: selectedStatusPedido,
        statusEntrega: selectedStatusEntrega,
        statusPagamento: selectedStatusPagamento,
      });
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === id
            ? {
                ...pedido,
                statusPedido: selectedStatusPedido,
                statusEntrega: selectedStatusEntrega,
                statusPagamento: selectedStatusPagamento,
              }
            : pedido
        )
      );

      setOpenModal(false);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  const handleUsuarioModalClose = () => {
    setOpenUsuarioModal(false);
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
                <TableCell onClick={() => buscarDetalhesUsuario('')}>Nome do Usuário</TableCell>
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
                <TableRow
                  key={pedido.id}
                  style={{
                    backgroundColor:
                      pedido.statusPedido === 'Cancelado'
                        ? '#FFCDD2' // Red
                        : pedido.statusPedido === 'Concluído'
                        ? '#C8E6C9' // Green
                        : 'inherit',
                  }}
                >
                  <TableCell>{pedido.id}</TableCell>
                  <TableCell>{pedido.qnt}</TableCell>
                  <TableCell onClick={() => buscarDetalhesUsuario(pedido.nomeUsuario)}>
                    {pedido.nomeUsuario}
                  </TableCell>
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
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
        }}>
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
          <Button onClick={handleSaveChanges} style={{ width: '100%', marginTop: '10px', backgroundColor: '#4CAF50', color: 'white' }}>Salvar Alterações</Button>
        </div>
      </Modal>
      <Modal open={openUsuarioModal} onClose={handleUsuarioModalClose}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
        }}>
          <h2>Detalhes do Usuário</h2>
          {selectedUsuario && (
            <>
              <Typography>Nome: {selectedUsuario.name}</Typography>
              <Typography>Email: {selectedUsuario.email}</Typography>
              <Typography>CPF: {selectedUsuario.cpf}</Typography>
              <Typography>Telefone: {selectedUsuario.telefone}</Typography>
            </>
          )}
          <Button onClick={handleUsuarioModalClose} style={{ marginTop: '10px', backgroundColor: '#E53935', color: 'white' }}>Fechar</Button>
        </div>
      </Modal>
    </Card>
  );
}
