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

export type CommonUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'email' | 'firstName' | 'lastName'>
);

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'User' }
    & CommonUserFragment
  )> }
);

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
    & { bobas: Array<(
      { __typename?: 'Boba' }
      & Pick<Boba, 'drinkName' | 'iceLevel' | 'sugarLevel'>
    )> }
    & CommonUserFragment
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
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
    & CommonUserFragment
  ) }
);

export type BobasQueryVariables = Exact<{ [key: string]: never; }>;


export type BobasQuery = (
  { __typename?: 'Query' }
  & { bobas: Array<(
    { __typename?: 'Boba' }
    & Pick<Boba, '_id' | 'drinkName' | 'sugarLevel' | 'iceLevel'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & CommonUserFragment
  )> }
);

export const CommonUserFragmentDoc = gql`
    fragment CommonUser on User {
  _id
  email
  firstName
  lastName
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $token: String!) {
  changePassword(data: {password: $password, token: $token}) {
    ...CommonUser
  }
}
    ${CommonUserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
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
    ...CommonUser
    bobas {
      drinkName
      iceLevel
      sugarLevel
    }
  }
}
    ${CommonUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  register(data: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}) {
    ...CommonUser
  }
}
    ${CommonUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const BobasDocument = gql`
    query Bobas {
  bobas {
    _id
    drinkName
    sugarLevel
    iceLevel
  }
}
    `;

export function useBobasQuery(options: Omit<Urql.UseQueryArgs<BobasQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BobasQuery>({ query: BobasDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...CommonUser
  }
}
    ${CommonUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};