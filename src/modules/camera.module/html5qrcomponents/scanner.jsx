import './app.css';

import React from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin'
//import ResultContainerPlugin from './ResultContainerPlugin.jsx'
import { useNavigate } from "react-router-dom";
import {Text} from "@mantine/core";

class Scanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isError: false
        }

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

    render() {
        return (
            <div className="App">
                <section className="App-section">
                    <Text color={"black"}>Отсканируйте QR-код фандомата или штрих-код товара чтобы узнать о нем подробнее</Text>
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={300}
                        disableFlip={false}
                        qrCodeSuccessCallback={this.onNewScanResult}/>
                    {/*<ResultContainerPlugin results={this.state.decodedResults} />*/}
                </section>
            </div>
        );
    }

    onNewScanResult(decodedText, decodedResult) {
        console.log(
            "App [result]", decodedText, decodedResult);
        console.log(decodedResult.result.format.formatName)
        console.log(decodedText)
        if (decodedResult.result.format.format === 9) {
            console.log(
                "App barcode[result]", decodedText, decodedResult);
            this.props.history(`/barcode/${decodedText}`);
        }
        else if (decodedResult.result.format.format === 0) {
            this.state.isError = true;
            console.log(this.state.isError)
            console.log(
                "App qr[result]", decodedText, decodedResult);
            this.props.history(`/qrcode/${decodedText.replaceAll("/",".")}`);
        }
        else {
            this.state.isError = true;
            console.log("Incorrect code");
        }
    }
}

export default (props) => (
    <Scanner history={useNavigate()} />
);
