import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Text, Layer } from 'grommet';
import styled from 'styled-components';
import { AuthContext } from '../context/authContext';
import { ModalContext } from '../context/modalContext';

const Layout = ({ children, center, background, titleBackground, title, login }) => {
  const { user, logout } = useContext(AuthContext);
  const { showModal, modal, closeModal } = useContext(ModalContext);
  let history = useHistory();
  return (
    <StyledWrapper fill >
      {title ? (
        <Box
          direction='row'
          pad='small'
          align='center'
          justify='between'
          background={titleBackground}
          margin={{horizontal: 'small'}}
        >
          <Box direction='row' align='baseline' gap='large'>
            <Text weight='bold' size='large'>
              {title}
            </Text>
            {login ? null:<Text>Witaj {user.displayName}</Text> }
          </Box>

          {user ? (
            <Box onClick={() => logout(history)}>
              <Text> Wyloguj</Text>
            </Box>
          ) : null}
        </Box>
      ) : null}

      <Box
        fill='vertical'
        // height={center ? '100%' : null}
        align={center ? 'center' : null}
        justify={center ? 'center' : null}
        background={background}
      >
        {children}
      </Box>
      {showModal && (
        <Layer  onClickOutside={closeModal} onEsc={closeModal}>
          {modal}
        </Layer>
      )}
    </StyledWrapper>
  );
};

export default Layout;

const StyledWrapper = styled(Box)`
  position: absolute;
`;
