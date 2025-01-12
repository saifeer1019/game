import axios from 'axios';
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
    const gamesCollection = collection(db, "games");
    try {
        const { ids } = await request.json(); // Parse the request body to get ids array
        console.log(ids);
        for (const id of ids) {
            const response = await axios.get(`https://f95db-backend-1022000040343.asia-east1.run.app/api/fetchFull?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.F95DB_API_KEY}`
                }
            });
            if (response.data.status === "Game does not exist") {
                console.log(`Game with id ${id} does not exist`);
                continue}
            console.log(`orig https://f95db-backend-1022000040343.asia-east1.run.app/api/fetchFull?id=${12378}`);
            console.log(`nkj https://f95db-backend-1022000040343.asia-east1.run.app/api/fetchFull?id=${id}`);
            await addDoc(gamesCollection, { ...response.data });
            
        }
        
        return NextResponse.json({ message: "Games added successfully" });

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
