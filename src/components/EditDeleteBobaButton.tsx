import React, { useState } from 'react'
import { CommonBobaFragment, useDeleteBobaMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer';
import NextLink from "next/link";
import { IconButton } from '@chakra-ui/core';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useRouter } from 'next/router';

interface EditDeleteBobaButtonProps {
    boba: CommonBobaFragment
}

export const EditDeleteBobaButton: React.FC<EditDeleteBobaButtonProps> = ({boba}) => {
    const [{ data: me }] = useMeQuery({ pause: isServer() });
    const bobaId = boba._id.toString();
    const [deleteLoading, setDeleteLoading] = useState<'delete-loading' | 'not-loading'>("not-loading")
    const [, deleteBoba] = useDeleteBobaMutation()
    const router = useRouter();
    if (me?.me && boba.user._id.toString() === me?.me._id.toString()) {
        return (
            <>
            <NextLink href="/boba/edit/[id]" as={`/boba/edit/${bobaId}`}>
            <IconButton 
              aria-label="update" 
              as={AiFillEdit} 
              onClick={async () => {
                router.push(`/boba/edit/${bobaId}`)
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
                await deleteBoba({bobaId})
                setDeleteLoading("not-loading")
              }} 
              size="xs" 
              variant="outline"
            />
            </>
        )
    }
  return <></>
}