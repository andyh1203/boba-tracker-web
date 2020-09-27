import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import { pipe, tap } from "wonka";
import {
  BobasDocument, BobasQuery, DeleteBobaMutation, DeleteBobaMutationVariables, LikeBobaMutation, LikeBobaMutationVariables, LoginMutation, LogoutMutation,
  MeDocument, MeQuery,
  RegisterMutation
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import gql from "graphql-tag";
import { isServer } from "./isServer";
import { argsToArgsConfig } from "graphql/type/definition";


const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      }
    })
  );
};

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    let results: string[] = [];
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isInCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "bobas"
    );
    info.partial = !isInCache;
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "bobas") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });
    return {
      __typename: "PaginatedBobas",
      hasMore,
      bobas: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";

  if (isServer()) {
    cookie = ctx?.req.headers.cookie;
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedBoba: () => null,
        },
        resolvers: {
          Query: {
            bobas: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            deleteBoba: (_result, args, cache, _info) => {
                cache.invalidate({__typename: "Boba", _id: (args as DeleteBobaMutationVariables).bobaId})
            },
            logout: (_result, _args, cache, _info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            addBoba: (_result, _args, cache, _info) => { 
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info) => info.fieldName === "bobas"
              )
              fieldInfos.forEach((fi) => {
                cache.invalidate(
                  'Query', 
                  'bobas', 
                  fi.arguments || {}
                )
              })
            },
            likeBoba: (result, args, cache, _info) => { 
              const {bobaId} = args as LikeBobaMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Boba {
                    _id
                    likes
                  }
                `,
                {_id: bobaId} as any
              )
              // Somehow need to access "me" here 
              if (data && result.likeBoba) {
                const userId = result.likeBoba;
                cache.writeFragment(
                  gql`
                    fragment __ on Boba {
                      _id
                      likes
                    }
                  `,
                  {_id: bobaId, likes: [...data.likes, userId]} as any
                )
              }
            },
            dislikeBoba: (result, args, cache, _info) => { 
              const {bobaId} = args as LikeBobaMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Boba {
                    _id
                    likes
                  }
                `,
                {_id: bobaId} as any
              )
              if (data) {
                const userId = result.dislikeBoba;
                cache.writeFragment(
                  gql`
                    fragment __ on Boba {
                      _id
                      likes
                    }
                  `,
                  {_id: bobaId, likes: data.likes.filter(l => l !== userId)} as any
                )
              }
            },
            login: (_result, _args, cache, _info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (!result.login) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },
            register: (_result, _args, cache, _info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (!result.register) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  }
};
