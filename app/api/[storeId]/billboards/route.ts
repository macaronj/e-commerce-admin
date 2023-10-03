import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl, isDefault } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("ImageUrl is required", { status: 400 });
    }
    if (isDefault === null || isDefault === undefined) {
      return new NextResponse("IsDefault is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const transaction = await prismadb.$transaction(async (tx) => {
      const billboard = await tx.billboard.create({
        data: {
          label,
          imageUrl,
          isDefault,
          storeId: params.storeId,
        },
      });

      if (isDefault) {
        const notDefaultbillboards = await tx.billboard.updateMany({
          where: {
            storeId: params.storeId,
            NOT: {
              id: billboard.id,
            },
          },
          data: {
            isDefault: false,
          },
        });
      }

      return billboard;
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
