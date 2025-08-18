import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadRes = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "product-image" }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                })
                .end(buffer);
        });

        return NextResponse.json({ success: true, data: uploadRes });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
