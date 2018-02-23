# Syntek USB Missile Launcher

This library uses [usb](https://www.npmjs.com/package/usb) to control the Syntek USB Missile Launcher.

Make sure you setup USB permissions and install prereqs before installing the module.

USB permissions:
----------------

Add an udev rules file:

/etc/udev/rules.d/90-missile-launcher.rules

```
SUBSYSTEM=="usb",ATTRS{idVendor}=="2123",ATTRS{idProduct}=="1010",MODE="0660",GROUP="usb",SYMLINK+="missile-launcher%n"
```

Make sure you are member of the group `usb`

Prereqs for building node usb module
------------------------------------

```
sudo apt install build-essential libudev-dev
```

Usage
-----

The library exposes the commands `up`, `down`, `left`, `right`, `fire` and `stop`.

All commands return promises.

Example usage, point upwards, then stop after 300ms and shoot:

```javascript
const missile = require('node-missile')

missile.connect().then(launcher => {
  console.log('connected');

  return launcher.up()
    .then(() => {
      console.log('moving up...');

      setTimeout(() => {
        console.log('fireing!');

        launcher.stop()
          .then(() => launcher.fire())
          .catch(console.error);
      }, 300);
    });
}).catch(console.error);

```

