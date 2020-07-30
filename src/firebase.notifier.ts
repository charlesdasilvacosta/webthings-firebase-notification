import { Notifier } from 'gateway-addon';
import { FirebaseNotificationOutlet } from './firebase-notification.outlet';


export class FirebaseNotifier extends Notifier {
    constructor(addonManager: any, manifest: any) {
        super(addonManager, manifest.name, manifest.id);
        addonManager.addNotifier(this);

        const id = 'firebase-sender-0';

        if (!this.outlets[id]) {
            this.handleOutletAdded(new FirebaseNotificationOutlet(this, id, manifest));
        }
    }

}
