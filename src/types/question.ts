export type TokensType = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type QuestionType = {
  id: string;
  question: string;
  answer: string;
  created: number;
  tokensUsed: TokensType;
  fav: boolean;
};

export type DrawerParamList = {
  Home: undefined;
  FavoriteQuestions: undefined;
  QuestionDetail: QuestionType;
};

export type GroupedQuestions = Record<string, QuestionType[]>;
