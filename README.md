# TanStack React Form Tutorial

A modern React form management application built with TanStack React Form, TypeScript, and Vite. This project demonstrates form validation, field management, and integration with TanStack DevTools.

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack React Form** - Form state management and validation
- **Zod** - Schema validation (available for use)
- **TanStack DevTools** - Development tools for debugging forms

## ✨ Features

- **Form State Management**: Leverages TanStack React Form for efficient form state handling
- **Field Validation**:
  - Synchronous validation with custom validators
  - Asynchronous validation support
  - Real-time error display
- **Form Fields**:
  - Text inputs (firstName, lastName, email)
  - Checkbox groups (hobbies)
- **Developer Experience**:
  - TanStack DevTools integration for form debugging
  - TypeScript for type safety
  - Hot Module Replacement (HMR) with Vite

## 📦 Installation

```bash
# Install dependencies
pnpm install
```

## 🛠️ Development

```bash
# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## 🏗️ Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📝 Code Quality

```bash
# Run ESLint
pnpm lint

# Format code with Prettier
pnpm format
```

## 🎯 Project Structure

```
src/
├── App.tsx          # Main form component
├── App.css          # Component styles
├── main.tsx         # Application entry point with DevTools
└── index.css        # Global styles
```

## 🔍 Form Features

### Current Implementation

The form includes:

- **First Name**: Required field with minimum length validation and async validation
- **Last Name**: Required field with minimum length validation
- **Email**: Required field with email format validation
- **Hobbies**: Checkbox group for multiple selections

### Validation Examples

The project demonstrates:

- **Synchronous validation**: Immediate validation on change
- **Asynchronous validation**: Delayed validation with loading states
- **Error display**: Shows validation errors when fields are touched

## 🛠️ DevTools

TanStack DevTools are integrated and can be used to:

- Inspect form state
- Debug field values
- Monitor validation status
- Track form submissions

## 📚 Resources

- [TanStack React Form Documentation](https://tanstack.com/form/latest)
- [Zod Documentation](https://zod.dev/)
- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)

## 📄 License

This is a tutorial project for learning purposes.
