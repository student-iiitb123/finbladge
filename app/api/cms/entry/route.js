import dbConnect from "../../../_lib/cms/db";
import { NextResponse } from "next/server";
import { Entry } from "../../../_lib/cms/entry.model";

export async function POST(request) {
  await dbConnect();

  const body = await request.json();

  const entry = await Entry.create({
    collectionId: body.collectionId,
    data: body.data
  });

  return NextResponse.json(entry);
}


export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const collectionId = searchParams.get('collectionId');

  const entries = await Entry.find({ collectionId });
  return NextResponse.json(entries);
}