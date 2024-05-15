import paho.mqtt.client as mqtt # type: ignore
import RPi.GPIO as GPIO # type: ignore
import time

# Configure GPIO pin for the light
LIGHT_PIN = 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(LIGHT_PIN, GPIO.OUT)

# MQTT broker details
MQTT_BROKER = "mqtt.example.com"
MQTT_PORT = 1883
MQTT_TOPIC = "home/light"

# MQTT callbacks
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(MQTT_TOPIC)

def on_message(client, userdata, msg):
    if msg.payload.decode() == "on":
        GPIO.output(LIGHT_PIN, GPIO.HIGH)
        print("Light is ON")
    elif msg.payload.decode() == "off":
        GPIO.output(LIGHT_PIN, GPIO.LOW)
        print("Light is OFF")

# Initialize MQTT client
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Connect to MQTT broker
client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Start loop to process MQTT messages
client.loop_forever()