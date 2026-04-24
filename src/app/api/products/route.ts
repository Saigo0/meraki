import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
    try{
        const products = await prisma.product.findMany();
        return NextResponse.json(products, {status: 200});
    } catch(error){
        return NextResponse.json({message: 'Failed to fetch products'},{status: 500});
    }
}

export async function POST(req: NextRequest) {
    try{
        const {title, description, category} = await req.json();

        if(!title || !category){
            return NextResponse.json({message:'The title and the category are required'}, {status: 400});
        }

        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                category
            }
        });

        return NextResponse.json(newProduct, {status: 201});
    } catch(error: any){
        return NextResponse.json({message: "Failed to create product"},{status: 500});
    }
}