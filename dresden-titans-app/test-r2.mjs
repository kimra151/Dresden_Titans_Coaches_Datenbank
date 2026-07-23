import { S3Client, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// --- HIER DEINE DATEN EINFÜGEN ---
const R2_ACCESS_KEY_ID = "7350cf7418dc64aef9ea0e3830556532";
const R2_SECRET_ACCESS_KEY = "38fe97f616cd669bfaede6c2e3ec66350282548512cc787603b2524a178f4b1a";
const R2_ENDPOINT = "https://88b37926d180884381df98b4a87098e1.r2.cloudflarestorage.com"; // Muss mit https:// beginnen!
const R2_BUCKET_NAME = "dresden-titans-vault";
// ---------------------------------

async function testR2() {
    console.log("🔄 Verbinde mit Cloudflare R2...\n");

    const client = new S3Client({
        region: "auto", // R2 benötigt immer "auto"
        endpoint: R2_ENDPOINT,
        credentials: {
            accessKeyId: R2_ACCESS_KEY_ID,
            secretAccessKey: R2_SECRET_ACCESS_KEY,
        },
        forcePathStyle: true, // ⚠️ SEHR WICHTIG für Cloudflare R2!
    });

    try {
        // Test 1: Können wir die Buckets auflisten?
        console.log("1. Prüfe Verbindung (ListBuckets)...");
        const buckets = await client.send(new ListBucketsCommand({}));
        console.log("✅ Verbindung erfolgreich! Gefundene Buckets:");
        buckets.Buckets?.forEach(b => console.log(`   - ${b.Name}`));

        // Test 2: Existiert unser spezifischer Bucket?
        console.log(`\n2. Prüfe, ob Bucket '${R2_BUCKET_NAME}' existiert...`);
        const bucketExists = buckets.Buckets?.some(b => b.Name === R2_BUCKET_NAME);

        if (bucketExists) {
            console.log(`✅ Bucket '${R2_BUCKET_NAME}' gefunden! Die Credentials sind 100% korrekt.`);

            // Optional: Test-Upload (entkommentieren, wenn du es wirklich testen willst)
            /*
            console.log("\n3. Führe Test-Upload durch...");
            await client.send(new PutObjectCommand({
              Bucket: R2_BUCKET_NAME,
              Key: "test-connection.txt",
              Body: "Wenn du das lesen kannst, funktioniert der Upload!",
            }));
            console.log("✅ Test-Datei erfolgreich hochgeladen!");
            */
        } else {
            console.log(`❌ Fehler: Der Bucket '${R2_BUCKET_NAME}' wurde nicht gefunden.`);
            console.log("   Tipp: Prüfe den Bucket-Namen auf Tippfehler oder ob er im richtigen Account liegt.");
        }

    } catch (error) {
        console.error("\n❌ VERBINDUNG FEHLGESCHLAGEN!");
        console.error("Fehlerdetails:", error.message);

        if (error.message.includes("AccessDenied")) {
            console.log("👉 Ursache: Access Key oder Secret Key sind falsch, oder der Token hat keine 'Admin Read & Write' Rechte.");
        } else if (error.message.includes("InvalidAccessKeyId")) {
            console.log("👉 Ursache: Der Access Key ID ist falsch oder enthält Leerzeichen am Anfang/Ende.");
        } else if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
            console.log("👉 Ursache: Der R2_ENDPOINT ist falsch. Prüfe die Account ID in der URL.");
        }
    }
}

testR2();