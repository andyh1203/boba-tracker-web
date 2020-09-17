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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  bobas: Array<Boba>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Boba = {
  __typename?: 'Boba';
  _id: Scalars['String'];
  drinkName: Scalars['String'];
  sugarLevel: Scalars['String'];
  iceLevel: Scalars['String'];
  user: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  drinkDescription: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  type: Scalars['String'];
  field: Scalars['String'];
  message: Scalars['String'];
};

export type BobaResponse = {
  __typename?: 'BobaResponse';
  errors?: Maybe<Array<FieldError>>;
  boba?: Maybe<Boba>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  errors?: Maybe<Array<FieldError>>;
  users?: Maybe<Array<User>>;
};

export type BobaInput = {
  drinkName: Scalars['String'];
  sugarLevel: Scalars['String'];
  iceLevel: Scalars['String'];
};

export type RegisterUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bobas: Array<Boba>;
  users: UsersResponse;
  me?: Maybe<User>;
};


export type QueryBobasArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBoba: BobaResponse;
  deleteBoba: Scalars['Boolean'];
  updateBoba: BobaResponse;
  login?: Maybe<UserResponse>;
  changePassword?: Maybe<UserResponse>;
  confirmUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationAddBobaArgs = {
  data: BobaInput;
};


export type MutationDeleteBobaArgs = {
  bobaId: Scalars['String'];
};


export type MutationUpdateBobaArgs = {
  updatedInput: BobaInput;
  bobaId: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterUserInput;
};

export type CommonBobaFragment = (
  { __typename?: 'Boba' }
  & Pick<Boba, '_id' | 'drinkName' | 'sugarLevel' | 'iceLevel' | 'createdAt' | 'updatedAt'>
);

export type CommonErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'type' | 'field' | 'message'>
);

export type CommonUserFragment = (
  { __typename?: 'User' }
  & Pick<User, '_id' | 'email' | 'firstName' | 'lastName'>
  & { bobas: Array<(
    { __typename?: 'Boba' }
    & CommonBobaFragment
  )> }
);

export type CommonUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & CommonErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & CommonUserFragment
  )> }
);

export type AddBobaMutationVariables = Exact<{
  drinkName: Scalars['String'];
  sugarLevel: Scalars['String'];
  iceLevel: Scalars['String'];
}>;


export type AddBobaMutation = (
  { __typename?: 'Mutation' }
  & { addBoba: (
    { __typename?: 'BobaResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'type' | 'field' | 'message'>
    )>>, boba?: Maybe<(
      { __typename?: 'Boba' }
      & Pick<Boba, '_id' | 'drinkName' | 'sugarLevel' | 'iceLevel'>
    )> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'type' | 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & CommonUserFragment
    )> }
  )> }
);

export type ConfirmMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserResponse' }
    & CommonUserResponseFragment
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
    { __typename?: 'UserResponse' }
    & CommonUserResponseFragment
  ) }
);

export type BobasQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type BobasQuery = (
  { __typename?: 'Query' }
  & { bobas: Array<(
    { __typename?: 'Boba' }
    & CommonBobaFragment
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

export const CommonErrorFragmentDoc = gql`
    fragment CommonError on FieldError {
  type
  field
  message
}
    `;
export const CommonBobaFragmentDoc = gql`
    fragment CommonBoba on Boba {
  _id
  drinkName
  sugarLevel
  iceLevel
  createdAt
  updatedAt
}
    `;
export const CommonUserFragmentDoc = gql`
    fragment CommonUser on User {
  _id
  email
  firstName
  lastName
  bobas {
    ...CommonBoba
  }
}
    ${CommonBobaFragmentDoc}`;
export const CommonUserResponseFragmentDoc = gql`
    fragment CommonUserResponse on UserResponse {
  errors {
    ...CommonError
  }
  user {
    ...CommonUser
  }
}
    ${CommonErrorFragmentDoc}
${CommonUserFragmentDoc}`;
export const AddBobaDocument = gql`
    mutation AddBoba($drinkName: String!, $sugarLevel: String!, $iceLevel: String!) {
  addBoba(data: {drinkName: $drinkName, sugarLevel: $sugarLevel, iceLevel: $iceLevel}) {
    errors {
      type
      field
      message
    }
    boba {
      _id
      drinkName
      sugarLevel
      iceLevel
    }
  }
}
    `;

export function useAddBobaMutation() {
  return Urql.useMutation<AddBobaMutation, AddBobaMutationVariables>(AddBobaDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $token: String!) {
  changePassword(password: $password, token: $token) {
    errors {
      type
      field
      message
    }
    user {
      ...CommonUser
    }
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
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...CommonUserResponse
  }
}
    ${CommonUserResponseFragmentDoc}`;

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
    ...CommonUserResponse
  }
}
    ${CommonUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const BobasDocument = gql`
    query Bobas($limit: Int!, $cursor: String) {
  bobas(limit: $limit, cursor: $cursor) {
    ...CommonBoba
  }
}
    ${CommonBobaFragmentDoc}`;

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