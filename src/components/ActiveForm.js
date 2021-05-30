import { Box, Text } from 'grommet';

const ActiveForm = ({ children }) => {
  return (
    <Box gridArea='form' background='light-1' elevation='small'>
      <Box background='light-2' pad='medium' justify='center' elevation='small'>
        <Text size='large'>Aktualny formularz - TenFertil ON</Text>
      </Box>
      <Box overflow='auto' height='100%' pad={{ vertical: 'small' }}>
        <Text margin={{ left: 'medium' }} color='red'>
          * Wymagane
        </Text>
        <Text margin={{ left: 'medium', bottom: 'small' }}>
          Niektóre odpowiedzi odblokowują pytania podrzędne
        </Text>
        {children}
      </Box>
    </Box>
  );
};

export default ActiveForm;
