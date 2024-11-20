export const dataTemplate = {
  id: 'chatcmpl-fake123',
  object: 'chat.completion',
  created: Math.floor(Date.now() / 1000),
  model: 'gpt-3.5-turbo',
  usage: {
    prompt_tokens: 13,
    completion_tokens: 7,
    total_tokens: 20,
    completion_tokens_details: {
      reasoning_tokens: 0,
      accepted_prediction_tokens: 0,
      rejected_prediction_tokens: 0,
    },
  },
  choices: [
    {
      message: {
        role: 'assistant',
        content: '',
      },
      logprobs: null,
      finish_reason: 'stop',
      index: 0,
    },
  ],
};

const questionsAndAnswers = [
  {
    question: 'Qual o valor de pi?',
    answer:
      'O valor de pi (π) é aproximadamente 3,14159. É uma constante matemática que representa a razão entre a circunferência de um círculo e seu diâmetro. Pi é um número irracional, o que significa que suas casas decimais são infinitas e não se repetem de forma periódica.',
  },
  {
    question: 'Qual o tamanho do sistema solar?',
    answer:
      'O Sistema Solar tem um tamanho de cerca de 15 trilhões de quilômetros até a Nuvem de Oort, a sua borda teórica.',
  },
  {
    question: 'Quanto é 1 + 1?',
    answer: '1 + 1 é igual a 2',
  },
];

export const fakeQuestions = Object.fromEntries(
  questionsAndAnswers.map((item, index) => [
    item.question,
    {
      ...dataTemplate,
      id: `chatcmpl-fake${index + 1}`,
      choices: [
        {
          ...dataTemplate.choices[0],
          message: {
            ...dataTemplate.choices[0].message,
            content: item.answer,
          },
        },
      ],
    },
  ]),
);
