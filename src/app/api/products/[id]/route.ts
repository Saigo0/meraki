import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req: NextRequest,{params}:{params:{id: string}}) {
    try{
        const {id} = await params;

        const product = await prisma.product.findUnique({
            where:{
                id: Number(id)
            }
        });

        if(!product){
            return NextResponse.json({message: "Product not found"},{status: 404});
        }

        return NextResponse.json(product, {status: 200});
    } catch(error: any){
        return NextResponse.json({message: "Failed to fetch product"}, {status: 500});
    }
}

export async function DELETE(req: NextRequest,{params}:{params:{id: string}}) {
    try{
        const {id} = await params;

        await prisma.product.delete({
            where:{
                id: Number(id)
            }
        });

        return NextResponse.json({message: "Deleted successfully"}, {status: 200});
    } catch(error: any){
        return NextResponse.json({message: "Failed to delete product"}, {status: 500});
    }
}

export async function PUT(req: NextRequest,{params}:{params:{id: string}}) {
    try{
        const {id} = await params;
        const {title, description} = await req.json();

        if(!title){
            return NextResponse.json({message:'The title is requires'}, {status: 400});
        }

        const exists = await prisma.product.findUnique({
            where: { 
                id: Number(id)
             }
        });

        if (!exists) {
            return NextResponse.json({ message: 'Product not found' },{ status: 404 });
        }

        const updatedProduct = await prisma.product.update({
            where:{
                id: Number(id)
            },
            data: {
                title,
                description
            }
        });

        return NextResponse.json(updatedProduct, {status: 200});
    } catch(error: any){
        return NextResponse.json({message: "Failed to update product"},{status: 500});
    }
}