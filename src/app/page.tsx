import Link from "next/link";
import {Grid} from "../components/Grid";

export default function Home() {
 
  return (
    <div className="p-10">
      <div className="mb-5 font-bold text-blue-600 hover:text-blue-400">
        <a target="_blank" href="#">
          Github Repo
        </a>
      </div>

      <Grid />
    </div>
  );
}
