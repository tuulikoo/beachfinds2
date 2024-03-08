import Map from './Map';
import { PostData } from '../App';

interface MapShowProps {
    postData: { posts: PostData[] };
  }

const MapShow: React.FC<MapShowProps> = ({ postData }) => {

  console.log("postData = ", postData);
  const posts = postData.posts;

  // Convert posts to locations
  const locations = posts.map(post => ({
    lat: post.location.coordinates[0],
    lng: post.location.coordinates[1],
    display_name: post.title,
  }));

  return (
    <div className="map-container">
      <Map locations={locations} />
    </div>
  );
};

export default MapShow;