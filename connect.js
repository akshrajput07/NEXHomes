const axios = require('axios');

const controlLight = async (deviceId, action) => {
    const response = await axios.post('http://localhost:3000/control/light', {
        deviceId: deviceId,
        action: action
    });
    console.log(response.data);
};

const controlThermostat = async (deviceId, temperature) => {
    const response = await axios.post('http://localhost:3000/control/thermostat', {
        deviceId: deviceId,
        temperature: temperature
    });
    console.log(response.data);
};

// Example usage
controlLight('light1', 'on');
controlThermostat('thermostat1', 22);
