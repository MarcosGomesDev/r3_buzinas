import { Box, Button, Screen, Text } from '@components';
import { handleAndroidPermissionCheck } from '@services';
import { useEffect, useState } from 'react';
import { Alert, Image, NativeEventEmitter, NativeModules } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface Device {
  id: string;
  name: string | undefined;
  isConnected?: boolean;
}

function Header({ onPress }: { onPress: () => void }) {
  return (
    <Box
      height={70}
      width={'100%'}
      justifyContent="center"
      backgroundColor="primary"
      alignContent="center"
      flexDirection="row"
      alignItems="center">
      <Image
        source={require('@assets/images/logo.png')}
        style={{
          width: 100,
          height: 90,
          alignSelf: 'center',
          marginTop: 10,
          transform: [
            {
              scale: 0.8,
            },
          ],
        }}
        resizeMode="contain"
      />

      <Button icon iconName="menu" title="" onPress={onPress} />
    </Box>
  );
}

export function HomeScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<Device[]>([]);
  const [connectedDevices, setConnectedDevices] = useState<Device[]>([]);

  function handleGetConnectedDevices() {
    // if (Platform.OS === 'android' && Platform.Version >= 26) {
    //   BleManager.getAssociatedPeripherals().then(results => {
    //     console.log('getAssociatedPeripherals', results);
    //     const newConnectedDevices = results.map(result => ({
    //       id: result.id,
    //       name: result.name,
    //     }));

    //     setConnectedDevices(prevConnectedDevices => {
    //       const deviceMap = new Map();

    //       prevConnectedDevices.forEach(device =>
    //         deviceMap.set(device.id, device),
    //       );

    //       newConnectedDevices.forEach(device =>
    //         deviceMap.set(device.id, device),
    //       );

    //       return Array.from(deviceMap.values());
    //     });
    //   });
    //   return;
    // }

    BleManager.getBondedPeripherals().then(results => {
      console.log('getBondedPeripherals', results);
      const newConnectedDevices = results.map(result => ({
        id: result.id,
        name: result.name,
      }));

      setConnectedDevices(prevConnectedDevices => [
        ...prevConnectedDevices,
        ...newConnectedDevices,
      ]);
    });
  }

  async function checkState(): Promise<boolean> {
    let enabled = false;
    await BleManager.checkState().then(async state => {
      if (state === 'on') {
        enabled = true;
      }

      if (state === 'off') {
        await BleManager.enableBluetooth().then(() => {
          enabled = true;
        });
      }
    });

    return enabled;
  }

  async function startScan() {
    const enabled = await checkState();

    if (!isScanning && enabled) {
      BleManager.scan([], 5, false)
        .then(async () => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  function handleUseBluetooth() {
    startScan();
  }

  useEffect(() => {
    handleAndroidPermissionCheck(granted => granted);

    checkState().then(enabled => {
      if (enabled) {
        BleManager.start({ showAlert: false }).then(() => {
          handleGetConnectedDevices();
        });
      }
    });

    let stopDiscoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      peripheral => {
        const newDevice = {
          id: peripheral.id,
          name: peripheral.name,
        };

        if (
          !discoveredDevices.some(
            device => device.id.toString() === peripheral.id.toString(),
          )
        ) {
          setDiscoveredDevices(prevDiscoveredDevices => [
            ...prevDiscoveredDevices,
            newDevice,
          ]);
        }
      },
    );
    let stopConnectListener = BleManagerEmitter.addListener(
      'BleManagerConnectPeripheral',
      () => {},
    );
    let stopScanListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('scan stopped');
      },
    );
    return () => {
      stopDiscoverListener.remove();
      stopConnectListener.remove();
      stopScanListener.remove();
    };
  }, [discoveredDevices]);

  async function disconnectFromDevice(device: Device) {
    BleManager.removeBond(device.id)
      .then(() => {
        device.isConnected = false;
        setConnectedDevices([]);
        Alert.alert(`Disconnected from ${device.name}`);
      })
      .catch(() => {
        console.log('fail to remove the bond');
      });
  }
  async function connectToDevice(device: Device) {
    await BleManager.createBond(device.id)
      .then(() => {
        device.isConnected = true;
        console.log('BLE device paired successfully', device);
      })
      .catch(() => {
        console.log('failed to bond');
      });
  }

  return (
    <Screen
      hasHeader
      HeaderComponent={<Header onPress={handleUseBluetooth} />}
      style={{ paddingTop: 0 }}>
      <Box>
        <Text>{connectedDevices.length}</Text>

        <Button
          title="Connect"
          onPress={() =>
            connectToDevice({
              id: '50:78:93:95:D2:EB',
              name: 'LE-391',
              isConnected: false,
            })
          }
        />

        <Button
          title="Disconnected"
          onPress={() =>
            disconnectFromDevice({
              id: '50:78:93:95:D2:EB',
              name: 'LE-391',
              isConnected: false,
            })
          }
        />
      </Box>
    </Screen>
  );
}
