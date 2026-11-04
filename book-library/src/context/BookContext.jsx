import React, { createContext, useContext, useState, useEffect } from "react";

const BookContext = createContext();

const initialBooks = [
  {
    id: 101,
    title: "کد تمیز (Clean Code)",
    slug: "clean-code",
    price: 480000,
    publicationDate: "1401/05/12",
    image: "https://picsum.photos/seed/book101/400/560",
    description:
      "راهنمای جامع نوشتن کدهای خوانا، قابل نگهداری و مهندسی‌شده بر اساس اصول رابرت مارتین برای برنامه‌نویسان حرفه‌ای.",
  },
  {
    id: 102,
    title: "برنامه‌نویس عمل‌گرا (Pragmatic Programmer)",
    slug: "pragmatic-programmer",
    price: 540000,
    publicationDate: "1400/08/20",
    image: "https://picsum.photos/seed/book102/400/560",
    description:
      "یکی از ماندگارترین آثار مهندسی نرم‌افزار که ذهنیت حل مسئله، خودکارسازی و طراحی منعطف را از پایه آموزش می‌دهد.",
  },
  {
    id: 103,
    title: "معماری تمیز نرم‌افزار (Clean Architecture)",
    slug: "clean-architecture",
    price: 510000,
    publicationDate: "1402/02/15",
    image: "https://picsum.photos/seed/book103/400/560",
    description:
      "بررسی دقیق لایه‌بندی سیستم‌های بزرگ، جداسازی منطق تجاری از فریم‌ورک‌ها و طراحی ساختارهای مقیاس‌پذیر.",
  },
  {
    id: 104,
    title: "طراحی برنامه‌های داده‌محور",
    slug: "data-intensive-apps",
    price: 690000,
    publicationDate: "1402/11/03",
    image: "https://picsum.photos/seed/book104/400/560",
    description:
      "کاوش عمیق در معماری پایگاه‌های داده مدرن، سیستم‌های توزیع‌شده، کشینگ و پردازش جریان‌های عظیم داده.",
  },
  {
    id: 105,
    title: "الگوهای طراحی (Design Patterns)",
    slug: "design-patterns",
    price: 620000,
    publicationDate: "1399/12/10",
    image: "https://picsum.photos/seed/book105/400/560",
    description:
      "مرجع کلاسیک ۲۳ الگوی طراحی سازنده، ساختاری و رفتاری برای حل مسائل تکرارشونده در توسعه نرم‌افزار.",
  },
  {
    id: 106,
    title: "بازآفرینی و بهینه‌سازی کد (Refactoring)",
    slug: "refactoring",
    price: 575000,
    publicationDate: "1401/09/25",
    image: "https://picsum.photos/seed/book106/400/560",
    description:
      "تکنیک‌های گام‌به‌گام مارتین فاولر برای بهبود ساختار داخلی کدهای موجود بدون تغییر در رفتار بیرونی برنامه.",
  },
  {
    id: 107,
    title: "شناخت عمیق جاوااسکریپت مدرن",
    slug: "deep-javascript",
    price: 430000,
    publicationDate: "1403/01/18",
    image: "https://picsum.photos/seed/book107/400/560",
    description:
      "کالبدشکافی کامل کلوژرها، پروتوتایپ‌ها، حلقه رویداد (Event Loop) و برنامه‌نویسی ناهمگام در جاوااسکریپت.",
  },
  {
    id: 108,
    title: "الگوریتم‌ها و ساختمان داده‌های کاربردی",
    slug: "practical-algorithms",
    price: 495000,
    publicationDate: "1402/06/30",
    image: "https://picsum.photos/seed/book108/400/560",
    description:
      "آموزش تصویری و شهودی درخت‌ها، گراف‌ها، برنامه‌نویسی پویا و تحلیل پیچیدگی زمانی برای مسابقات و مصاحبه‌های فنی.",
  },
];

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("library_books_v2");
      const parsed = saved ? JSON.parse(saved) : initialBooks;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialBooks;
    } catch {
      return initialBooks;
    }
  });

  const [selectedBooks, setSelectedBooks] = useState(() => {
    try {
      const saved = localStorage.getItem("selected_books_v2");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("library_books_v2", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("selected_books_v2", JSON.stringify(selectedBooks));
  }, [selectedBooks]);

  const addBook = (newBook) => {
    setBooks((prev) => [...prev, { ...newBook, id: Date.now() }]);
  };

  const toggleCollection = (book) => {
    setSelectedBooks((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      if (exists) {
        return prev.filter((b) => b.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const removeMultipleFromCollection = (idsToRemove) => {
    setSelectedBooks((prev) => prev.filter((b) => !idsToRemove.includes(b.id)));
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        selectedBooks,
        toggleCollection,
        removeMultipleFromCollection,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
