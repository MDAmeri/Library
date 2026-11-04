import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { BookProvider, useBooks } from "./context/BookContext";
import { HomePage } from "./pages/HomePage";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { CollectionPage } from "./pages/CollectionPage";
import { ExplorePage } from "./pages/ExplorePage"; // ایمپورت صفحه جدید

const Navigation = () => {
  const { selectedBooks } = useBooks();
  const location = useLocation();

  return (
    <nav className="glass-navbar">
      <Link to="/" className="brand-title">
        🕮 کتابخانه
      </Link>

      <div className="nav-links">
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
        >
          کتاب‌های محلی
        </Link>
        <Link
          to="/explore"
          className={`nav-item ${location.pathname === "/explore" ? "active" : ""}`}
        >
          اکتشاف آنلاین
        </Link>
        <Link
          to="/collection"
          className={`nav-item ${location.pathname === "/collection" ? "active" : ""}`}
        >
          مجموعه من
          <span className="badge-count">
            {selectedBooks.length.toLocaleString("fa-IR")}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <div className="ambient-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
        </div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  );
}
