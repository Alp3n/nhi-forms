import { useState } from 'react';
import { Box, Button, Text, Carousel, Image } from 'grommet';
import {
  Android,
  Apple,
  Chrome,
  MoreVertical,
  SafariOption,
} from 'grommet-icons';
import { Icon } from 'react-icons-kit';
import { square_add } from 'react-icons-kit/ikons/square_add';
import { share_2 } from 'react-icons-kit/ikons/share_2';
import { andLinks, iOSLinks } from '../utils/consts';
import Modal from './Modal';

const UseManualImage = ({ src, alt }) => {
  return <Image fit='contain' src={src} alt={alt} />;
};

const Step = ({ number, text, icon, icon2, or }) => {
  return (
    <Box direction='row' align='baseline' pad='small' gap='xsmall'>
      <Text>{number}.</Text>
      <Text>
        {text} {icon} {or && 'lub'} {icon2}
      </Text>
    </Box>
  );
};

const Install = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');
  return (
    <Modal title='Jak zainstalować'>
      {show ? (
        <Box height='medium' width='100%' gap='small'>
          <Carousel play={5000} fill>
            {content === 'android'
              ? andLinks.map((img) => (
                  <UseManualImage src={img.src} alt={img.alt} />
                ))
              : content === 'ios'
              ? iOSLinks.map((img) => (
                  <UseManualImage src={img.src} alt={img.alt} />
                ))
              : null}
          </Carousel>
          <Button
            margin='small'
            label='Cofnij'
            onClick={() => setShow(false)}
          />
        </Box>
      ) : (
        <Box direction='column' pad='small'>
          <Box margin={{ bottom: 'small' }}>
            <Text alignSelf='center' weight='bold'>
              Android <Android color='green' />
            </Text>
            <Step
              number='1'
              text='Upewnij się, że używasz przeglądarki Chrome'
              icon={<Chrome color='plain' />}
            />
            <Step
              number='2'
              text='Otwórz menu w przeglądarce, zazwyczaj jest to ikona'
              icon={<MoreVertical />}
            />
            <Step
              number='3'
              text='Znajdź funkcję "Dodaj do ekranu głównego" lub "Add to Home screen"'
            />
            <Button
              label='Instrukcja graficzna Android'
              onClick={() => {
                setContent('android');
                setShow(true);
              }}
            />
          </Box>
          <Box margin={{ bottom: 'small' }}>
            <Text alignSelf='center' weight='bold'>
              iOS <Apple />
            </Text>
            <Step
              number='1'
              text='Upewnij się, że używasz przeglądarki Safari'
              icon={<SafariOption color='plain' />}
            />
            <Step
              number='2'
              text='Kliknij przycisk "Udostępnij" dolny pasek nawigacji po środku, ikona'
              icon={<Icon size='24' icon={share_2} />}
            />
            <Step
              number='3'
              text='Znajdź funkcję "Do ekranu początk." lub "Add to Home Screen",
        ikona'
              icon={<Icon size='24' icon={square_add} />}
            />
            <Button
              label='Instrukcja graficzna iOS'
              onClick={() => {
                setContent('ios');
                setShow(true);
              }}
            />
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default Install;
