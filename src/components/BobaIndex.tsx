import { Box, Heading, Text, IconButton, Link, Flex } from '@chakra-ui/core'
import React, { useState } from 'react'
import { useLikeBobaMutation, useMeQuery, CommonBobaFragment, useDislikeBobaMutation, useDeleteBobaMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer';
import {AiOutlineLike, AiFillLike, AiFillDelete, AiFillEdit} from 'react-icons/ai';
import NextLink from "next/link";
import { useRouter } from 'next/router';

interface BobaIndexProps {
    boba: CommonBobaFragment 
}

export const BobaIndex: React.FC<BobaIndexProps> = ({boba}) => {
    const [likeLoading, setLikeLoading] = useState<'like-loading' | 'dislike-loading' | 'not-loading'>('not-loading');
    const [deleteLoading, setDeleteLoading] = useState<'delete-loading' | 'not-loading'>("not-loading")
    const [{ data: me }] = useMeQuery({ pause: isServer() });
    const [, likeBoba]  = useLikeBobaMutation()
    const [, dislikeBoba] = useDislikeBobaMutation()
    const [, deleteBoba] = useDeleteBobaMutation()
    const router = useRouter();
    
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
      {
        me?.me && boba.user._id.toString() === me?.me._id.toString() 
        ?  (
          <>
            <NextLink href="/boba/edit/[id]" as={`/boba/edit/${boba._id}`}>
            <IconButton 
              aria-label="update" 
              as={AiFillEdit} 
              onClick={async () => {
                router.push(`/boba/edit/${boba._id}`)
              }} 
              size="xs" 
              variant="outline"
              
            />
            </NextLink> 
          <IconButton 
              isLoading={deleteLoading === 'delete-loading'} 
              aria-label="delete" 
              as={AiFillDelete} 
              onClick={async () => {
                setDeleteLoading("delete-loading")
                await deleteBoba({bobaId: boba._id})
                setDeleteLoading("not-loading")
              }} 
              size="xs" 
              variant="outline"
              
            />
            </>
          ) : <></>
      }
      </Flex>
    </Flex>
  </Box>
  )
}