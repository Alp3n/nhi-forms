import { useState } from 'react';
import { Box, Button, Image, Carousel } from 'grommet';

import { imgLinks, andLinks, iOSLinks } from '../utils/consts';
import Modal from './Modal';

const UseManualImage = ({ src, alt }) => {
  return <Image fit='contain' src={src} alt={alt} />;
};

const Instruction = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');

  return (
    <Modal title='Instrukcja'>
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
    </Modal>
  );
};

export default Instruction;
