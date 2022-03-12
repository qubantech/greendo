import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import {Button, Group} from "@mantine/core";

class PhotoCamera extends React.Component {

    constructor (props, context) {
        super(props, context);
        this.cameraPhoto = null;
        this.videoRef = React.createRef();
        this.state = {
            dataUri: ''
        }
    }

    componentDidMount () {
        this.cameraPhoto = new CameraPhoto(this.videoRef.current);
        this.startCameraMaxResolution(FACING_MODES.USER);
    }

    startCameraMaxResolution (idealFacingMode) {
        this.cameraPhoto.startCameraMaxResolution(idealFacingMode)
            .then(() => {
                console.log('camera is started !');
            })
            .catch((error) => {
                console.error('Camera not started!', error);
            });
    }

    takePhoto () {
        const config = {
            sizeFactor: 1
        };

        let dataUri = this.cameraPhoto.getDataUri(config);
        this.setState({ dataUri });
    }

    stopCamera () {
        this.cameraPhoto.stopCamera()
            .then(() => {
                console.log('Camera stoped!');
            })
            .catch((error) => {
                console.log('No camera to stop!:', error);
            });
    }

    componentWillUnmount() {
        this.stopCamera()
    }

    render () {
        return (
            <Group direction={"row"} align={"center"} style={{height: "90vh"}}>
                <Group>
                <video
                    style={{width: "100vw"}}
                    ref={this.videoRef}
                    autoPlay="true"
                />
                <Button fullWidth onClick={ () => {
                    this.takePhoto();
                }}> Take photo </Button>
                </Group>
                {this.state.dataUri && <img
                    style={{width: "100vw"}}
                    alt="imgCamera"
                    src={this.state.dataUri}
                />}
            </Group>
        );
    }
}

export default PhotoCamera;