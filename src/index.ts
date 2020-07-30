

import { FirebaseNotification } from './firebase-notification.adapter';
import { FirebaseNotifier } from './firebase.notifier';

export = async (addonManager: any, manifest: any) => {
    await FirebaseNotification.initFirebaseNotification(addonManager, manifest);
    new FirebaseNotifier(addonManager, manifest);
};
