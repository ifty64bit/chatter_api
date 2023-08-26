import * as admin from "firebase-admin"
import serviceAccount from "../service-account"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
})

export const firebaseAuth = admin.auth()
