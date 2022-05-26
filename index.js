const { SerialPort } = require('serialport')
const process = require("child_process")

const mqtt = require('mqtt')  // require mqtt
let config = JSON.parse(fs.readFileSync('storage.json')).config;
const client = mqtt.connect(config.mqtt_host, {
    username: config.mqtt_username,
    password: config.mqtt_password,
    will: {
        topic: "secplus/available",
        message: "offline",
        qos: 1,
        retain: true
    }
})  // create a client

const port = new SerialPort({ path: config.serial_port, baudRate: 115200 }, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
})

port.on("data", (dt) => {
    console.log(dt.toString());
})

function getManchester(fixed, rolling) {
    return process.execSync(`python3 encoder.py ${fixed} ${rolling}`).toString()
}

client.on('', (e) => {
    console.log(e);
})

client.on('connect', () => {
    // Inform controllers that garage is connected
    console.log('broker connected!');
    client.publish('secplus/available', 'online', {
        retain: true
    })

    client.subscribe('secplus/#');
})

client.on('message', function(topic, message, packet) {
    if(message == "PRESS") {
        const gdo_id = topic.split("/")[2]-1;
        const fs = require('fs');
        var cfg = JSON.parse(fs.readFileSync('storage.json'));
        let codes = cfg.garages[gdo_id];
        let manchester = getManchester(codes.fixed,codes.rolling);
        codes.rolling++;
        fs.writeFileSync('storage.json', JSON.stringify(cfg));
        port.write(manchester);
    }
});
