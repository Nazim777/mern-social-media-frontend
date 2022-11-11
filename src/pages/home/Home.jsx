import Topbar from '../../components/Topbar/Topbar'
import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import Stories from '../../components/Stories/Stories';

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar /> 
          <Feed homepage={'homepage'}/>
        <Rightbar/>
      </div>
    </>
  );
}
