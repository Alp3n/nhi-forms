import { Box, Text, Grid } from 'grommet';

const PatientList = ({ children, resultCount }) => {
  return (
    <Box gridArea='table' background='light-1' elevation='small'>
      <Box
        background='light-2'
        pad='medium'
        justify='center'
        elevation='small'
        style={{ zIndex: 3 }}
      >
        <Text size='large'>Wyniki pacjentów: {resultCount}</Text>
      </Box>
      <Box overflow='auto' pad={{ vertical: 'medium' }}>
        <Grid pad={{ horizontal: 'medium' }} gap='small'>
          {children}
        </Grid>
      </Box>
    </Box>
  );
};

export default PatientList;
