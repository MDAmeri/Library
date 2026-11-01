import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';

export const BookCard = ({ book }) => {
  const { selectedBooks, toggleCollection } = useBooks();
  const isSelected = selectedBooks.some((item) => item.id === book.id);

  return (
    <div
      onClick={() => toggleCollection(book)}
      className={`glass-card ${isSelected ? 'card-selected-home' : ''}`}
      style={{ cursor: 'pointer' }}
    >
      {/* کلیک روی عکس، رویداد انتخاب کارت را متوقف کرده و وارد صفحه جزئیات می‌شود */}
      <Link
        to={`/book/${book.slug || book.id}`}
        onClick={(e) => e.stopPropagation()}
        className="card-image-wrap"
      >
        <img src={book.image} alt={book.title} className="card-image" />
      </Link>

      <h3 className="card-title">{book.title}</h3>
      <p className="card-meta">تاریخ انتشار: {book.publicationDate}</p>
      <p className="card-price">
        {Number(book.price || 0).toLocaleString('fa-IR')} تومان
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleCollection(book);
        }}
        className={`neon-btn ${isSelected ? 'btn-active' : ''}`}
      >
        {isSelected ? 'انتخاب‌شده در مجموعه ✓' : 'افزودن به مجموعه +'}
      </button>
    </div>
  );
};

export default BookCard;