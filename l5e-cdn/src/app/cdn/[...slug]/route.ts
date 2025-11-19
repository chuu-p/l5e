import { NextRequest, NextResponse } from "next/server";
import { stat, readdir, readFile } from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  paramsPromise: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await paramsPromise.params;

  const parts = slug ?? [];

  const baseDir = process.env.STATIC_ROOT ?? path.join(process.cwd(), "cdn");
  const targetPath = path.join(baseDir, ...parts);

  console.log("----- CDN REQUEST -----");
  console.log("URL:", request.url);
  console.log("Slug:", slug);
  console.log("BaseDir:", baseDir);
  console.log("TargetPath:", targetPath);
  console.log("-----------------------");

  try {
    const info = await stat(targetPath);

    // if (info.isDirectory()) {
    //   console.log("Directory hit:", targetPath);
    //
    //   const entries = await readdir(targetPath, { withFileTypes: true });
    //
    //   const listing = entries.map((e) => ({
    //     name: e.name,
    //     type: e.isDirectory() ? "directory" : "file",
    //   }));
    //
    //   console.log("Directory listing:", listing);
    //
    //   return NextResponse.json(listing);
    // }

    if (info.isFile()) {
      console.log("File hit:", targetPath);

      const buffer = await readFile(targetPath);
      const ext = path.extname(targetPath).toLowerCase();

      const mime =
        ext === ".txt"
          ? "text/plain"
          : ext === ".json"
          ? "application/json"
          : "application/octet-stream";

      console.log("Serving file with MIME:", mime);

      return new NextResponse(buffer, {
        headers: { "Content-Type": mime },
      });
    }

    console.log("Unsupported type:", targetPath);
    return new NextResponse("Unsupported resource type", { status: 400 });
  } catch (err) {
    console.log("FS ERROR:", err);
    return new NextResponse("Not found", { status: 404 });
  }
}

