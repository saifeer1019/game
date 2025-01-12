import Sidebar from "@/components/admin/Side";
import Navbar from "@/components/Navbar";
import { db } from "@/config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
export default async function AdminPage() {
  const gamesCollection = collection(db, "games");
  const snapshot = await getDocs(gamesCollection);
  const games = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(games[0]);
  
  return (
  
    <div className="flex flex-row h-screen">
      <Sidebar currentTab='admin' />
      <div className="flex flex-col gap-4 p-4 w-full">
        {games && games.map((game) => (
          <div key={game.id} className=" h-[24vh] w-full flex bg-white rounded-lg shadow-md p-4">
          <div className="w-[30vw]">  
          <img 
              src={game.data?.bannerURL} 
              alt={game.data?.gameName} 
              className=" h-full object-cover rounded-t-lg"
            />
            </div>
            <div className="flex justify-between items-start w-full gap-4 p-4">
            <div className="">
              <h2 className="text-xl font-bold">{game.data?.gameName}</h2>
              <p className="text-gray-600">ID: {game.id}</p>
              <p className="text-gray-600">Category: {game.data?.category}</p>
              </div>
              <button className=" self-start my-2 h-fit bg-blue-500 text-white px-4 py-1 rounded-lg">Edit</button>
              </div>
          </div>
        ))}
      </div>
    </div>
   
    
  );
}