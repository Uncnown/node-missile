const usb = require('usb');

function connect() {
  const launcher = usb.findByIds(0x2123, 0x1010);

  if (!launcher) {
    return Promise.reject('no missile launcher found');
  }

  try {
    launcher.open();
    
    launcher.interfaces.map((interface) => {
      if (interface.isKernelDriverActive()) {
        interface.detachKernelDriver()
      }
    });
  }
  catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve(launcher);
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
  connect: () => connect()
    .then((device) => {
      const send = cmd => control_transfer(device, cmd);

      return {
        down:  () => send(0x01),
        up:    () => send(0x02),
        left:  () => send(0x04),
        right: () => send(0x08),
        fire:  () => send(0x10),
        stop:  () => send(0x20),
      };
    }),
};

