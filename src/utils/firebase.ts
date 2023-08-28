import * as admin from "firebase-admin"
import serviceAccount from "../service-account"

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as any),
    })
} catch (error: any) {
    console.log("Firebase admin initialization error", error.stack)
    console.log(serviceAccount)
}

export const firebaseAuth = admin.auth()
