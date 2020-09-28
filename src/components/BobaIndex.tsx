import { Box, Flex, Heading, IconButton, Link, Text } from '@chakra-ui/core';
import NextLink from "next/link";
import React, { useState } from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { CommonBobaFragment, useDislikeBobaMutation, useLikeBobaMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import { EditDeleteBobaButton } from './EditDeleteBobaButton';

interface BobaIndexProps {
    boba: CommonBobaFragment 
}

export const BobaIndex: React.FC<BobaIndexProps> = ({boba}) => {
    const [likeLoading, setLikeLoading] = useState<'like-loading' | 'dislike-loading' | 'not-loading'>('not-loading');

    const [{ data: me }] = useMeQuery({ pause: isServer() });
    const [, likeBoba]  = useLikeBobaMutation()
    const [, dislikeBoba] = useDislikeBobaMutation()
    
  return (
    <Box p={5} shadow="md" borderWidth="1px">
    <Heading fontSize="xl">
    <NextLink href="/boba/[id]" as={`/boba/${boba._id}`}>
      <Link>
      {boba.drinkName}
      </Link>
      </NextLink> 
    </Heading>
    Added by {boba.user.lastName}, {boba.user.firstName}
    <Text mt={4}>
    Ice: {boba.iceLevel}, Sugar: {boba.sugarLevel}
    </Text>
    <Flex ml={"auto"}>
    {
      me?.me && !boba.likes.includes(me.me!._id) 
      ? <IconButton 
          mr={2} 
          isLoading={likeLoading === 'like-loading'} 
          aria-label="like" 
          as={AiOutlineLike} 
          onClick={async () => {
            setLikeLoading('like-loading');
            await likeBoba({bobaId: boba._id});
            setLikeLoading('not-loading')
          }} 
          size="xs" 
          variant="outline"
        />
      : <IconButton 
          mr={2} 
          isLoading={likeLoading === 'dislike-loading'} 
          aria-label="like" 
          as={AiFillLike} 
          onClick={async () => {
            setLikeLoading('dislike-loading');
            await dislikeBoba({bobaId: boba._id});
            setLikeLoading('not-loading')
          }} 
          size="xs" 
          variant="outline"
        />
    }
        <b>{boba.likes.length}</b>
      <Flex flex={1} m="auto" justifyContent="flex-end">
      <EditDeleteBobaButton boba={boba}/>
      </Flex>
    </Flex>
  </Box>
  )
}