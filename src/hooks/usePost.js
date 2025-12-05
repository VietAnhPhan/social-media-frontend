function usePost(serverURL, getToken) {
  return {
    getPosts: async () => {
      try {
        const response = await fetch(`${serverURL}/posts`, {
          method: "GET",
          headers: {
            Authorization: `bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    getPostsByUsername: async (username) => {
      try {
        const response = await fetch(`${serverURL}/posts/users/${username}`, {
          method: "GET",
          headers: { Authorization: `bearer ${getToken()}` },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },
    getTrendingPosts: async () => {
      try {
        const response = await fetch(`${serverURL}/posts?trending=true`, {
          method: "GET",
          headers: { Authorization: `bearer ${getToken()}` },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },
    getSearchedPosts: async (search) => {
      try {
        const response = await fetch(`${serverURL}/posts?search=${search}`, {
          method: "GET",
          headers: { Authorization: `bearer ${getToken()}` },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
      } catch (err) {
        console.error(err.message);
      }
    },
     createPost: async (body) => {
      try {
        const response = await fetch(`${serverURL}/posts`, {
          method: "POST",
          body: JSON.stringify({ body }),
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    createPostMedias: async (postMedias) => {
      try {
        const rs = await fetch(`${serverURL}/postMedias`, {
          method: "POST",
          body: JSON.stringify({ postMedias }),
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${getToken()}`,
          },
        });
        const result = await rs.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  };
}

export default usePost;
