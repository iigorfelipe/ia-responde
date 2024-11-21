import axios from 'axios';
import Constants from 'expo-constants';
import { fakeQuestions } from '../mock/fake-questions';

function fetchFakeResponse(question: string) {
  const fakeResponse = fakeQuestions[question] ?? {
    id: `chatcmpl-fake-not-found${Math.floor(Date.now() / 1000)}`,
    created: Math.floor(Date.now() / 1000),
    usage: {
      total_tokens: 0,
    },
    choices: [
      {
        message: {
          content:
            'Não consegui elaborar uma resposta para essa pergunta agora. Tente reformulá-la ou faça outra.',
        },
      },
    ],
  };

  const { id, created, usage, choices } = fakeResponse;
  const answer = choices[0].message.content.trim();
  const tokensUsed = usage.total_tokens;

  return { id, answer, tokensUsed, created, error: null };
}

async function fetchRealOpenAIResponse(question: string) {
  const { OPEN_IA_API_KEY } = Constants.expoConfig?.extra;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Você é um assistente útil.' },
          { role: 'user', content: question },
        ],
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPEN_IA_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const id = response.data.id;
    const answer = response.data.choices[0].message.content.trim();
    const created = response.data.created;
    const tokensUsed = response.data.usage.total_tokens;

    return { id, answer, created, tokensUsed, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error?.message;

      return { error: { status, message } };
    } else {
      return { error: { status: 'unknown', message: 'Erro desconhecido' } };
    }
  }
}

export function fetchOpenAIResponse(question: string, useFakeData: boolean = false) {
  if (useFakeData) {
    return fetchFakeResponse(question);
  }

  return fetchRealOpenAIResponse(question);
}