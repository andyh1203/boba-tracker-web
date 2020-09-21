import { Box, Heading, Text, IconButton } from '@chakra-ui/core'
import React from 'react'
import { useLikeBobaMutation, useMeQuery, CommonBobaFragment } from '../generated/graphql'
import { isServer } from '../utils/isServer';

interface BobaInfoProps {
    boba: CommonBobaFragment 
}

export const BobaInfo: React.FC<BobaInfoProps> = ({boba}) => {
    const [{ data: me }] = useMeQuery({ pause: isServer() });
    const [, likeBoba]  = useLikeBobaMutation()
    const handleLike = (bobaId: string) => () => {
        likeBoba({bobaId})
      }
    
  return (
    <Box key={boba._id} p={5} shadow="md" borderWidth="1px">
    <Heading fontSize="xl">{boba.drinkName}</Heading>
    Added by {boba.user.lastName}, {boba.user.firstName}
    <Text mt={4}>
    Ice: {boba.iceLevel}, Sugar: {boba.sugarLevel}
    </Text>
    <Box>
    Likes: {boba.likes.length}
    {
    me?.me && !boba.likes.includes(me.me!._id) 
    ? <IconButton aria-label="like" size="xs" icon="triangle-up" variant="outline" onClick={handleLike(boba._id)} m="auto">Like</IconButton> 
    : <IconButton aria-label="dislike" size="xs" icon="triangle-down" variant="outline" onClick={handleLike(boba._id)} m="auto">Like</IconButton>}
    </Box>
  </Box>
  )
}