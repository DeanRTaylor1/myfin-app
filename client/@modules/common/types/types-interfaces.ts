import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

interface MobileNavProps {
  authItems: React.ReactElement[];
  navItems: React.ReactElement[];
  profileItems: React.ReactElement[];
  scale: string;
  mobileNavHandler: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    source?: string
  ) => void;
  mobileProfileHandler: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    source?: string
  ) => void;
}

type ProfileMenuProps = {
  authItems: React.ReactElement[];
  profileItems: React.ReactElement[];
  mobileProfileHandler: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    source?: string
  ) => void;
  profileScale: string;
  mobileNavHandler: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    source?: string
  ) => void;
};

interface LogoProps {
  color?: string;
  mobileNavHandler: (event: any, source?: string) => void;
  mobileProfileHandler: (event: any, source?: string) => void;
}

interface inputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  getInputs: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
}

type Methods = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get';

interface useRequest {
  url: string;
  method: Methods;
  body: any;
  onSuccess: (data?: any) => void;
}


interface CustomPropsWithChildren extends PropsWithChildren {
  currentUser?: currentUserProps;
}

interface PropsWithAuth {
  currentUser: currentUserProps;
}

interface FormerrorsProps {
  errors: string[];
}

type Article = {
  abstract: string;
  web_url: string;
  lead_paragraph: string;
  news_desk: string;
};

interface ArticleContainerProps {
  abstract: string;
  web_url: string;
  lead_paragraph: string;
  news_desk: string;
}

type currentUserProps = {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
};

type userProfileData = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  monthlySalary: number;
  username: string;
  currency: string;
  phone: string;
};

export const color = {
  blue: '#60a5fa',
};

type profileState = {
  monthlySalary: number;
  currency: string;
  phone: string;
  savingsTarget: number;
  savingsRate: number;
  currentSavings: number;
};

type profileUpdateActionType = {
  type: string;
  value: string;
  key: profileUpdateActionTypeKey;
};

type profileUpdateActionTypeKey =
  | 'monthlySalary'
  | 'currency'
  | 'phone'
  | 'savingsTarget'
  | 'savingsRate'
  | 'currentSavings';

type userDataItem = {
  name: string;
  value: string;
  tag: string;
};

type userStateData = userDataItem[];

type OutgoingRecord = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  item: string;
  currency: string;
  userId: number;
  tag: string;
  cost: number;
};

type ExpenseRecord = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  item: string;
  currency: string;
  userId: number;
  tag: string;
  cost: number;
  dateSpent: Date | string;
};

export type {
  MobileNavProps,
  userProfileData,
  LogoProps,
  inputProps,
  Methods,
  useRequest,
  CustomPropsWithChildren,
  PropsWithAuth,
  FormerrorsProps,
  ArticleContainerProps,
  Article,
  currentUserProps,
  profileState,
  profileUpdateActionType,
  userDataItem,
  userStateData,
  OutgoingRecord,
  ProfileMenuProps,
  ExpenseRecord,
  profileUpdateActionTypeKey,
};
