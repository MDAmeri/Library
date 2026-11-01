import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';

export const BookDetailsPage = () => {
  const { id } = useParams();
  const { books, selectedBooks, toggleCollection } = useBooks();

  const book = books.find((b) => b.id.toString() === id || b.slug === id);

  if (!book) {
    return (
      <main className="page-container" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>کتاب مورد نظر یافت نشد.</h2>
        <Link to="/" className="nav-item">بازگشت به کتابخانه</Link>
      </main>
    );
  }

  const isSelected = selectedBooks.some((item) => item.id === book.id);

  return (
    <main className="page-container">
      <div className="details-glass-panel">
        <img
          src={book.image}
          alt={book.title}
          style={{
            width: '100%',
            borderRadius: '20px',
            boxShadow: '0 16px 40px rgba(30, 27, 75, 0.18)',
            objectFit: 'cover'
          }}
        />

        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: '999px',
              background: 'rgba(99, 102, 241, 0.14)',
              color: '#4f46e5',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: '12px'
            }}
          >
            شناسه کتاب: #{book.id.toLocaleString('fa-IR')}
          </span>

          <h1 style={{ fontSize: '2rem', lineHeight: '1.45', marginBottom: '18px', color: '#1e1b4b' }}>
            {book.title}
          </h1>

          <p style={{ fontSize: '1.05rem', marginBottom: '8px', color: '#334155' }}>
            <strong>تاریخ انتشار:</strong> {book.publicationDate}
          </p>

          <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#7c3aed', marginBottom: '24px' }}>
            قیمت: {Number(book.price || 0).toLocaleString('fa-IR')} تومان
          </p>

          <div
            style={{
              padding: '20px',
              borderRadius: '18px',
              background: 'rgba(255, 255, 255, 0.55)',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              lineHeight: '1.9',
              marginBottom: '28px',
              color: '#334155'
            }}
          >
            <h3 style={{ marginBottom: '8px', color: '#1e1b4b' }}>معرفی و توضیحات تکمیلی:</h3>
            <p>{book.description}</p>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => toggleCollection(book)}
              className={`neon-btn ${isSelected ? 'btn-active' : ''}`}
              style={{ width: 'auto', minWidth: '220px', marginTop: 0 }}
            >
              {isSelected ? 'حذف از مجموعه شخصی ✕' : 'افزودن به مجموعه شخصی +'}
            </button>

            <Link to="/" className="nav-item">
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;