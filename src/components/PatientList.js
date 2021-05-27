import { Box, Text, Grid } from 'grommet';

const PatientList = ({ children, resultCount }) => {
  return (
    <Box gridArea='table' background='light-1' elevation='small'>
      <Box
        direction='row'
        background='light-2'
        pad='medium'
        justify='between'
        elevation='small'
        style={{ zIndex: 3 }}
      >
        <Text size='large'>Wyniki pacjentów: {resultCount}</Text>
      </Box>
      <Box height='100%' overflow='auto' pad={{ vertical: 'medium' }}>
        <Text alignSelf='center' margin='small' size='xsmall'>
          Lista odświeża się po 10 sekundach od przesłania ankiety
        </Text>
        <Grid
          pad={{ horizontal: 'medium' }}
          gap='small'
          height='100%'
          overflow='auto'
          justifyContent='center'
        >
          {children}
        </Grid>
      </Box>
    </Box>
  );
};

export default PatientList;
