import { useContext, useEffect, useState } from "react";
import api from "../../api";
import Post from "../Post/Post";
import { HeaderContext } from "../../Context";
import { Loading } from "../Utilities/Utilities";
import useTitle from "../hooks/useTitle";

function Home() {
  useTitle("Home");
  const [posts, setPosts] = useState([]);

  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    async function fetchData() {
      const posts = await api.getPosts();
      setPosts(posts);
      headerContext.setactiveMenuItem("home");
    }

    fetchData();
  }, []);

  return (
    <>
      {posts.length === 0 && <Loading />}
      {posts.length > 0 && (
        <div className="overflow-auto flex-1">
          <div className="grid grid-cols-1 2xl:grid-cols-2 p-7 gap-3 lg:px-40">
            {posts.map((post) => (
              <Post key={post.id} author={post.author} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
