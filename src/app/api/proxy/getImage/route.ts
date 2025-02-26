export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from "next/server";
import { isAxiosError } from "axios";
import { apiTetisan } from "@/services/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams
    .get("ids")
    ?.split(",")
    .map((id) => id.trim());
  if (!ids || ids.length === 0) {
    return NextResponse.json(
      { error: "No valid IDs provided" },
      { status: 400 }
    );
  }

  try {
    const imageRequests = ids.map(async (id) => {
      const res = await apiTetisan.get(`products/${id}/images`);

      const images =
        res.data.result.map((item: { image: string }) => item.image) || [];

      return { id, images };
    });

    const images = await Promise.all(imageRequests);

    return NextResponse.json(images, { status: 200 });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json({ error: "Failed to fetch data" });
    }

    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
