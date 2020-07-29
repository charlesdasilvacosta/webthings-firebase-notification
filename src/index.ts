import { FirebaseNotification } from './firebase-notification.adapter';

export = (addonManager: any, manifest: any) => {
    // discover(addonManager, manifest);
    // loadGatewayFromConfig(addonManager, manifest);

    const firebaseNotification = new FirebaseNotification(addonManager, manifest, manifest.name);
};
