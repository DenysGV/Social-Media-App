import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import User from "./pages/User";
import UserEdit from "./pages/UserEdit";

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/user/edit/:id" element={<UserEdit />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App