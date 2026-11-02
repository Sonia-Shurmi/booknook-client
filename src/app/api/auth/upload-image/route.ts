
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    // Check whether the user is logged in
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { message: "Please log in to upload an image." },
        { status: 401 }
      );
    }

    // Get the uploaded image
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { message: "Please select an image." },
        { status: 400 }
      );
    }

    // Validate image format
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { message: "Only JPG, PNG, and WEBP images are allowed." },
        { status: 400 }
      );
    }

    // Validate image size (5 MB)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Image size must not exceed 5 MB." },
        { status: 400 }
      );
    }

    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing.");
    }

    // Upload image to ImgBB
    const uploadData = new FormData();
    uploadData.append("image", image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        body: uploadData,
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error("Image upload failed. Please try again.");
    }

    return NextResponse.json({
      imageUrl: result.data.display_url,
    });
  } catch (error) {
    console.error("Image upload error:", error);

    return NextResponse.json(
      { message: "Unable to upload image. Please try again." },
      { status: 500 }
    );
  }
}
