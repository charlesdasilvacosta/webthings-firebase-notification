import { initializeApp, credential, ServiceAccount, messaging, app } from 'firebase-admin';
import { Adapter } from 'gateway-addon';

export class FirebaseNotification extends Adapter {

    private app: app.App;


    private constructor(protected addonManager: any, protected manifest: any, protected name: string) {
        super(addonManager, name, manifest.id);

        console.log('Initialisation firebase notification');

        const serviceAccount: ServiceAccount = {
            projectId: this.manifest.moziot.config.projectId,
            clientEmail: this.manifest.moziot.config.clientEmail,
            privateKey: this.manifest.moziot.config.privateKey.replace(/\\n/g, '\n')
        };

        this.app = initializeApp({
            credential: credential.cert(serviceAccount),
            databaseURL: this.manifest.moziot.config.databaseURL
        });
    }


    public static async initFirebaseNotification(addonManager: any, manifest: any): Promise<FirebaseNotification> {

        // const database = new Database(manifest.name);
        // await database.open();

        return new FirebaseNotification(addonManager, manifest, manifest.name);
    }

    public async sendMessage(message: messaging.Message): Promise<void> {

        // const message = {
        //     //     notification: {
        //     //         title: 'Message from node',
        //     //         body: 'hey there'
        //     //     },
        //     //     topic: 'general'
        //     // };
        try {
            await this.app.messaging().send(message);
        } catch (err) {
            console.error(err);
        }

    }
}
