import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text, Layer, Header } from 'grommet';
import { AuthContext } from '../context/authContext';
import { ModalContext } from '../context/modalContext';

const Layout = ({
  children,
  center,
  background,
  titleBackground,
  title,
  login,
}) => {
  const { user, logout } = useContext(AuthContext);
  const { showModal, modal, closeModal } = useContext(ModalContext);
  let history = useHistory();
  return (
    <Box background={background} fill='vertical'>
      {title ? (
        <Header
          pad='small'
          margin={{ bottom: 'medium' }}
          background='light-1'
          elevation='small'
        >
          <Box
            direction='row'
            align='baseline'
            gap='large'
            margin={{ horizontal: 'small' }}
          >
            <Text weight='bold' size='large'>
              {title}
            </Text>
            {/* {login ? null : <Text>Witaj {user.displayName}</Text>} */}
          </Box>

          {user ? (
            <Box
              onClick={() => logout(history)}
              margin={{ horizontal: 'small' }}
            >
              <Text> Wyloguj</Text>
            </Box>
          ) : null}
        </Header>
      ) : null}
      {children}
      {showModal && (
        <Layer onClickOutside={closeModal} onEsc={closeModal}>
          {modal}
        </Layer>
      )}
    </Box>
  );
};

export default Layout;
