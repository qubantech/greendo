import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import {Button, Grid, Group, Progress, Space, Text} from "@mantine/core";
import {cameraStore} from "./store";

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    let byteCharacters = atob(b64Data       ); // window.atob(b64Data)
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

class PhotoCamera extends React.Component {

    constructor (props, context) {
        super(props, context);
        this.cameraPhoto = null;
        this.videoRef = React.createRef();
        this.state = {
            dataUri: '',
            take: false,
            req: '',
            filled: cameraStore()
        }
        //this.take = false;
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

    async takePhoto() {
        const config = {
            sizeFactor: 1,
            imageType: "jpg"
        };
        let formData = new FormData();
        let dataUri = this.cameraPhoto.getDataUri(config);
        this.setState({dataUri});
        console.log(dataUri)
        let ImageURL = dataUri;
        let block = ImageURL.split(";");
        let contentType = block[0].split(":")[1];
        let realData = block[1].split(",")[1];
        console.log(realData)
        var blob = b64toBlob(realData, contentType);
        var form = document.getElementById("myAwesomeForm");
        var formDataToUpload = new FormData(form);
        formDataToUpload.append("file", blob);
        let request = new XMLHttpRequest();
        const requestOptions = {
            method: 'POST',
            body: formDataToUpload
        };
        fetch('http://quban.tech:5000', requestOptions)
            .then(response => response.json())
            .then(data => this.setState(prevState => ({
                ...prevState.dataUri,
                take: true,
                req: data
            })));
        /*request.open("POST", "http://quban.tech:5000");
        request.send(formDataToUpload);*/
/*        console.log(request)*/
        this.setState(prevState => ({
            ...prevState.dataUri,
            take: true,
        }))
        //this.setState({request.responseText})
        console.log(this.state.req)
        //this.state.take = true
        console.log(this.state.take)
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

    maxElement(obj) {
        if(obj[0] === Math.max(...obj)) return "3"
        if(obj[1] === Math.max(...obj)) return "1"
        if(obj[2] === Math.max(...obj)) return "2"
        if(obj[3] === Math.max(...obj)) return "0"

    }

    setFill(max){
        this.props.setLoading(true)
        let loc_fil = this.props.filled
        loc_fil[max] = loc_fil[max] + this.props.volume[max]
        this.props.setFilled(loc_fil)
        let loc_th = this.props.thrownMap
        loc_th[max] = loc_th[max] + this.props.volume[max]
        this.props.setThrownMap(loc_th)
        this.state.filled[Number(max)] = this.state.filled[Number(max)] + this.props.volume[Number(max)]
        console.log(cameraStore().filled)
        this.props.setLoading(false)
    }
    render () {
        return (
            <Group direction={"row"} align={"center"} style={{width:"90vw", height:"auto"}}>
                <Group>
                    <div style={{display:"none"}}>
                        <form  id="myAwesomeForm" method="post">
                            <input type="text" id="filename" name="filename" />
                        </form>
                    </div>
                <video
                    style={{width: "90vw"}}
                    ref={this.videoRef}
                    autoPlay={true}
                />
                <Button fullWidth onClick={ () => {
                    this.takePhoto();
                }}> Take photo </Button>
                </Group>
                {this.state.take &&
                    (<div>
                        <img
                        style={{width: "90vw"}}
                        alt="imgCamera"
                        src={this.state.dataUri}
                        />
                        <Grid>
                            <Grid.Col span={6}>
                                <Text>Стекло</Text>
                            <Progress color={"blue"} value={this.state.req[0]*100}/>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Text>Металл</Text>
                            <Progress color={"black"} value={this.state.req[1]*100}/>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Text>Бумага</Text>
                            <Progress color={"gray"} value={this.state.req[2]*100}/>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Text>Пластик</Text>
                            <Progress color={"green"} value={this.state.req[3]*100}/>
                            </Grid.Col>
                        </Grid>
                        Скорее всего это
                        {
                            this.maxElement(this.state.req) == "3" && " стекло"
                        }
                        {
                            this.maxElement(this.state.req) == "1"  && " металл"
                        }
                        {
                            this.maxElement(this.state.req) == "2"  && " бумага"
                        }
                        {
                            this.maxElement(this.state.req) == "0" && " пластик"
                        }
                        <Button onClick={() => this.setFill(this.maxElement(this.state.req))}>Да</Button>
                        <Button>Нет</Button>
                    </div>)
                }
                <Space h={5}/>
            </Group>
        );
    }
}

export default PhotoCamera;