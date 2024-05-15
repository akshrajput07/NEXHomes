const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const contractABI = require('./SmartHomeABI.json');

const app = express();
const port = 3000;

// Ethereum network provider
const web3 = new Web3('https://mainnet.infura.io/v3/your_infura_project_id');

// Smart contract address
const contractAddress = '0x123...'; // Replace with your contract address

// Instantiate the smart contract
const smartHomeContract = new web3.eth.Contract(contractABI, contractAddress);

// Parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive commands from the frontend
app.post('/control', async (req, res) => {
    try {
        const { deviceId, status } = req.body;
        const accounts = await web3.eth.getAccounts();
        await smartHomeContract.methods.controlDevice(web3.utils.asciiToHex(deviceId), status).send({ from: accounts[0] });
        res.send('Command sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending command');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`IoT Gateway listening at http://localhost:${port}`);
});
