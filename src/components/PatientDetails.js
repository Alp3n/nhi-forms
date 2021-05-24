import { Box, Text, Button } from 'grommet';

const Detail = ({ title, data }) => {
  return (
    <Box direction='column' margin={{ bottom: 'small' }}>
      <Text>{title}</Text>
      <Text>{data}</Text>
    </Box>
  );
};

const PatientDetails = ({ item }) => {
  return (
    <Box elevation='small' background='light-1' direction='column' pad='medium'>
      <Detail title='Inicjały pacjenta:' data={item['1. Inicjały pacjenta:']} />
      <Detail title='Wiek pacjenta:' data={item['2. Wiek pacjenta:']} />
      <Detail
        title='Jak długo pacjent stara się o potomstwo?'
        data={item['3. Jak długo pacjent stara się o potomstwo?']}
      />
      <Detail
        title='Ile razy pacjent wykonał badania nasienia w czasie starań o ciążę?'
        data={
          item[
            '4. Ile razy pacjent wykonał badania nasienia w czasie starań o ciążę?'
          ]
        }
      />
      <Detail
        title='Jeżli wykonywał, to jakie badania?'
        data={item['4.1 Jeżli wykonywał, to jakie badania?']}
      />
      <Detail
        title='Choroby towarzyszące:'
        data={item['5. Choroby towarzyszące:']}
      />
      <Detail
        title='Ocena ginekologiczna czynnika żeńskiego:'
        data={item['6. Ocena ginekologiczna czynnika żeńskiego:']}
      />
      <Detail
        title='Czy pacjent chorował w ostatnim czasie na COVID?'
        data={item['7. Czy pacjent chorował w ostatnim czasie na COVID?']}
      />
      <Detail
        title='Czy jest zaszczepiony przeciw SARS-COV-2?'
        data={item['8. Czy jest zaszczepiony przeciw SARS-COV-2?']}
      />
      <Detail
        title='Jeżeli tak, to ile dawek?'
        data={item['8.1 Jeżeli tak, to ile dawek?']}
      />
      <Detail
        title='Czy wystąpiły odczyny poszczepienne?'
        data={item['8.2 Czy wystąpiły odczyny poszczepienne ?']}
      />
      <Detail
        title='Czy wykonywał badania nasienia w okresie około-COVID?'
        data={item['9. Czy wykonywał badania nasienia w okresie około-COVID?']}
      />
      <Detail
        title='Jeśli tak, to czy nastąpiło:'
        data={item['9.1 Jeśli tak, to czy nastąpiło:']}
      />
      <Detail
        title='Czy była stosowana / stosuje terapia poprawiającą płodność?'
        data={
          item[
            '10. Czy była stosowana / stosuje terapia poprawiającą płodność?'
          ]
        }
      />
      <Detail
        title='Czy stosował / stosuje terapie stresu oksydacyjnego (suplementy)?'
        data={
          item[
            '11. Czy stosował / stosuje terapie stresu oksydacyjnego (suplementy)?'
          ]
        }
      />
      <Detail
        title='Jeśli tak, to jaki preparat i jak długo?'
        data={item['11.1 Jeśli tak, to jaki preparat i jak długo?']}
      />
      <Detail
        title='Dodatkowy komentarz:'
        data={item['12. Dodatkowy komentarz:']}
      />
    </Box>
  );
};

/* 
1. Inicjały pacjenta:: "I P"
2. Wiek pacjenta:: "24"
3. Jak długo pacjent stara się o potomstwo?: "2"
4.1 Jeżli wykonywał, to jakie badania?: "Normospermia,OAT III,Azoosspermia"
4. Ile razy pacjent wykonał badania nasienia w czasie starań o ciążę?: "3"
5. Choroby towarzyszące:: "Urologiczne,Chirurgiczne"
6. Ocena ginekologiczna czynnika żeńskiego:: "Zaburzenia owilacji"
7. Czy pacjent chorował w ostatnim czasie na COVID?: "Tak"
8.1 Jeżeli tak, to ile dawek?: "2"
8.2 Czy wystąpiły odczyny poszczepienne ?: "Nie"
8. Czy jest zaszczepiony przeciw SARS-COV-2?: "Nie"
9.1 Jeśli tak, to czy nastąpiło:: "Poprawa"
9. Czy wykonywał badania nasienia w okresie około-COVID?: "Nie"
10.1 Jeśli tak to jaka?: "-"
10. Czy była stosowana / stosuje terapia poprawiającą płodność?: "Nie"
11.1 Jeśli tak, to jaki preparat i jak długo?: "-"
11. Czy stosował / stosuje terapie stresu oksydacyjnego (suplementy)?: "Tak"
12. Dodatkowy komentarz:: "-"
Adres e-mail: "adam@walukiewicz.eu"
Lekarz: "Adam Walukiewicz"
Pierwsze: "Pierwsze"
Sygnatura czasowa: "24.05.2021, 13:47:39"
row_id: 2 
*/

export default PatientDetails;
