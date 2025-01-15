import Sidebar from "@/components/admin/Side";
import Navbar from "@/components/Navbar";
import { db } from "@/config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import GameList from "@/components/admin/GameList";
export default async function AdminPage() {
  const gamesCollection = collection(db, "games");
  const snapshot = await getDocs(gamesCollection);
  const games = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(games[0]);
  
  return (
  
    <div className="flex flex-row h-screen">
      <Sidebar currentTab='admin' />
      <GameList games={games} />
    </div>
   
    
  );
}