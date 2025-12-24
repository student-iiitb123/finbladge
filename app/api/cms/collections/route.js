import { Collection } from "../../../_lib/cms/collection.model";
import { NextResponse } from "next/server";
import dbConnect from "../../../_lib/cms/db";

export async function POST(request) {
  await dbConnect();

  const body = await request.json();

  const data = await Collection.create({
    name: body.name
  });

  return NextResponse.json({
    result: true,
    data
  });
}

export async function GET(){
  await dbConnect();
  let data = await Collection.find();
   return NextResponse.json(data);
}