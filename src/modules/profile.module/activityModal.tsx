import React from 'react';
import {Takeout} from "../../app.module/app.models/models";
import {Modal, Title, Text, Group, Table} from "@mantine/core"
import {useTrashTypeList} from "../../app.module/app.services/app.type.service";
import {useFundomateList} from "../../app.module/app.services/app.fundomate.service";


const ActivityModal = (props:{open:boolean, setOpen:any , obj:Takeout | undefined}) => {
    const lists = useTrashTypeList()
    const fandomatinfo = useFundomateList()
    let x:Number
    return (
        <Modal
        opened={props.open}
        onClose={() => props.setOpen(false)}
        title={<Title order={2}>Подробнее об операции</Title>}
        >
            <Title order={1} sx={{color:"green"}}> +{
                props.obj && props.obj.trashTypeCountMap &&
                Object.entries(props.obj.trashTypeCountMap).map(i =>
                    //@ts-ignore
                    x += (Number(i[1]) * props.obj.trashTypePriceMap[Number(i[0])]), x = 0).reverse()[0]
            } G</Title>
            <Table>
                <thead>
                    <tr>
                        <th>Тип</th>
                        <th>Количество</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
            {props.obj?.trashTypeCountMap && Object.entries(props.obj?.trashTypeCountMap).map((obj) => {
                return (
                    <tr key={obj[0]}>
                        <td> {obj[0] && lists.watchedObject && lists.watchedObject[Number(obj[0])]?.name}</td>
                        <td>{obj[1] && obj[1]}</td>
                        <td>{obj[0] && props.obj?.trashTypePriceMap && props.obj?.trashTypePriceMap[Number(obj[0])]}</td>
                    </tr>
                )
            })}
                </tbody>
            </Table>
            <Text>
                FundomatID: { props.obj && props.obj?.fundomateId}
                {fandomatinfo.watchedObject && Object.entries(fandomatinfo.watchedObject).map((obj) => {
                    console.log(obj)
                })}
            </Text>
            <Text> Время: {props.obj && new Date(props.obj.timestamp).toLocaleString("ru")}
            </Text>
        </Modal>
    );
};

export default ActivityModal;