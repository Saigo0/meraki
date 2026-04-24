import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req: NextRequest,{params}:{params:{id: string}}) {
    try{
        const {id} = await params;

        const user = await prisma.user.findUnique({
            where:{
                id: Number(id)
            }
        });

        if(!user){
            return NextResponse.json({message: "User not found"},{status: 404});
        }

        return NextResponse.json(user, {status: 200});
    } catch(error: any){
        return NextResponse.json({message: "Failed to fetch user"}, {status: 500});
    }
}

export async function DELETE(req: NextRequest,{params}:{ params: Promise<{ id: string }> }) {
    try{
        const {id} = await params;

        await prisma.user.delete({
            where:{
                id: Number(id)
            }
        });

        return NextResponse.json({message: "Deleted successfully"}, {status: 200});
    } catch(error: any){
        return NextResponse.json({message: "Failed to delete user"}, {status: 500});
    }
}