import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
import { ApartmentType } from "@/types/apartment";
export async function POST(req: NextRequest) {
  try {

    const {
      zone,
      arse,
      block,
      contact,
      description,
      direction,
      level,
      vam,
      price,
      referrer,
      naghoentegal,
      vazieatvahed,
    }: ApartmentType = await req.json();

    if (
      !zone ||
      !arse ||
      !block ||
      !contact ||
      !direction ||
      !level ||
      !vam ||
      !price ||
      !referrer ||
      !naghoentegal ||
      !vazieatvahed
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "اطلاعات وارد شده معتبر نیست.",
        },
        { status: 400 },
      );
    }
    const result = await query(
      `
      INSERT INTO apartment (
        zone,
        arse,
        block,
        contact,
        description,
        direction,
        level,
        vam,
        price,
        referrer,
        naghoentegal,
        vazieatvahed
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
      )
      RETURNING *;
      `,
      [
        zone,
        arse,
        block,
        contact,
        description ?? null,
        direction,
        level,
        vam,
        price,
        referrer,
        naghoentegal,
        vazieatvahed,
      ],
    );
    return NextResponse.json(
      {
        success: true,
        message: "واحد با موفقیت ثبت شد.",
        apartment: result.rows[0],
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "اشتباهی رخ داده است، لطفا دوباره تلاش نمایید",
      },
      { status: 500 },
    );
  }
}
