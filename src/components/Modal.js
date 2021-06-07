import { useContext } from 'react';
import { Box, Button, Text } from 'grommet';
import { Close } from 'grommet-icons';
import { ModalContext } from '../context/modalContext';

const Modal = ({ title, children }) => {
  const { closeModal } = useContext(ModalContext);
  return (
    <Box
      elevation='small'
      background='light-1'
      direction='column'
      height='large'
    >
      <Box
        direction='row'
        align='center'
        justify='between'
        background='portrait-2'
        pad='medium'
        elevation='small'
      >
        <Text weight='bold' size='large' style={{ whiteSpace: 'nowrap' }}>
          {title}
        </Text>
        <Button reverse plain onClick={() => closeModal()} icon={<Close />} />
      </Box>
      <Box
        height='100%'
        overflow='auto'
        margin={{ horizontal: 'medium' }}
        pad={{ vertical: 'small' }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Modal;
