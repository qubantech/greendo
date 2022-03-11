import React from 'react';
import {ObjectManager} from "react-yandex-maps";

const ObjectManagerContainer = ( props ) => {
    return (
        <div className={"object-manager-container"}>
            <ObjectManager
                options={{
                    clusterize: true,
                    gridSize: 50,
                    clusterIconLayout: 'default#pieChart'

                }}
                filter={ props.objectManagerFilter }
                features={ props.features }
                modules={[
                    'objectManager.addon.objectsHint',
                ]}
                instanceRef={ref =>
                    ref?.objects.events.add('click', (e) => {
                        // Используем айдишник для того, чтобы далее получить инфу по метке
                        const objectId = e.get('objectId');
                        let obj = ref?.objects.getById(objectId);
                        console.log(obj);
                        props.onPlacemarkClick(obj)
                    })}

            />
        </div>
    );
};

export default ObjectManagerContainer;