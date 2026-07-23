"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/r2"; // Dein R2 Client aus der Anleitung davor

export async function getPresignedUrl(fileName: string, contentType: string) {
  try {
    // Generiere einen einzigartigen Dateinamen, damit nichts überschrieben wird
    const uniqueFileName = `${Date.now()}-${fileName.replace(/\s+/g, "_")}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: contentType, // Wichtig für die Signatur
    });

    // Erstelle ein Ticket, das 60 Sekunden lang gültig ist
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    return { 
      success: true, 
      uploadUrl: signedUrl, 
      // Passe diese Domain an deine öffentliche R2.dev Domain an!
      fileUrl: `https://pub-<deine-subdomain>.r2.dev/${uniqueFileName}` 
    };
  } catch (error) {
    console.error("Fehler beim Erstellen der Presigned URL:", error);
    return { success: false, error: "Konnte Upload-URL nicht generieren." };
  }
}