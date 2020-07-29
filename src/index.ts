

import { FirebaseNotification } from './firebase-notification.adapter';

export = async (addonManager: any, manifest: any) => {
    // discover(addonManager, manifest);
    // loadGatewayFromConfig(addonManager, manifest);

    await FirebaseNotification.initFirebaseNotification(addonManager, manifest);
};
