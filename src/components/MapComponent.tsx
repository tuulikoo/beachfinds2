import Map from "./Map";
import { RawPostData } from "../App";
import ChatInterface from "./ChatInterface";
import { useLocation } from "react-router-dom";

interface MapShowProps {
  postData: { posts: RawPostData[] };
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MapShow: React.FC<MapShowProps> = ({ postData }) => {
  const query = useQuery();
  const latParam = query.get("lat");
  const lngParam = query.get("lng");
  const posts = postData.posts;

  // Convert posts to locations
  const locations = posts.map((post) => ({
    lat: post.location.coordinates[0],
    lng: post.location.coordinates[1],
    display_name: post.title,
    id: post.id,
  }));

  const initialCenter =
    latParam && lngParam
      ? {
          lat: parseFloat(latParam),
          lng: parseFloat(lngParam),
          display_name: "Selected Location",
        }
      : locations[0];

  return (
    <div className="map-container">
      <Map locations={locations} initialCenter={initialCenter} />
      <ChatInterface />
    </div>
  );
};

export default MapShow;
