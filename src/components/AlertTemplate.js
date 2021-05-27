import { Box, Text, Button } from 'grommet';
import { Close } from 'grommet-icons';

const AlertTemplate = ({ style, options, message, close }) => {
  return (
    <Box
      direction='row'
      pad='small'
      round
      elevation='small'
      background='light-2'
      border={{
        size: 'medium',
        color:
          options.type === 'success'
            ? 'status-ok'
            : options.type === 'error'
            ? 'status-error'
            : options.type === 'info'
            ? 'neutral-3'
            : null,
      }}
      align='center'
      justify='between'
      style={style}
    >
      <Text>{message}</Text>
      <Button onClick={close} icon={<Close />} />
    </Box>
  );
};

export default AlertTemplate;
