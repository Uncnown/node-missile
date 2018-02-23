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


Example usage, point upwards, then stop after 300ms and shoot:

```
const launcher = require('node-missile').connect();

launcher.up();
setTimeout(() => {
  launcher.stop();
  launcher.fire();
}, 300);

```

