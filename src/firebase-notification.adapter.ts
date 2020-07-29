import { initializeApp, credential, ServiceAccount, messaging, app } from 'firebase-admin';
import { Adapter } from 'gateway-addon';

export class FirebaseNotification extends Adapter {

    private app: app.App;

    constructor(private addonManager: any, private manifest: any, private name: string) {
        super(addonManager, name, manifest.id);

        console.log('Initialisation firebase notification');

        const serviceAccount: ServiceAccount = {
            projectId: this.manifest.projectId,
            clientEmail: this.manifest.clientEmail,
            privateKey: this.manifest.privateKey
        };

        this.app = initializeApp({
            credential: credential.cert(serviceAccount),
            databaseURL: this.manifest.databaseURL
        });
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
