
import { Adapter } from 'gateway-addon';

export class FirebaseNotification extends Adapter {


    private constructor(addonManager: any, manifest: any, name: string) {
        super(addonManager, name, manifest.id);
        addonManager.addAdapter(this);

        console.log('Initialisation firebase notification');

    }

    public static async initFirebaseNotification(addonManager: any, manifest: any): Promise<FirebaseNotification> {
        // const database = new Database(manifest.name);
        // await database.open();
        return new FirebaseNotification(addonManager, manifest, manifest.name);
    }


}
