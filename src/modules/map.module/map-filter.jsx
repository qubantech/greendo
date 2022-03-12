import React, {useCallback, useEffect, useState} from 'react';
import {Button, Group} from "@mantine/core";
import {useTrashTypeList} from "../../app.module/app.services/app.type.service";

const btn_style_default = {
    color: "#1E1E1E",
    // marginRight: "5px",
    fontSize: "15px",
    paddingLeft: "8px",
    paddingRight: "8px",
}

const circle_style = {
    height: "20px",
    width: "20px",
    border: "solid",
    borderWidth: "1px",
    borderRadius: "50%",
    display:"inline-block",
    marginRight: "5px",
}

const button_area_style = {
    overflow: "auto",
    paddingBottom: "40px",
}

const MapFilter = (props) => {
    const [filter, setFilter] = useState([]);
    const trashTypeList = useTrashTypeList();

    useEffect( () => {
        if (trashTypeList.watchedObject != null) {
            let tempFilter = []
            console.log(trashTypeList.watchedObject )
            trashTypeList.watchedObject.forEach( (element, index) => {
                let tempElement = {
                    "id": index,
                    "name": element.name,
                    "description": element.description,
                    "trashTypeId": element.trashTypeId,
                    "imageUrl": element.imageUrl,
                    "color": element.color,
                    "selected": false
                };
                tempFilter.push(tempElement);
            })
            tempFilter[0].selected = true;
            setFilter(tempFilter);
        }

    },[trashTypeList.watchedObject])

    const onClick = useCallback ((element) => {

        let filterTemp = filter;
        filterTemp[element].selected = !filterTemp[element].selected;
        setFilter(filterTemp);

        // console.log(filterTemp)

        props.setObjectManagerFilter( () => (object) => {
            let check = true;
            // console.log(filter)

            let selectedFilter = filter.filter( (e) => {
                return e.selected
            })

            selectedFilter.forEach( (e) => {
                // console.log(object.properties.trashTypeIdList.includes(e.id))

                // console.log(e)
                if (object.properties.trashTypeIdList.includes(e.id) === false) check = false;
            })

            // console.log(check)
            return check && selectedFilter.length !== 0;
        });
    }, [filter]
    )

    return (
            <>
                {
                    trashTypeList.watchedObject &&
                    <div style={{maxHeight: "50px", overflowY: "hidden"}}>
                        <Group noWrap style={button_area_style}>
                            {
                                filter.filter((element,index) => {
                                    return index % 2 === 0;
                                }).map( (e) => {
                                    return (
                                        <Button
                                            key={e.name}
                                            size="md"
                                            radius="lg"
                                            style={{
                                                ...btn_style_default,
                                                backgroundColor: e.selected ? e.color : "#F5F5F5",
                                            }}
                                            onClick={ () => onClick(e.id) }
                                        >
                            <span style={{
                                ...circle_style,
                                backgroundColor: e.color,
                                borderColor: e.selected ? "#000" : e.color,
                            }}></span>
                                            { e.name }
                                        </Button>
                                    )
                                })
                            }
                        </Group>
                    </div>
                }

                {
                    trashTypeList.watchedObject &&
                    <div style={{maxHeight: "50px", overflowY: "hidden"}}>
                        <Group noWrap style={button_area_style}>
                            {
                                filter.filter((element, index) => {
                                    return index % 2 === 1;
                                }).map( (e) => {
                                    return (
                                        <Button
                                            key={e.name}
                                            size="md"
                                            radius="lg"
                                            style={{
                                                ...btn_style_default,
                                                backgroundColor: e.selected ? e.color : "#F5F5F5",
                                            }}
                                            onClick={ () => onClick(e.id) }
                                        >
                            <span style={{
                                ...circle_style,
                                backgroundColor: e.color,
                                borderColor: e.selected ? "#000" : e.color,
                            }}></span>
                                            { e.name }
                                        </Button>
                                    )
                                })
                            }
                        </Group>
                    </div>
                }
            </>
    );
};

export default MapFilter;