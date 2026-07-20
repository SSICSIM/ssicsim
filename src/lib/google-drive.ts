import { google } from "googleapis";
import { Readable } from "stream";

export type DriveUploadKind = "code_of_conduct" | "payment_receipt";

const FOLDER_ENV_BY_KIND: Record<DriveUploadKind, string> = {
  code_of_conduct: "GOOGLE_DRIVE_CODE_OF_CONDUCT_FOLDER_ID",
  payment_receipt: "GOOGLE_DRIVE_PAYMENT_RECEIPT_FOLDER_ID",
};

function getFolderId(kind: DriveUploadKind): string {
  const specific = process.env[FOLDER_ENV_BY_KIND[kind]];
  const fallback = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const folderId = specific || fallback;
  if (!folderId) {
    throw new Error(
      `Missing Google Drive folder id. Set ${FOLDER_ENV_BY_KIND[kind]} or GOOGLE_DRIVE_FOLDER_ID.`,
    );
  }
  return folderId;
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.",
    );
  }
  // Private keys stored in env vars typically escape newlines as literal "\n".
  const privateKey = rawKey.replace(/\\n/g, "\n");
  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
}

export async function uploadFileToDrive(
  kind: DriveUploadKind,
  fileName: string,
  mimeType: string,
  buffer: Buffer,
): Promise<{ id: string; url: string }> {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  const folderId = getFolderId(kind);

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  const fileId = res.data.id;
  if (!fileId) throw new Error("Drive upload did not return a file id.");

  // Make the file viewable by anyone with the link so admins/staff without
  // Drive access to the shared folder can still open it from a stored URL.
  await drive.permissions.create({
    fileId,
    requestBody: { role: "reader", type: "anyone" },
    supportsAllDrives: true,
  });

  const url =
    res.data.webViewLink ?? `https://drive.google.com/file/d/${fileId}/view`;
  return { id: fileId, url };
}
