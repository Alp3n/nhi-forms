import { useState } from 'react';
import { Box, Text, TextInput } from 'grommet';

const DoubleAnswer = ({ label, name1, name2 }) => {
  const [before, setBefore] = useState('');
  const [after, setAfter] = useState('');

  return (
    <Box
      margin='small'
      pad='small'
      align='start'
      justify='between'
      gap='small'
      round='small'
      border
    >
      <Text>{label}</Text>
      <Box direction='row' align='center' gap='medium'>
        <Text>Przed</Text>
        <Box /* width='xsmall' */ direction='row' align='center' gap='small'>
          <TextInput
            name={name1}
            type='text'
            placeholder='przed'
            value={before}
            onChange={(event) => setBefore(event.target.value)}
            min={0}
          />
        </Box>
        <Text>Po</Text>
        <Box /* width='xsmall' */ direction='row' align='center' gap='small'>
          <TextInput
            name={name2}
            type='text'
            placeholder='po'
            value={after}
            onChange={(event) => setAfter(event.target.value)}
            min={0}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DoubleAnswer;
