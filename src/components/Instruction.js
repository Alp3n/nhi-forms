import { useContext, useState } from 'react';
import { Box, Button, Text, Image, Carousel } from 'grommet';
import { ModalContext } from '../context/modalContext';
import { Close } from 'grommet-icons';
import { imgLinks, andLinks, iOSLinks } from '../utils/consts';

const UseManualImage = ({ src, alt }) => {
  return <Image fit='contain' src={src} alt={alt} />;
};

const Instruction = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');
  const { closeModal } = useContext(ModalContext);
  return (
    <Box
      elevation='small'
      background='light-1'
      direction='column'
      height='large'
      width='large'
    >
      <Box
        direction='row'
        align='center'
        justify='between'
        background='portrait-2'
        pad='medium'
        margin={{ bottom: 'large' }}
      >
        <Text weight='bold' size='large'>
          Instrukcja
        </Text>
        <Button onClick={() => closeModal()} icon={<Close />} plain />
      </Box>
      {show ? (
        <Box height='medium' width='100%' gap='small'>
          <Carousel play={5000} fill>
            {content === 'use'
              ? imgLinks.map((img) => (
                  <UseManualImage src={img.src} alt={img.alt} />
                ))
              : content === 'android'
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
        <Box margin='small' gap='large'>
          <Button
            label='Instrukcja obsługi'
            onClick={() => {
              setContent('use');
              setShow(true);
            }}
          />
          <Button
            label='Instalacja smartfon Android'
            onClick={() => {
              setContent('android');
              setShow(true);
            }}
          />
          <Button
            label='Instalacja smartfon iOS (iPhone, iPad)'
            onClick={() => {
              setContent('ios');
              setShow(true);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Instruction;
