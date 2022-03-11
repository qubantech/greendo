import React, {useState} from 'react';
import {Button} from "@mantine/core";


const filter_parameters = {
    "Glass": {
        title: "Стекло",
        selected: true,
        btn_style_selected: {
            backgroundColor: "#ACABEA",
            color: "#1E1E1E"
        }
    },
    "Plastic": {
        title: "Пластик",
        selected: true,
        btn_style_selected: {
            backgroundColor: "#F9C96D",
            color: "#1E1E1E",
        }
    },
    "Metall": {
        title: "Металл",
        selected: true,
        btn_style_selected: {
            backgroundColor: "#FFB7A7",
            color: "#1E1E1E",
        }
    },
    "Cardboard": {
        title: "Картон",
        selected: true,
        btn_style_selected: {
            backgroundColor: "#EDA7FF",
            color: "#1E1E1E",

        }
    },
    "paper": {
        title: "Бумага",
        selected: true,
        btn_style_selected: {
            backgroundColor: "#A7F4FF",
            color: "#1E1E1E"

        }
    },
    "Trash": {
        title: "Вторсырье",
        selected: true,
        btn_style_selected: {
            backgroundColor: "#779DFF",
            color: "#1E1E1E"
        }
    },
}

const btn_style_default = {
    backgroundColor: "#F5F5F5",
    color: "#1E1E1E",

}

const MapFilter = (props) => {
    const [filter, setFilter] = useState(filter_parameters);

    const onClick = (element) => {
        let filterTemp = filter;
        filterTemp[element].selected = !filterTemp[element].selected;
        setFilter(filterTemp);

        props.setObjectManagerFilter( () => (object) => {
            return filter[object.properties.content].selected;
        });
    }

    return (
        <div >
            {
                Object.entries(filter).map( (e) => {
                    return (
                        <Button
                                key={e}
                                style={ e[1].selected ? e[1].btn_style_selected : btn_style_default }
                                onClick={ () => onClick(e[0]) }
                        >
                            { e[1].title }
                        </Button>
                    )
                })
            }
        </div>
    );
};

export default MapFilter;