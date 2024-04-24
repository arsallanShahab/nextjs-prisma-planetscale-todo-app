# Next.js Todo App with Prisma

This is a Todo application built with Next.js and Prisma. It uses TypeScript for static typing and Framer Motion for animations. The application also uses the Lucide React library for icons and Day.js for date handling.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building JavaScript applications.
- [Prisma](https://www.prisma.io/): An open-source database toolkit.
- [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript.
- [Framer Motion](https://www.framer.com/api/motion/): A library that provides animations and transitions.
- [Lucide React](https://github.com/lucide-icons/lucide): A set of well-designed SVG icons.
- [Day.js](https://day.js.org/): A minimalist JavaScript library for modern date utility.
- [React Hot Toast](https://react-hot-toast.com/): A library for adding notifications to your React app.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.

## Project Structure

- `src/`: This directory contains the source code of the application.
- `prisma/`: This directory contains Prisma configuration and schema files.
- `public/`: This directory contains static files like images.
- `components.json`: This file contains configuration for UI components.
- `package.json`: This file contains the list of project dependencies.

## Getting Started

To get started with this project:

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Copy the `.env.sample` file to a new file named `.env` and fill in the environment variables:
   - `DATABASE_URL`: Your database connection string.
   - `NEXTAUTH_SECRET`: A secret used to encrypt session data.
   - `NEXTAUTH_URL`: The base URL of your site.
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID.
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret.
4. Start the development server with `npm run dev`.

Please note that you will need to have Node.js and npm installed on your machine.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
