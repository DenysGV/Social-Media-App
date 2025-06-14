import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<PostPage />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App