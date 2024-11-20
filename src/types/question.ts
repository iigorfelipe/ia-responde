export type QuestionType = {
  id: string;
  question: string;
  answer: string;
  created: number;
  fav: boolean;
};

export type DrawerParamList = {
  Home: undefined;
  FavoriteQuestions: undefined;
  QuestionDetail: QuestionType;
};
