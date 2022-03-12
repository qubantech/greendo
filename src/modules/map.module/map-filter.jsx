import React, {useCallback, useEffect, useState} from 'react';
import {Button, Group} from "@mantine/core";
import all_button from "../../app.module/app.resources/app.resources.map/icons/button_all.svg";
import {useTrashTypeList} from "../../app.module/app.services/app.type.service";
import {watchObject} from "../../app.module/app.configs/firebase-operations";

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
    const [allFilters, setAllFilters] = useState(true);
    const trashTypeList = useTrashTypeList();


    useEffect( () => {
        if (trashTypeList.watchedObject != null) {
            let tempFilter = []
            trashTypeList.watchedObject.forEach( (element, index) => {
                let tempElement = {
                    "id": index,
                    "name": element.name,
                    "description": element.description,
                    "trashTypeId": element.trashTypeId,
                    "imageUrl": element.imageUrl,
                    "color": element.color,
                    "selected": true
                };
                tempFilter.push(tempElement);
            })

            setFilter(tempFilter);
        }

    },[trashTypeList.watchedObject])

    const onAllClick = useCallback(
        () => {
            let t = !allFilters;
            setAllFilters(t);

            let filterTemp = filter;
            filterTemp.map( (e) => {
                e.selected = t;
            })
            setFilter(filterTemp);

            console.log(filterTemp)
            props.setObjectManagerFilter( () => (object) => {
                return t;
            });
        }, [filter, allFilters],
    )

    const onClick = useCallback ((element) => {
        setAllFilters(false);

        let filterTemp = filter;
        filterTemp[element].selected = !filterTemp[element].selected;
        setFilter(filterTemp);

        console.log(filterTemp)

        props.setObjectManagerFilter( () => (object) => {
            let check = false;
            object.properties.trashTypeIdList.forEach( (e) => {
                if (filterTemp[e].selected) check = true;
            })
            return check;
        });
    }, [filter]
    )

    return (
            <>
                {
                    trashTypeList.watchedObject &&
                    <div style={{maxHeight: "50px", overflowY: "hidden"}}>
                        <Group noWrap style={button_area_style}>
                            <Button
                                size="md"
                                radius="lg"
                                style={{
                                    ...btn_style_default,
                                    backgroundColor: allFilters ? "#CBEAAB" : "#F5F5F5",
                                }}
                                onClick={ () => onAllClick() }
                            >
                                <img
                                    src={all_button}
                                    alt={"all"}
                                    width={"15px"}
                                    style={{marginRight: "5px"}}
                                />
                                Все
                            </Button>
                            {
                                filter.filter((element,index) => {
                                    return index % 2 == 0;
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
                                    return index % 2 == 1;
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