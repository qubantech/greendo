import { Modal } from '@mantine/core';
import React, {useState} from 'react';

const errorModal = (props:{isOpen:boolean, msg:string}) => {
    return (
        <Modal
            opened={props.isOpen}
            onClose={() => props.isOpen = false}>
            {props.msg}
        </Modal>
    );
}

export default errorModal;