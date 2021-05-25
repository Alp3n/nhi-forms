import { Box, Text } from 'grommet';

const ActiveForm = ({ children, mobile }) => {
  return (
    <Box gridArea='form' background='light-1' elevation='small'>
      <Box background='light-2' pad='medium' justify='center' elevation='small'>
        <Text size='large'>Aktualny formularz</Text>
      </Box>
      <Box overflow='auto' height='100%' pad={{ vertical: 'small' }}>
        {children}
      </Box>
    </Box>
  );
};

export default ActiveForm;
