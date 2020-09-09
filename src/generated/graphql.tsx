import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  bobas: Array<Boba>;
};

export type Boba = {
  __typename?: 'Boba';
  _id: Scalars['String'];
  drinkName: Scalars['String'];
  sugarLevel: Scalars['String'];
  iceLevel: Scalars['String'];
  fullName: Scalars['String'];
  user: User;
};

export type AddBobaInput = {
  drinkName: Scalars['String'];
  sugarLevel: Scalars['String'];
  iceLevel: Scalars['String'];
  userId: Scalars['String'];
};

export type UpdateBobaInput = {
  drinkName?: Maybe<Scalars['String']>;
  sugarLevel?: Maybe<Scalars['String']>;
  iceLevel?: Maybe<Scalars['String']>;
};

export type PasswordInput = {
  password: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type RegisterUserInput = {
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bobas: Array<Boba>;
  users: Array<User>;
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBoba: Boba;
  deleteBoba: Scalars['Boolean'];
  updateBoba: Boba;
  changePassword?: Maybe<User>;
  confirmUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  register: User;
};


export type MutationAddBobaArgs = {
  data: AddBobaInput;
};


export type MutationDeleteBobaArgs = {
  bobaId: Scalars['String'];
};


export type MutationUpdateBobaArgs = {
  updatedInput: UpdateBobaInput;
  bobaId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterUserInput;
};

export type ConfirmMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName'>
    & { bobas: Array<(
      { __typename?: 'Boba' }
      & Pick<Boba, 'drinkName' | 'iceLevel' | 'sugarLevel'>
    )> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'email'>
  ) }
);


export const ConfirmDocument = gql`
    mutation Confirm($token: String!) {
  confirmUser(token: $token)
}
    `;

export function useConfirmMutation() {
  return Urql.useMutation<ConfirmMutation, ConfirmMutationVariables>(ConfirmDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    firstName
    lastName
    bobas {
      drinkName
      iceLevel
      sugarLevel
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  register(data: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {
    firstName
    lastName
    email
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};