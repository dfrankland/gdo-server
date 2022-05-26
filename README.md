# gdo-server

Connect your Security+ 2.0 or Security+ compatible garage doors to Home Assistant without relying on the cloud!

### Prerequisites
- Python3
- Node

### Installation
```bash
git clone https://github.com/acvigue/gdo-server && cd gdo-server
npm install
npm install -g pm2
```
Create a file named `storage.json` with the following schema
```json
{
  "config": {
    "mqtt_host": "YOUR_MQTT_HOST",
    "mqtt_username": "mysecretuser",
    "mqtt_password": "mysecretpassword",
    "serial_port": "/dev/ttyACM0"
  },
  "garages": [
    {
      "fixed": 55544433322, <- random 11 digit number below 2^28
      "rolling": 240000000
    }
  ]
}
```
_add as many garages you need to the `garages` element above. the fixed code must be different for each_

```bash
pm2 start index.js --name "gdo-server"
```

#### run on startup
```bash
pm2 startup
pm2 save
```


