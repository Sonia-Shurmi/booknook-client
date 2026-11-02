# BookNook – A Small Online Library

**Every book holds a world. Find yours.**

BookNook is a modern online library platform where readers can explore books, borrow available copies, manage their borrowed books, and return them easily. Users can also add and manage their own book collections.

## Live Website

[Add your deployed website URL here]

## Features

- **User Authentication:** Register and log in using email and password or Google authentication.
- **Browse Books:** Explore the complete library collection with search and category filters.
- **Book Details:** View book descriptions, authors, categories, and available copies.
- **Add Books:** Authenticated users can add new books with cover images and descriptions.
- **Manage Your Books:** Edit or delete books added by your account.
- **Borrow Books:** Borrow available books by selecting a return date.
- **My Borrows:** View currently borrowed books and their return dates.
- **Return Books:** Return borrowed books and automatically update available copies.
- **Profile Management:** View and update your profile information.
- **Responsive Design:** Enjoy a consistent experience across desktop, tablet, and mobile devices.
- **Notifications:** Receive helpful success and error messages through toast notifications.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Better Auth
- MongoDB
- Swiper.js
- Lucide React
- Sonner
- ImgBB

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
```

### 2. Navigate to the client directory

```bash
cd client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the client root directory and configure the required variables:

```env
MONGODB_URI=
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_API_URL=
API_URL=
IMGBB_API_KEY=
```

Add your own environment variable values. Never commit secret keys or environment files to GitHub.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Future Improvements

BookNook can be expanded with additional features to make the reading and borrowing experience even better:

- **Book Ratings and Reviews:** Allow readers to rate books and share their opinions.
- **Personal Reading Lists:** Let users save books they want to read later.
- **Smart Recommendations:** Suggest books based on users' interests and reading preferences.
- **Borrowing Reminders:** Send notifications before book return deadlines.
- **Reading History:** Maintain a record of previously borrowed and read books.
- **Advanced Search:** Add more filtering and sorting options to help readers discover books.
- **Admin Dashboard:** Provide collection statistics and tools for managing library activity.
- **Dark Mode:** Introduce an alternative theme for a more comfortable browsing experience.

## Project Purpose

BookNook aims to make discovering, borrowing, and managing books simple and convenient through a clean, user-friendly digital library experience.