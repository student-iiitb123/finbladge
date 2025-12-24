import dbConnect from "../../../_lib/cms/db";
import { NextResponse } from "next/server";
import { Fields } from "../../../_lib/cms/field.model";

export async function POST(request) {
   await dbConnect();
    const body = await request.json();
     const field = await Fields.create(body);
      return NextResponse.json(field);
    }


export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const collectionId = searchParams.get("collectionId");
  const fields = await Fields.find({ collectionId });
  return NextResponse.json(fields);
}