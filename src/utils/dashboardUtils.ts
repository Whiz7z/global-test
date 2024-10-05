import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Database } from "../models/database";
import { redirect } from "next/navigation";


const secretKey = process.env.JWT_SECRET || "your-secret-key";


export function verifyToken() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return false;
  }

  try {
    jwt.verify(token, secretKey);
    return true;
  } catch {
    return false;
  }
}


export function getTopUpData() {
  const topUps = Database.topUpRequests.getAll();
  const users = Database.users.getAll();
  const accounts = Database.accounts.getAll();

  return topUps.map((topUp) => ({
    createDate: topUp.createDate,
    userName: users.find((user) => user.id === topUp.userId)?.userName,
    tfAccountId: accounts.find((account) => account.userId === topUp.userId)
      ?.tfAccountId,
    amount: topUp.amount,
    id: topUp.id,
  }));
}




export function getTotalAmount(
  topUps: {
    createDate: Date;
    userName: string | undefined;
    tfAccountId: string | undefined;
    amount: number;
    id: number;
  }[]
) {
  return topUps.reduce((sum, topUp) => sum + topUp.amount, 0);
}


export async function openModal() {
  "use server";
    redirect('/dashboard?modal=open');
}