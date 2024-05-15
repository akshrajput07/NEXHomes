CREATE DATABASE IoTDevicesDB;
USE IoTDevicesDB;

CREATE TABLE IoTDevices (
    DeviceID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Electronics VARCHAR(100),
    Price DECIMAL(10, 2),
    Technology VARCHAR(50),
    Applications TEXT,
    Interface VARCHAR(100),
    Protocols VARCHAR(100),
    SensorsDataProcessing VARCHAR(100),
    Storage VARCHAR(100),
    Security VARCHAR(100)
);
