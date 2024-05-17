const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// تعيين مفتاح API مباشرة
const apiKey = "YOUR_API_KEY_HERE";

// إعداد المصادقة باستخدام المفتاح
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: "YOUR_CLIENT_EMAIL_HERE",
    private_key: "YOUR_PRIVATE_KEY_HERE",
  },
  scopes: ["https://www.googleapis.com/auth/drive"],
});


// إنشاء كائن لخدمة Google Drive
const drive = google.drive({ version: "v3", auth });

async function listFiles() {
  try {
    const res = await drive.files.list({
      pageSize: 1000, // يمكنك تعيين عدد أكبر إذا كان لديك مزيد من الملفات
      fields: "nextPageToken, files(id, name)",
    });
    const files = res.data.files;
    if (files.length) {
      console.log("Files:");
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log("No files found.");
    }
  } catch (err) {
    console.error("Error listing files:", err);
  }
}

listFiles();
