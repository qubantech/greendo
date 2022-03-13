import React from 'react';
import {Modal, Title, Text, Group, Table} from "@mantine/core"
// @ts-ignore
import barcode from "./img/barcode.png"


const saleModal = (props:{open:boolean, setOpen:any , obj:number}) => {
    return (
        <Modal
            opened={props.open}
            onClose={() => props.setOpen(false)}
            title={<Title order={2}>Купон</Title>}
        >
            {/*<Text>{props.obj}</Text>*/}
            <img width={"90%"} height={"auto"} src={barcode}/>
        </Modal>
    );
};

export default saleModal