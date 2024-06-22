import { PermissionsAndroid, Platform } from 'react-native';

export async function handleAndroidPermissionCheck(
  cb: (granted: boolean) => void,
) {
  if (Platform.OS === 'android') {
    try {
      const fineLocationPermission =
        Platform.Version >= 23
          ? await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
          : PermissionsAndroid.RESULTS.GRANTED;

      const bluetoothPermissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);

      const allPermissionsGranted =
        fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED &&
        bluetoothPermissions[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        bluetoothPermissions[
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        ] === PermissionsAndroid.RESULTS.GRANTED;

      cb(allPermissionsGranted);
    } catch (error) {
      cb(false);
    }
  } else {
    cb(true);
  }
}
