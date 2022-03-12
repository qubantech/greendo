import React, {useCallback, useState} from 'react';
import {Button, Group} from "@mantine/core";
import all_button from "../../app.module/app.resources/app.resources.map/icons/button_all.svg";

const filter_parameters = {
    "Glass": {
        title: "Стекло",
        selected: true,
        backgroundColor: "#ACABEA",
    },
    "Plastic": {
        title: "Пластик",
        selected: true,
        backgroundColor: "#F9C96D",
    },
    "Metall": {
        title: "Металл",
        selected: true,
        backgroundColor: "#FFB7A7",
    },
    "Cardboard": {
        title: "Картон",
        selected: true,
        backgroundColor: "#EDA7FF",
    },
    "paper": {
        title: "Бумага",
        selected: true,
        backgroundColor: "#A7F4FF",

    },
    "Trash": {
        title: "Вторсырье",
        selected: true,
        backgroundColor: "#779DFF",
    },
}

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
    const [filter, setFilter] = useState(filter_parameters);
    const [allFilters, setAllFilters] = useState(true);

    const onAllClick = useCallback(
        () => {
            let t = !allFilters;
            setAllFilters(t);

            Object.entries(filter).map( (e) => {
                e[1].selected = t;
            })

            props.setObjectManagerFilter( () => (object) => {
                return filter[object.properties.content].selected;
            });
        }, [filter, allFilters],
    )

    const onClick = useCallback ((element) => {

        setAllFilters(false);

        let filterTemp = filter;
        filterTemp[element].selected = !filterTemp[element].selected;
        setFilter(filterTemp);

        props.setObjectManagerFilter( () => (object) => {
            return filter[object.properties.content].selected;
        });
    }, [filter]
    )

    return (
        <>
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
                    Object.entries(filter).filter((element,index) => {
                        return index % 2 == 0;
                    }).map( (e) => {
                        return (
                            <Button
                                    key={e}
                                    size="md"
                                    radius="lg"
                                    style={{
                                        ...btn_style_default,
                                        backgroundColor: e[1].selected ? e[1].backgroundColor : "#F5F5F5",
                                    }}
                                    onClick={ () => onClick(e[0]) }
                            >
                                <span style={{
                                    ...circle_style,
                                    backgroundColor: e[1].backgroundColor,
                                    borderColor: e[1].selected ? "#000" : e[1].backgroundColor,
                                }}></span>
                                { e[1].title }
                            </Button>
                        )
                    })
                }
            </Group>
        </div>
            <div style={{maxHeight: "50px", overflowY: "hidden"}}>
                <Group noWrap style={button_area_style}>
                    {
                        Object.entries(filter).filter((element, index) => {
                            return index % 2 == 1;
                        }).map( (e) => {
                            return (
                                <Button
                                    key={e}
                                    size="md"
                                    radius="lg"
                                    style={{
                                        ...btn_style_default,
                                        backgroundColor: e[1].selected ? e[1].backgroundColor : "#F5F5F5",
                                    }}
                                    onClick={ () => onClick(e[0]) }
                                >
                                <span style={{
                                    ...circle_style,
                                    backgroundColor: e[1].backgroundColor,
                                    borderColor: e[1].selected ? "#000" : e[1].backgroundColor,
                                }}></span>
                                    { e[1].title }
                                </Button>
                            )
                        })
                    }
                </Group>
            </div>
        </>
    );
};

export default MapFilter;