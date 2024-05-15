import React, { useState } from 'react';
import Web3 from 'web3';
import SmartHomeABI from './SmartHomeABI.json'; // Import the ABI of your smart contract

const ContractInteractionComponent = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [deviceId, setDeviceId] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    // Initialize Web3 and the contract when component mounts
    useEffect(() => {
        const initializeWeb3 = async () => {
            // Check if Web3 is injected by the browser (MetaMask)
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Load the smart contract
                const networkId = await web3Instance.eth.net.getId();
                const contractAddress = '0x123...'; // Replace with your contract address
                const deployedNetwork = SmartHomeABI.networks[networkId];
                const contractInstance = new web3Instance.eth.Contract(
                    SmartHomeABI.abi,
                    deployedNetwork && deployedNetwork.address
                );
                setContract(contractInstance);
            } else {
                console.log('Please install MetaMask');
            }
        };
        initializeWeb3();
    }, []);

    const handleControlDevice = async () => {
        try {
            await contract.methods.controlDevice(web3.utils.asciiToHex(deviceId), status).send({ from: (await web3.eth.getAccounts())[0] });
            setMessage('Command sent successfully');
        } catch (error) {
            console.error(error);
            setMessage('Error sending command');
        }
    };

    return (
        <div>
            <h2>Control Device</h2>
            <div>
                <label>Device ID:</label>
                <input type="text" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
            </div>
            <div>
                <label>Status:</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
            </div>
            <button onClick={handleControlDevice}>Control Device</button>
            <p>{message}</p>
        </div>
    );
};

export default ContractInteractionComponent;
