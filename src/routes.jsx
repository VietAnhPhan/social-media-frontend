import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import { UserContext } from "./Context";
import Setting from "./components/Setting";
import api from "./api";
import Search from "./components/Search/Search";
import Explore from "./components/Explore/Explore";
import MyPosts from "./components/Post/MyPosts";
import FriendList from "./components/FriendList";
import { ErrorCatching } from "./components/utilities/Utilities";
import Notifications from "./components/Notification/Notifications";
import HydrationLoader from "./components/utilities/loader/HydrationLoader";
import { Home } from "./pages/Home";
import ExplorePage from "./pages/ExplorePage";
import SearchPage from "./pages/SearchPage";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPages from "./pages/ChatsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import FriendsPage from "./pages/FriendsPage";
import PostsPage from "./pages/PostsPage";

const sitename = "Gotoplaces";

const router = createBrowserRouter([
  {
    path: "",
    element: <App></App>,
    hydrateFallbackElement: <HydrationLoader />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/chats",
        middleware: [authMiddleware],
        loader: chatLoader,
        element: <ChatPages />,
        errorElement: <ErrorCatching />,
      },

      {
        path: "/profile",
        middleware: [authMiddleware],
        loader: getUser,
        element: <ProfilePage />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/settings",
        middleware: [authMiddleware],
        loader: getUser,
        element: <SettingsPage />,
      },
      {
        path: "/friends",
        middleware: [authMiddleware],
        loader: getUser,
        element: <FriendsPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/explore",
        middleware: [authMiddleware],
        loader: getUser,
        element: <ExplorePage />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/posts",
        middleware: [authMiddleware],
        loader: getUser,
        element: <PostsPage />,
        errorElement: <ErrorCatching />,
      },
      {
        path: "/notifications",
        middleware: [authMiddleware],
        loader: getUser,
        element: <NotificationsPage />,
        errorElement: <ErrorCatching />,
      },
    ],
  },

  {
    path: "/login",
    loader: hasLogin,
    element: <Login sitename={sitename} />,
  },
  {
    path: "/sign-up",
    element: <Signup sitename={sitename} />,
  },
  {
    path: "/login/guest",
    loader: loginAsGuest,
  },
  {
    path: "/login/github",
    loader: loginByGithub,
  },
]);

async function authMiddleware({ context }) {
  const access = JSON.parse(localStorage.getItem("myinterests_app_access"));

  if (!access) throw redirect("/login");

  const user = await api.getUser(access.username);

  if (!user) throw redirect("/login");

  context.set(UserContext, user);
}

function getUser({ context }) {
  const user = context.get(UserContext);

  return user;
}

async function chatLoader({ context }) {
  const user = context.get(UserContext);
  const conversations = await api.getConversations(user.id);
  let chatUser = null;

  const data = {
    user,
    conversations,
    chatUser,
  };

  return data;
}

// async function friendsLoader() {
//   const sentRequests = await api.getSentRequest();
//   const friendList = await api.getFriends();
//   const receivingRequests = await api.getReceivingInvitations();

//   const friends = {
//     sentRequests,
//     friendList,
//     receivingRequests,
//   };

//   return friends;
// }

async function loginAsGuest() {
  const auth = await api.loginAsGuest();

  localStorage.setItem(
    "myinterests_app_access",
    JSON.stringify({
      username: auth.username,
      token: auth.token,
    })
  );
  throw redirect("/");
}

async function loginByGithub() {
  throw redirect(api.loginByGithub());
}
async function hasLogin() {
  const access = JSON.parse(localStorage.getItem("myinterests_app_access"));

  if (!access) return;

  const user = await api.getUser(access.username);
  if (user) {
    throw redirect("/");
  }
}

export default router;
