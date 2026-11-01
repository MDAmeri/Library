import React, { useState } from 'react';
import { useBooks } from '../context/BookContext';
import { BookCard } from '../components/BookCard';
import { SearchBar } from '../components/SearchBar';

export const HomePage = () => {
  const { books } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="page-container">
      <header className="hero-header">
        <h1 className="hero-title">کاوش در کتابخانه</h1>
        <p className="hero-subtitle">
          روی تصویر هر کتاب برای مشاهده جزئیات کامل و روی کارت برای افزودن به مجموعه کلیک کنید
        </p>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      {filteredBooks.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#64748b' }}>
          کتابی با این عنوان پیدا نشد.
        </p>
      ) : (
        <section className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </section>
      )}
    </main>
  );
};

export default HomePage;