import { Outlet, Notifier } from 'gateway-addon';
import { messaging, ServiceAccount, credential, app, initializeApp } from 'firebase-admin';

export class FirebaseNotificationOutlet extends Outlet {

    private readonly app: app.App;

    constructor(notifier: Notifier, id: string, manifest: any) {
        super(notifier, id);

        this.name = 'Firebase';

        const serviceAccount: ServiceAccount = {
            projectId: manifest.moziot.config.projectId,
            clientEmail: manifest.moziot.config.clientEmail,
            privateKey: manifest.moziot.config.privateKey.replace(/\\n/g, '\n')
        };

        this.app = initializeApp({
            credential: credential.cert(serviceAccount),
            databaseURL: manifest.moziot.config.databaseURL
        });
    }

    async notify(title: string, body: string): Promise<void> {
        const message: messaging.Message = {
            notification: {
                title,
                body
            },
            topic: 'general'
        };

        await this.sendMessage(message);
    }


    private async sendMessage(message: messaging.Message): Promise<void> {
        try {
            await this.app.messaging().send(message);
        } catch (err) {
            console.error(err);
        }

    }
}
