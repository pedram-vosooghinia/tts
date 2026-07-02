import { NextResponse, NextRequest } from "next/server";
import { query } from "@/db";
import { ApartmentFormValues } from "@/components/dashboard/apartment/schema";
export async function POST(req: NextRequest) {
  try {
    const {
      zone,
      arseStatus,
      block,
      contact,
      description,
      direction,
      level,
      loanStatus,
      price,
      referrer,
      transferStatus,
      unitStatus,
    }: ApartmentFormValues = await req.json();

    if (
      !zone ||
      !arseStatus ||
      !block ||
      !contact ||
      !direction ||
      !level ||
      !loanStatus ||
      !price ||
      !referrer ||
      !transferStatus ||
      !unitStatus
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
        arse_status,
        block,
        contact,
        description,
        direction,
        level,
        loan_status,
        price,
        referrer,
        transfer_status,
        unit_status
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
      )
      RETURNING *;
      `,
      [
        zone,
        arseStatus,
        block,
        contact,
        description ?? null,
        direction,
        level,
        loanStatus,
        price,
        referrer,
        transferStatus,
        unitStatus,
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
