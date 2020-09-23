import { Box, Heading, Text, IconButton } from '@chakra-ui/core'
import React, { useState } from 'react'
import { useLikeBobaMutation, useMeQuery, CommonBobaFragment, useDislikeBobaMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer';
import {AiOutlineLike, AiFillLike} from 'react-icons/ai';

interface BobaIndexProps {
    boba: CommonBobaFragment 
}

export const BobaIndex: React.FC<BobaIndexProps> = ({boba}) => {
    const [loading, setLoading] = useState<'like-loading' | 'dislike-loading' | 'not-loading'>('not-loading');
    const [{ data: me }] = useMeQuery({ pause: isServer() });
    const [, likeBoba]  = useLikeBobaMutation()
    const [, dislikeBoba] = useDislikeBobaMutation()
    
  return (
    <Box p={5} shadow="md" borderWidth="1px">
    <Heading fontSize="xl">{boba.drinkName}</Heading>
    Added by {boba.user.lastName}, {boba.user.firstName}
    <Text mt={4}>
    Ice: {boba.iceLevel}, Sugar: {boba.sugarLevel}
    </Text>
    <Box>
    {
      me?.me && !boba.likes.includes(me.me!._id) 
      ? <IconButton 
          mr={2} 
          isLoading={loading === 'like-loading'} 
          aria-label="like" 
          as={AiOutlineLike} 
          onClick={async () => {
            setLoading('like-loading');
            await likeBoba({bobaId: boba._id});
            setLoading('not-loading')
          }} 
          size="xs" 
          variant="outline"
        />
      : <IconButton 
          mr={2} 
          isLoading={loading === 'dislike-loading'} 
          aria-label="like" 
          as={AiFillLike} 
          onClick={async () => {
            setLoading('dislike-loading');
            await dislikeBoba({bobaId: boba._id});
            setLoading('not-loading')
          }} 
          size="xs" 
          variant="outline"
        />
    }
    <b>{boba.likes.length}</b>
    </Box>
  </Box>
  )
}