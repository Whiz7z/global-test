import { NextResponse } from "next/server";
import {Database}  from "../../../models/database"; 
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your-secret-key"; 
export async function POST(request: Request) {
  const { userName, password } = await request.json();

  
  const user = Database.users
    .getAll()
    .find((user) => user.userName === userName);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  
  if (user.password !== password) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

 
  const token = jwt.sign(
    { userId: user.id, userName: user.userName },
    secretKey,
    {
      expiresIn: "1h", 
    }
  );

  
  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set("token", token, {
    httpOnly: true, 
    // secure: process.env.NODE_ENV === "production", 
    secure: true,
    maxAge: 60 * 60, 
    path: "/", 
  });

  return response;
}