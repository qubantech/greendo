import { Modal } from '@mantine/core';
import React from 'react';

const StatusModal = (props:{isOpen:boolean, setOpen:any, children:JSX.Element}) => {
    return (
        <Modal
        opened={props.isOpen}
        onClose={() => props.setOpen(false)}
        >
            {props.children}
        </Modal>
    );
};

export default StatusModal;