import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Text,
  Layer,
  Header,
  Button,
  ResponsiveContext,
  DropButton,
} from 'grommet';
import { AuthContext } from '../context/authContext';
import { ModalContext } from '../context/modalContext';
import Install from './Install';
import { CircleInformation, Logout, Menu /* Refresh */ } from 'grommet-icons';
import Instruction from './Instruction';

const Layout = ({ children, background, title }) => {
  const { user, logout } = useContext(AuthContext);
  const size = useContext(ResponsiveContext);
  const { openModal, showModal, modal, closeModal } = useContext(ModalContext);

  let history = useHistory();

  /*   const handleRefresh = () => {
    window.location.reload();
  }; */

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
            margin={{ horizontal: 'xsmall' }}
          >
            <Text weight='bold' size='large'>
              {title}
            </Text>
          </Box>

          {user ? (
            size === 'small' ? (
              <DropButton
                icon={<Menu />}
                dropAlign={{ top: 'bottom', right: 'right' }}
                dropContent={
                  <Box
                    align='center'
                    justify='between'
                    width='small'
                    pad='medium'
                    gap='large'
                  >
                    <Button
                      label='Wyloguj'
                      icon={<Logout />}
                      plain
                      onClick={() => logout(history)}
                    />
                    <Button
                      label='Instrukcja'
                      icon={<CircleInformation />}
                      plain
                      onClick={() => openModal(<Instruction />)}
                    />
                  </Box>
                }
              />
            ) : (
              <Box direction='row' gap='medium'>
                <Button
                  label='Instrukcja'
                  icon={<CircleInformation />}
                  onClick={() => openModal(<Instruction />)}
                />
                <Button
                  label='Wyloguj'
                  onClick={() => logout(history)}
                  margin={{ horizontal: 'xsmall' }}
                />
              </Box>
            )
          ) : (
            <>
              {/* {size === 'small' ? (
                <Button
                  plain
                  icon={<Refresh />}
                  onClick={() => handleRefresh()}
                />
              ) : null} */}
              <Button
                label='Zainstaluj'
                onClick={() => openModal(<Install closeModal={closeModal} />)}
              />
            </>
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
