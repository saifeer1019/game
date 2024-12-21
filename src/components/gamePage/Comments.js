import { useState } from "react";
import { Comment } from "lucide-react";

export default function Comments({ game }) {
    const [comments, setComments] = useState([]);
    
    return (
        <div>
            <Comment />
        </div>
    )
}