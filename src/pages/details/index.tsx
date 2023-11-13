import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slice/cartReducer';
import Cookies from 'js-cookie';
import api from '../../services/api';
import { Product } from '../../types/product';
import { Comentario } from '../../types/comentario';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Card, CardHeader, CardContent, Grid, Button, FormControl, InputLabel, Select, MenuItem, TextField, Box, TableContainer, Paper, 
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


export default function ProductDetail() {
  const { produtoid } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('5');
  const [comments, setComments] = useState<Comentario[]>([]);
  const userId = Cookies.get('userId');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedComment, setEditedComment] = useState('');
  const [editedRating, setEditedRating] = useState('5');
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductAndComments = async () => {
      try {
        const productResponse = await api.get<Product>(`/listarproduto/${produtoid}`);
        setProduct(productResponse.data);

        const produtoId = Number(produtoid);
        const commentsResponse = await api.get<Comentario[]>(`/comentarios/${produtoId}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Erro ao obter dados do produto e comentários', error);
      }
    };

    fetchProductAndComments();
  }, [produtoid]);

  const handleCommentSubmit = () => {
    if (!userId) {
      alert('Você precisa fazer login para adicionar um comentário.');
      return;
    }

    const id = Number(userId);
    const userName = Cookies.get('userName');

    api
      .post('/comentar', {
        comentario: comment,
        nota: rating,
        usuarioId: id,
        produtoId: Number(produtoid),
        usuarioNome: userName,
      })
      .then(async (response) => {
        const novoComentario = response.data;

        setComments([...comments, novoComentario]);
        setComment('');
        setRating('5');
      })
      .catch((error) => {
        console.error('Erro ao adicionar comentário', error);
      });
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, amount: 1 }));
    setShowConfirmation(true);
  };

  const handleEditComment = (commentId: number) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    if (commentToEdit) {
      setEditedComment(commentToEdit.comentario);
      setEditedRating(commentToEdit.nota.toString());
      setSelectedCommentId(commentId);
      setOpenEditModal(true);
    }
  };

  const handleSaveEditedComment = async () => {
    try {
      if (!selectedCommentId) {
        console.error('ID do comentário não selecionado para edição');
        return;
      }

      await api.put('/editarcomentario', {
        comentario: editedComment,
        nota: editedRating,
        usuarioId: Number(userId),
        produtoId: Number(produtoid),
        usuarioNome: Cookies.get('userName'),
      });
      setOpenEditModal(false);
      
      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar o comentário editado', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {

    const id = commentId.toString();
    try {
      await api.delete(`/excluircomentario/${id}`);

      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Erro ao excluir o comentário', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <br />
      <Container>
        <Card style={{ marginBottom: '20px', padding: '20px' }}>
          <CardHeader title={product.nome} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className="product-image">
                  <img src={product.imagem} alt={product.nome} style={{ maxWidth: '300px' }} />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="product-info">
                  <p>Categoria: {product.categoria}</p>
                  <p>Marca: {product.marca}</p>
                  <p>Preço: R$ {product.preco.toFixed(2)}</p>
                  <p>Quantidade em Estoque: {product.qntEstoque}</p>
                  <Button variant="contained" color="primary" onClick={handleAddToCart}>
                    Adicionar ao Carrinho
                  </Button>
                  <br />
                  <br />
                  <Link to="/dashboard/user">
                    <Button variant="contained" color="primary">
                      Voltar para produtos
                    </Button>
                  </Link>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card style={{ marginBottom: '20px', padding: '20px' }}>
          <CardHeader title="Adicionar Comentário" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Nota</InputLabel>
                  <Select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    label="Nota"
                  >
                    {[1, 2, 3, 4, 5].map((option) => (
                      <MenuItem key={option} value={option.toString()}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField
                  label="Comentário"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
            </Grid>
            <br />
            <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
              Adicionar Comentário
            </Button>
          </CardContent>
        </Card>

        <Card style={{ padding: '20px' }}>
          <CardHeader title="Comentários" />
          <CardContent>
            <Box style={{ maxHeight: '600px', overflow: 'auto' }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome do Usuário</TableCell>
                      <TableCell>Nota</TableCell>
                      <TableCell>Comentário</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {comments.map((comment) => (
                      <TableRow key={comment.id}>
                        <TableCell>{comment.usuarioNome}</TableCell>
                        <TableCell>{comment.nota}</TableCell>
                        <TableCell>
                          {comment.editado ? (
                            <span style={{ fontStyle: 'italic' }}>{comment.comentario}</span>
                          ) : (
                            comment.comentario
                          )}
                        </TableCell>
                        <TableCell>
                          {comment.usuarioId === Number(userId) && (
                            <>
                              <IconButton onClick={() => handleEditComment(comment.id)}>
                                <EditIcon sx={{ color: 'primary' }} />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteComment(comment.id)}>
                                <DeleteIcon sx={{ color: 'error' }} />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>

        <Snackbar
          open={showConfirmation}
          autoHideDuration={3000}
          onClose={() => setShowConfirmation(false)}
          message={`Produto "${product.nome}" adicionado ao carrinho.`}
        />

        <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} maxWidth="md">
          <DialogTitle>Editar Comentário</DialogTitle>
          <DialogContent>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Nota</InputLabel>
              <Select
                value={editedRating}
                onChange={(e) => setEditedRating(e.target.value)}
                label="Nota"
              >
                {[1, 2, 3, 4, 5].map((option) => (
                  <MenuItem key={option} value={option.toString()}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Comentário"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditModal(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveEditedComment} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}