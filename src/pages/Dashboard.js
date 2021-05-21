import React, { useState } from 'react';

import {
  Box,
  Button,
  CheckBoxGroup,
  Form,
  FormField,
  Grid,
  InfiniteScroll,
  RadioButtonGroup,
  Text,
  TextInput,
} from 'grommet';
import Layout from '../components/Layout';
import form from '../utils/form.json';
import PatientCard from '../components/PatientCard';

const defaultState = {};

const Dashboard = () => {
  const [formState, setFormState] = useState();
  console.log(formState);

  // Function creating form from JSON
  const createFormElement = (question) => {
    switch (question.type) {
      case 'text':
        return (
          <TextInput
            type='text'
            name={question.questionId}
            // value={formState}
            // onChange={(event) => setFormState(event.target.value)}
          />
        );
      case 'number':
        return (
          <TextInput
            type='number'
            name={question.questionId}
            // value={formState}
            // onChange={(event) => setFormState(event.target.value)}
          />
        );
      case 'radiobuttongroup':
        return (
          <RadioButtonGroup
            htmlFor={question.questionId}
            options={question.options}
            name={question.questionId}
            // value={formState}
            // onChange={(event) => setFormState(event.target.value)}
          />
        );
      case 'checkboxgroup':
        return (
          <CheckBoxGroup
            htmlFor={question.questionId}
            options={question.options}
            name={question.questionId}
            // value={formState}
            // onChange={(event) => setFormState(event.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      title='NHI Formularze'
      background='portrait-2'
      titleBackground='light-1'
    >
      <Grid
        rows={['large']}
        columns={['35%', '60%']}
        areas={[
          { name: 'form', start: [0, 0], end: [1, 0] },
          { name: 'table', start: [1, 0], end: [2, 0] },
        ]}
        gap='medium'
        margin='medium'
      >
        <Box gridArea='form' background='light-1' elevation='small'>
          <Box
            background='light-2'
            margin={{ bottom: 'medium' }}
            pad='medium'
            justify='center'
          >
            <Text size='large'>Aktualny formularz</Text>
          </Box>

          <Box overflow='auto' pad={{ horizontal: 'medium' }} height='100%'>
            <Form
              onSubmit={({ value }) => setFormState(value)}
              messages={{ required: 'Wymagane...' }}
            >
              {form
                ? form.content.map((question, index) => (
                    <Box key={question.questionId}>
                      <FormField
                        name={question.questionId}
                        label={
                          question.required
                            ? `${question.questionId}. ${question.question}
                              *
                            `
                            : `${question.questionId}. ${question.question}`
                        }
                        required={question.required}
                      >
                        {createFormElement(question)}
                      </FormField>

                      {question.dependentQuestions
                        ? question.dependentQuestions.map((subQuestion) => (
                            <FormField
                              key={subQuestion.questionId}
                              name={subQuestion.questionId}
                              label={
                                subQuestion.required
                                  ? `${subQuestion.questionId}. ${subQuestion.question}
                              *
                            `
                                  : `${subQuestion.questionId}. ${subQuestion.question}`
                              }
                              required={subQuestion.required}
                            >
                              {createFormElement(subQuestion)}
                            </FormField>
                          ))
                        : null}
                    </Box>
                  ))
                : null}
              <Box direction='row' pad='medium' justify='around'>
                <Button type='reset' label='Resetuj' size='large' />
                <Button type='submit' primary label='Prześlij' size='large' />
              </Box>
            </Form>
          </Box>
        </Box>

        <Box gridArea='table' background='light-1' elevation='small'>
          <Box
            background='light-2'
            margin={{ bottom: 'medium' }}
            pad='medium'
            justify='center'
          >
            <Text size='large'>Wyniki pacjentów</Text>
          </Box>
          <Box overflow='auto'>
            <Grid pad={{ horizontal: 'medium' }} gap='small'>
              <InfiniteScroll
                items={[
                  { name: 'Pacjet 1' },
                  { name: 'Pacjet 2' },
                  { name: 'Pacjet 3' },
                  { name: 'Pacjet 4' },
                  { name: 'Pacjet 5' },
                  { name: 'Pacjet 6' },
                  { name: 'Pacjet 6' },
                  { name: 'Pacjet 6' },
                  { name: 'Pacjet 6' },
                  { name: 'Pacjet 6' },
                  { name: 'Pacjet 6' },
                ]}
              >
                {(item) => <PatientCard name={item.name} />}
              </InfiniteScroll>

              {/* formState &&
              form.content.map((question) => (
                <>
                   <Text margin='xsmall' weight='bold'>
                    {question.question}
                  </Text>
                  <Text margin='xsmall'>
                    {Object.values(formState[question.questionId])}
                  </Text>
                </>
              )) */}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
