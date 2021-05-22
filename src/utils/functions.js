/* // Function creating form from JSON
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
}; */

{/* <Form
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
</Form>; */}
