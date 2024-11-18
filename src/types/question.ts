export type QuestionType = {
  id: string;
  question: string;
  answer: string;
  date: string;
  fav: boolean;
};

export type DrawerParamList = {
  Home: undefined;
  QuestionDetail: QuestionType;
};
