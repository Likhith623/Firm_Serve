import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params before using id
    const resolvedParams = await params;
    const { clientId } = await req.json();
    
    const clientCase = await prisma.client_Case.create({
      data: {
        client_id: clientId,
        case_id: resolvedParams.id
      }
    });
    
    return NextResponse.json(clientCase);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Failed to add client to case";
      
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

