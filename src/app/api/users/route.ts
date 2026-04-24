import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest) {
    try{
        const users = await prisma.user.findMany();
        return NextResponse.json(users, {status: 200});
    } catch(error){
        return NextResponse.json({message: 'Failed to fetch users'},{status: 500});
    }
}

export async function POST(req: NextRequest) {
    try{
        const {user, password} = await req.json();

        if(!user || !password){
            return NextResponse.json({message:'The user and the password are required'}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                user,
                password: hashedPassword
            }
        });

        return NextResponse.json(newUser, {status: 201});
    } catch(error: any){
        return NextResponse.json({message: "Failed to create user"},{status: 500});
    }
}