import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../context/BookContext";

export const CollectionPage = () => {
  const { selectedBooks, removeMultipleFromCollection } = useBooks();
  const [markedIds, setMarkedIds] = useState([]);

  const toggleSelect = (id) => {
    setMarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = () => {
    removeMultipleFromCollection(markedIds);
    setMarkedIds([]);
  };

  return (
    <main className="page-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1 className="hero-title" style={{ fontSize: "1.8rem" }}>
            مجموعه انتخابی من
          </h1>
          <p className="hero-subtitle">
            برای مشاهده جزئیات روی جلد کتاب و برای انتخاب جهت حذف روی بدنه کارت
            کلیک کنید
          </p>
        </div>

        {selectedBooks.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            disabled={markedIds.length === 0}
            className="danger-neon-btn"
          >
            حذف موارد انتخاب‌شده ({markedIds.length.toLocaleString("fa-IR")})
          </button>
        )}
      </div>

      {selectedBooks.length === 0 ? (
        <div
          className="glass-card"
          style={{
            textAlign: "center",
            padding: "50px 20px",
            maxWidth: "520px",
            margin: "40px auto",
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>
            مجموعه شما در حال حاضر خالی است
          </h3>
          <p className="card-meta" style={{ marginBottom: "24px" }}>
            می‌توانید از صفحه اصلی کتاب‌های دلخواهتان را انتخاب کنید.
          </p>
          <Link to="/" className="nav-item" style={{ alignSelf: "center" }}>
            مشاهده لیست کتاب‌ها
          </Link>
        </div>
      ) : (
        <section className="books-grid">
          {selectedBooks.map((book) => {
            const isMarked = markedIds.includes(book.id);
            return (
              <div
                key={book.id}
                onClick={() => toggleSelect(book.id)}
                className={`glass-card ${isMarked ? "card-marked-delete" : ""}`}
                style={{ cursor: "pointer" }}
              >
                {/* کلیک روی تصویر، سرایت کلیک به کارت را متوقف کرده و وارد جزئیات کتاب می‌شود */}
                <Link
                  to={`/book/${book.slug || book.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="card-image-wrap"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="card-image"
                  />
                </Link>

                <h3 className="card-title">{book.title}</h3>
                <p className="card-price" style={{ marginBottom: "8px" }}>
                  {Number(book.price || 0).toLocaleString("fa-IR")} تومان
                </p>
                <span
                  style={{
                    marginTop: "auto",
                    textAlign: "center",
                    padding: "8px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    background: isMarked
                      ? "rgba(255, 255, 255, 0.8)"
                      : "rgba(255, 255, 255, 0.5)",
                    color: isMarked ? "#db2777" : "#475569",
                  }}
                >
                  {isMarked
                    ? "✓ انتخاب‌شده برای حذف"
                    : "برای انتخاب جهت حذف کلیک کنید"}
                </span>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default CollectionPage;
