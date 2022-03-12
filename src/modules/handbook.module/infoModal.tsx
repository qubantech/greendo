import {Group, LoadingOverlay, Modal, Title, Text} from '@mantine/core';
import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useTrashTypeList} from "../../app.module/app.services/app.type.service";

const InfoModal = () => {
    let navigate = useNavigate()
    const trashlist = useTrashTypeList()
    let params = useParams()
    return (
        <>
        {trashlist.watchedObject &&
            (<Modal
            opened={true}
            onClose={() => navigate("/handbook")}
            title={
                <Group>
                    <img width={40} src={trashlist.watchedObject[Number(params.id)]?.imageUrl || undefined}/>
                    <Title order={3}>{trashlist.watchedObject[Number(params.id)]?.name}</Title>
                </Group>
            }
            >
                <Text color={"gray"} size={"sm"}>Описание:</Text>
                <div dangerouslySetInnerHTML={{__html: (trashlist?.watchedObject[Number(params.id)]?.description || "Empty")}}/>
                <Text>{trashlist.watchedObject[Number(params.id)]?.trashTypeId}</Text>
            </Modal>) || <LoadingOverlay visible={true}/>
        }
        </>
    );
};

export default {
    routeProps: {
        path: '/handbook/:id',
        exact: true,
        index: false,
        element: <InfoModal/>,
    },
    name: 'InfoModal',
};