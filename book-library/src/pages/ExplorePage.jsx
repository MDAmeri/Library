import React, { useState } from "react";
import { BookCard } from "../components/BookCard";

export const ExplorePage = () => {
  const [query, setQuery] = useState("");
  const [apiBooks, setApiBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // تابع ارتباط با API
  const handleSearchAPI = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      // ارسال درخواست به سرور Open Library
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}&limit=12`,
      );
      const data = await response.json();

      // تبدیل داده‌های خام API به ساختار استاندارد پروژه‌ی خودمان
      const formattedBooks = data.docs.map((doc) => ({
        id: doc.key.replace("/works/", ""), // شناسه یونیک
        title: doc.title,
        // چون API قیمت ندارد، یک قیمت تصادفی برای حفظ دیزاین تولید می‌کنیم
        price: Math.floor(Math.random() * 500 + 100) * 1000,
        publicationDate: doc.first_publish_year
          ? doc.first_publish_year.toString()
          : "نامشخص",
        // ساخت آدرس عکس بر اساس شناسه کاور در Open Library
        image: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
          : "https://picsum.photos/seed/fallback/400/560",
        description: `نویسنده: ${doc.author_name ? doc.author_name.join("، ") : "ناشناس"}`,
      }));

      setApiBooks(formattedBooks);
    } catch (error) {
      console.error("خطا در دریافت اطلاعات:", error);
      alert("خطایی در ارتباط با سرور رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  // اجرای جستجو با زدن دکمه Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchAPI();
    }
  };

  return (
    <main className="page-container">
      <header className="hero-header">
        <h1 className="hero-title">اکتشاف جهانی کتاب‌ها</h1>
        <p className="hero-subtitle">
          به میلیون‌ها کتاب در پایگاه داده Open Library متصل شوید و آن‌ها را به
          مجموعه خود اضافه کنید
        </p>

        {/* نوار جستجوی لجندری (مشابه صفحه اصلی) */}
        <div
          className="legendary-search-box"
          style={{ display: "flex", gap: "10px", padding: "6px" }}
        >
          <input
            type="text"
            className="legendary-search-input"
            placeholder="نام کتاب را به انگلیسی تایپ کنید (مثلاً Lord of the rings)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearchAPI}
            className="neon-btn"
            style={{ width: "120px", margin: "0", zIndex: 2 }}
          >
            جستجو در وب
          </button>
        </div>
      </header>

      {/* مدیریت وضعیت‌های مختلف شبکه (لودینگ، نتیجه خالی، نمایش داده‌ها) */}
      {isLoading ? (
        <div className="neon-spinner"></div>
      ) : hasSearched && apiBooks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#64748b" }}>
          نتیجه‌ای یافت نشد. کلمه دیگری را امتحان کنید.
        </p>
      ) : (
        <section className="books-grid">
          {apiBooks.map((book) => (
            /* استفاده مجدد از کامپوننت کارت کتاب برای داده‌های اینترنتی! */
            <BookCard key={book.id} book={book} />
          ))}
        </section>
      )}
    </main>
  );
};

export default ExplorePage;
