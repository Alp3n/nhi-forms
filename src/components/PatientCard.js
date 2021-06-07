import { useEffect, useState, useContext } from 'react';
import { ModalContext } from '../context/modalContext';
import { Box, Button, Text, ResponsiveContext, CheckBox } from 'grommet';
import { ContactInfo } from 'grommet-icons';
import { SHEET_URL } from '../utils/consts';
import { useAlert } from 'react-alert';
import PatientDetails from './PatientDetails';
import SecondForm from './SecondForm';

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PatientCard = ({ item, setResponse }) => {
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [value6, setValue6] = useState();

  const [allValues, setAllValues] = useState();

  const [changed, setChanged] = useState();

  const { openModal } = useContext(ModalContext);
  const size = useContext(ResponsiveContext);
  const myAlert = useAlert();

  useEffect(() => {
    const checkboxValues = [
      item['Pierwsze'],
      item['Drugie'],
      item['Trzecie'],
      item['Czwarte'],
      item['Piąte'],
      item['Kontynuacja'],
    ];

    let cleanValues = checkboxValues.filter((obj) => obj !== undefined);

    setAllValues(cleanValues);
    if (item['Pierwsze']) {
      setValue1(item['Pierwsze'].toLowerCase() === 'true');
    }
    if (item['Drugie']) {
      setValue2(item['Drugie'].toLowerCase() === 'true');
    }
    if (item['Trzecie']) {
      setValue3(item['Trzecie'].toLowerCase() === 'true');
    }
    if (item['Czwarte']) {
      setValue4(item['Czwarte'].toLowerCase() === 'true');
    }
    if (item['Piąte']) {
      setValue5(item['Piąte'].toLowerCase() === 'true');
    }
    if (item['Kontynuacja']) {
      setValue6(item['Kontynuacja'].toLowerCase() === 'true');
    }
  }, [item]);

  useEffect(() => {
    if (allValues) {
      if (
        allValues.length ===
        [value1, value2, value3, value4, value5, value6]
          .filter((el) => el !== undefined)
          .filter((el) => el !== false)
          .filter((el) => el !== 'FALSE').length
      ) {
        return setChanged(false);
      } else if (
        allValues.length !==
        [value1, value2, value3, value4, value5, value6]
          .filter((el) => el !== undefined)
          .filter((el) => el !== false)
          .filter((el) => el !== 'FALSE').length
      ) {
        return setChanged(true);
      }
    } else {
      return setChanged(false);
    }
  }, [allValues, value1, value2, value3, value4, value5, value6]);

  const handleChangeSubmit = () => {
    //Fetch for PUT method
    const fetchPUT = async (url, body) => {
      try {
        const response = await fetch(url, {
          method: 'PUT',
          mode: 'cors',
          timeout: '0',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        if (data.message === 'Updated successfully') {
          setResponse(false);
          return myAlert.success('Pomyślnie zatwierdzono zmianę');
        }
      } catch (err) {
        return myAlert.success('Wystąpił problem z zatwierdzeniem zmiany');
      }
    };

    const transformBody = (
      item,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6
    ) => {
      let tempBody = {
        ...item,
        Pierwsze: value1 === true ? value1.toString().toUpperCase() : '',
        Drugie: value2 === true ? value2.toString().toUpperCase() : '',
        Trzecie: value3 === true ? value3.toString().toUpperCase() : '',
        Czwarte: value4 === true ? value4.toString().toUpperCase() : '',
        Piąte: value5 === true ? value5.toString().toUpperCase() : '',
        Kontynuacja: value6 === true ? value5.toString().toUpperCase() : '',
      };
      return tempBody;
    };

    const body = transformBody(
      item,
      value1,
      value2,
      value3,
      value4,
      value5,
      value6
    );

    fetchPUT(SHEET_URL, body).then(() => setResponse(true));

    setChanged(false);
  };

  return (
    <Box background='light-2' elevation='small' round>
      <Box
        direction='row'
        justify='between'
        pad='medium'
        border={{ side: 'bottom' }}
      >
        <Box
          direction={size === 'small' ? 'column' : 'row'}
          gap='medium'
          align='start'
        >
          <Text>
            Inicjały: <Text weight='bold'>{item['1. Inicjały pacjenta:']}</Text>
          </Text>
          <Text>
            Wiek: <Text weight='bold'>{item['2. Wiek pacjenta:']}</Text>
          </Text>
        </Box>
        <Button
          label='Szczegóły'
          plain
          icon={<ContactInfo />}
          onClick={() => openModal(<PatientDetails item={item} />)}
        />
      </Box>
      <Box direction='column' justify='around' align='center'>
        <Text weight='bold' margin='small'>
          Rekomendowana liczba opakowań
        </Text>

        <Box
          overflow='auto'
          direction='row'
          pad={{ horizontal: 'medium', vertical: 'small' }}
        >
          <CheckBox
            checked={value1}
            label='1'
            pad={{ right: 'medium' }}
            disabled={item['Pierwsze'] === 'TRUE' ? true : false}
            onChange={(event) => setValue1(event.target.checked)}
          />
          <CheckBox
            checked={value2}
            label='2'
            pad={{ right: 'medium' }}
            disabled={
              item['Drugie'] === 'TRUE'
                ? true
                : false || item['Pierwsze'] === 'TRUE'
                ? false
                : true
            }
            onChange={(event) => setValue2(event.target.checked)}
          />
          <Button
            label='Wizyta kontrolna 3 - ankieta'
            disabled={
              item['Trzecie'] === 'TRUE'
                ? true
                : false || item['Drugie'] === 'TRUE'
                ? false
                : true
            }
            onClick={() =>
              openModal(
                <SecondForm
                  value3={value3}
                  setValue3={setValue3}
                  /* setResponse={setResponse} */ item={item}
                />
              )
            }
            margin={{ right: 'medium' }}
            style={{ whiteSpace: 'nowrap' }}
          />
          <CheckBox
            checked={value4}
            label='4'
            pad={{ right: 'medium' }}
            disabled={
              item['Czwarte'] === 'TRUE'
                ? true
                : false || item['Trzecie']
                ? false
                : true
            }
            onChange={(event) => setValue4(event.target.checked)}
          />
          <CheckBox
            checked={value5}
            label='5'
            pad={{ right: 'medium' }}
            disabled={
              item['Piąte'] === 'TRUE'
                ? true
                : false || item['Czwarte']
                ? false
                : true
            }
            onChange={(event) => setValue5(event.target.checked)}
          />
          <span
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              alignSelf: 'center',
            }}
          >
            <CheckBox
              checked={value6}
              label='Kontynuacja leczenia'
              disabled={
                item['Kontynuacja'] === 'TRUE'
                  ? true
                  : false || item['Piąte']
                  ? false
                  : true
              }
              onChange={(event) => setValue6(event.target.checked)}
            />
          </span>
        </Box>
      </Box>
      {changed ? (
        <Button
          label='Zatwierdź'
          primary
          margin='small'
          onClick={() => handleChangeSubmit()}
        />
      ) : null}
    </Box>
  );
};

export default PatientCard;
