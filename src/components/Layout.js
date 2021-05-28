import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text, Layer, Header, Button } from 'grommet';
import { AuthContext } from '../context/authContext';
import { ModalContext } from '../context/modalContext';
import { useReactPWAInstall } from 'react-pwa-install';
import tenfertilLogo from '../img/icon-192x192.png';

const Layout = ({ children, background, title }) => {
  const { user, logout } = useContext(AuthContext);
  const { showModal, modal, closeModal } = useContext(ModalContext);
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
  let history = useHistory();

  const handleInstall = () => {
    pwaInstall({
      title: 'Zainstaluj NHI Formularze',
      logo: tenfertilLogo,
      description:
        'Zainstalowanie aplikacji NHI Formularze - Ankieta TenFertil ON, umożliwia łatwiejszy dostęp do aplikacji z pulpitu, oraz wygodniejszą obsługę jak każda inna mobilna aplikacja.',
    });
  };

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
          ) : (
            supported() &&
            !isInstalled() && (
              <Button label='Zainstaluj' onClick={handleInstall} />
            )
          )}
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
