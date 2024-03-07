
import Map from './Map';
import { PostData } from '../App'; // Adjust the import path as needed

interface MapShowProps {
    postData: { posts: PostData[] }; // Adjust based on the actual shape of your data
  }

const MapShow: React.FC<MapShowProps> = ({ postData }) => {
  // Assuming `postData` contains an array of posts under the `posts` property
  console.log("postData = ", postData);
  const posts = postData.posts;

  // Convert posts to locations
  const locations = posts.map(post => ({
    lat: post.location.coordinates[0],
    lng: post.location.coordinates[1],
    display_name: post.title, // or any other property you wish to display
  }));

  return (
    <div className="map-container">
      <Map locations={locations} />
    </div>
  );
};

export default MapShow;