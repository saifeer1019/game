import { db } from "@/config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

const gamesCollection = collection(db, "games");

export async function POST(request) {
  const { name, imageUrl } = await request.json();

  if (!name || !imageUrl) {
    return NextResponse.json({ error: "Name and imageUrl are required." }, { status: 400 });
  }

  try {
    const docRef = await addDoc(gamesCollection, { name, imageUrl });
    return NextResponse.json({ id: docRef.id, message: "Game added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add game.", details: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const snapshot = await getDocs(gamesCollection);
    const games = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch games.", details: error.message }, { status: 500 });
  }
}
