import { ComponentType } from 'react';

export type FinanceAnalyticTabParamList = {
  Week: undefined;
  Month: undefined;
  All: undefined;
};

export type FinanceAnalyticTabItem = {
  name: keyof FinanceAnalyticTabParamList;
  component: ComponentType<{}>;
  options: { title: string };
};
