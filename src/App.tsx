import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Routes from './routes/routes';

export default function App() {
  
  const [, , removeCookie] = useCookies(['userName', 'userId']);

  useEffect(() => {
    // Função para remover todos os cookies
    const removeAllCookies = () => {
      removeCookie('userName');
      removeCookie('userId');
      // Adicione aqui a remoção de outros cookies, se necessário
    };

    // Adicione um ouvinte de evento antes que a página seja fechada
    window.addEventListener('beforeunload', removeAllCookies);

    return () => {
      // Certifique-se de remover o ouvinte de evento quando o componente for desmontado
      window.removeEventListener('beforeunload', removeAllCookies);
    };
  }, [removeCookie]);

  return (
    <>
      <Routes />
    </>
  )
}
