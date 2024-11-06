

import { NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs'
import {prisma} from '@/app/lib'

export async function POST(request:Request){
 try{ const data = await request.json()
  const {email,name,password} = data;

  const h_password = await bcrypt.hash(password,10)

  await prisma.user.create({
    data:{
      name:name,
      email:email,
      h_password:h_password
    }
  })
  
  return NextResponse.json({msg:"created succesfully"})
}catch(e){
    console.log(e)
    return NextResponse.json({msg:"error occused"})
  }

  }

