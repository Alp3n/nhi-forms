import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CheckBoxGroup,
  Text,
} from 'grommet';
import { ContactInfo } from 'grommet-icons';

const PatientCard = ({ name }) => {
  return (
    <Box background='light-2' round>
      <Box
        direction='row'
        justify='between'
        pad='medium'
        border={{ side: 'bottom' }}
      >
        <Text weight='bold' size='large'>
          {name}
        </Text>
        <Button label='Szczegóły' plain icon={<ContactInfo />} />
      </Box>
      <Box direction='row' pad='medium' justify='around' align='center'>
        <Text>Progres</Text>
        <CheckBoxGroup
          disabled
          direction='row'
          options={[
            'Pierwsze pudełko',
            'Drugie pudełko',
            'Trzecie pudełko',
            'Czwarte pudełko',
            'Piąte pudełko',
          ]}
        />
      </Box>
    </Box>
  );
};

export default PatientCard;
