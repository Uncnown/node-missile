const usb = require('usb');

function connect() {
  const launcher = usb.findByIds(0x2123, 0x1010);

  if (!launcher) {
    console.log('no missile launcher found');
    process.exit();
  }

  launcher.open();
  
  launcher.interfaces.map((interface) => {
    if (interface.isKernelDriverActive()) {
      interface.detachKernelDriver()
    }
  });

  return launcher;
}

function control_transfer(device, cmd) {
  data = new Buffer([0x2, cmd, 0, 0, 0, 0, 0, 0, 0]);

  return new Promise((resolve, reject) => {
    device.controlTransfer(0x21, 0x9, 0, 0, data, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    })
  });
}

module.exports = {
  connect: () => {
    const launcher = connect();
    const send = cmd => control_transfer(launcher, cmd);

    return {
      down:  () => send(0x01),
      up:    () => send(0x02),
      left:  () => send(0x04),
      right: () => send(0x08),
      fire:  () => send(0x10),
      stop:  () => send(0x20),
    };
  }
};

