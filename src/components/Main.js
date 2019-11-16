import React from 'react';
import Websocket from 'react-websocket';
import QrReader from 'react-qr-reader';

export default class Main extends React.Component {

    login = window.vega_login || ''
    password = window.vega_password || ''
    server_url = window.vega_server_url || ''

    initState = {
        error: null,
        success: false,
        saving: false,
        device: null,
        devName: null
    }

    state = { ...this.initState }

    componentWillUnmount() {
        this.wsRef = null;
    }

    handleWSData = (data) => {
        try {
            var response = JSON.parse(data);
            if (response.cmd === 'auth_resp') {
                if (!response.status) {
                    this.setState({ error: 'Authentification failed: ' + response.err_string });
                }
            }
            if (response.cmd === 'manage_devices_resp') {
                if (!response.status) {
                    this.setState({ error: 'Save error: ' + response.err_string });
                } else {
                    if (response.device_add_status) {
                        var curDevice = response.device_add_status.find(el => el.devEui === this.state.device.devEui);
                        if (curDevice) {
                            if (curDevice.status === 'added'
                                || curDevice.status === 'updated'
                                || curDevice.status === 'nothingToUpdate'
                                || curDevice.status === 'updateViaMacBuffer') {
                                this.setState({ ...this.initState, success: true });
                            } else {
                                this.setState({ error: 'Save error: ' + curDevice.status });
                            }
                        } else {
                            this.setState({ error: 'The device is not found in the results' });
                        }
                    }
                }
                this.setState({ saving: false });
            }
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    handleWSOpen = () => {
        if(!this.wsRef) return;
        this.setState({ connected: true, error: null }, this.auth());
    }

    handleWSError = () => {
        if(!this.wsRef) return;
        this.setState({ connected: false, error: 'Connection error' });
    }

    handleQRScan = (data) => {
        if (data) {
            var lines = data.match(/[^\r\n]+/g);
            var keys = {};
            lines.forEach(line => {
                var parts = line.split('=');
                if (parts.length > 1) {
                    keys[parts[0]] = parts[1];
                }
            });
            if (keys.devEui && !this.state.device) {
                this.setState({ device: { devEui: keys.devEui, keys }, success: false })
            }
        }
    }

    handleQRError = () => {
        this.setState({ error: 'QR code error' });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value })
    }

    handleReset = () => {
        this.setState({ ...this.initState });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.state.device && this.state.devName) {
            var request = {
                cmd: 'manage_devices_req',
                devices_list: []
            };
            var device = {
                devEui: this.state.device.devEui,
                devName: this.state.devName
            };
            if (this.state.device.keys.appEui && this.state.device.keys.appKey) {
                device.OTAA = {
                    appEui: this.state.device.keys.appEui,
                    appKey: this.state.device.keys.appKey
                }
            }
            if (this.state.device.keys.devAddress && this.state.device.keys.appsKey && this.state.device.keys.nwksKey) {
                device.ABP = {
                    devAddress: this.state.device.keys.devAddress,
                    appsKey: this.state.device.keys.appsKey,
                    nwksKey: this.state.device.keys.nwksKey
                }
            }
            if (device.OTAA || device.ABP) {
                request.devices_list.push(device);
                this.setState({ saving: true, success: false }, this.sendRequest(request));
            } else {
                this.setState({ error: 'No OTAA or ABP keys found' })
            }
        }
    }

    auth = () => {
        var request = {
            cmd: 'auth_req',
            login: this.login,
            password: this.password
        };
        this.sendRequest(request);
    }

    sendRequest = (request) => {
        try {
            var message = JSON.stringify(request);
            if (this.wsRef) {
                this.wsRef.sendMessage(message);
            }
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return <div className="main">
            <Websocket url={this.server_url}
                ref={WS => this.wsRef = WS}
                onOpen={this.handleWSOpen}
                onClose={this.handleWSError}
                onMessage={this.handleWSData} />
            <h1>Home</h1>
            <div className="mb-2">{this.state.connected ? 'Connected to the server' : 'Disconnected from the server'}</div>
            <div className="row">
                <div className="col-md-6">
                    <div className="qr-reader mb-4">
                        <QrReader
                            delay={300}
                            onError={this.handleQRError}
                            onScan={this.handleQRScan}
                        />
                    </div>
                    {this.state.error && <div className="alert alert-danger mb-4" role="alert">
                        {this.state.error}
                    </div>}
                    {this.state.success && <div className="alert alert-success mb-4" role="alert">
                        The device has successfully saved
                    </div>}
                </div>
                <div className="col-md-6">
                    {this.state.device && <div className="device">
                        <div className="alert alert-success mb-4" role="alert">
                            The device was found
                        </div>
                        <div className="keys mb-4">
                            {Object.keys(this.state.device.keys).map(key => {
                                return <div key={key}>{key}: {this.state.device.keys[key]}</div>;
                            })}
                        </div>
                        <form className="device-form mb-4" onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <input type="text" name="devName" className="form-control" placeholder="Enter a device name" onChange={this.handleInputChange} value={this.state.devName || ''} readOnly={this.state.saving} />
                            </div>
                            <button type="submit" className="btn btn-primary mr-2 mb-2" disabled={!this.state.devName || this.state.saving}>Save</button>
                            <button type="button" className="btn btn-danger mr-2 mb-2" disabled={!this.state.device || this.state.saving} onClick={this.handleReset}>Reset</button>
                        </form>
                    </div>}
                </div>
            </div>
        </div>
    }

}