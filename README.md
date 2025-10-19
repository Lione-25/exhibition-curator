# Exhibition Curator Project

## Overview

The **Exhibition Curator Project** is a web application that allows users to create personalised virtual exhibitions using artworks from multiple museum and university collections. Users can search, filter, and select artworks, then view them in a curated exhibition with detailed information, images, and links to see the artworks in person. This project is designed for researchers, students, and art enthusiasts who want an interactive and user-driven art experience.

---

## Features

### Minimum Viable Product (MVP)

- **Search and Filter**: Users can search for artworks by keywords or select preset categories.
- **Personalised Exhibition**: Selected artworks are added to a temporary collection for the session.
- **Artwork Details**: Clicking on a thumbnail shows high-quality images and key information about the artwork.
- **Session-based Persistence**: Curated exhibitions persist throughout the user’s session.
- **External Links**: Users can access more information or visit the artwork in person.

---

## Technologies

- **Frontend**: React, TypeScript
- **APIs**:
  - [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/)
  - [Science Museum Group Collection API](https://collection.sciencemuseumgroup.org.uk/)
- **HTTP Client**: Axios
- **Hosting**: [Netlify](https://www.netlify.com/)
- **Styling**: CSS

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/exhibition-curator.git
cd exhibition-curator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```arduino
http://localhost:3000
```

## Usage

1. Enter a keyword in the search bar or select a category to filter artworks.

2. Browse search results and select artworks to add to your exhibition.

3. Click on an artwork thumbnail to view detailed information and images.

4. Curated exhibitions persist for the duration of your session.

## API Integration

### Met Museum API

- Provides access to over 470,000 artworks with images and metadata.
- Supports search by keyword, department (category), and highlights.
- Endpoints used:
  - Search: /public/collection/v1/search?q={query}&departmentId={id}
  - Object: /public/collection/v1/objects/{objectID}

### Science Museum API

- Provides access to a wide variety of objects and exhibitions.
- Supports search by keyword, category, and pagination.
- Endpoint used:
  - Search: /search/objects?q={query}&page[number]={page}&page[size]={size}&category={category}

## Project Structure

```bash
/src
  /components  - Reusable UI components
  /pages       - Page-level components (Home, Exhibition)
  /api         - API helper functions
  /context     - React Context
  /styles      - CSS files
  App.tsx      - Main React app
  main.tsx     - Entry point
```

## Non-Functional Requirements

- Responsive design for desktop and mobile devices.

- Accessibility considerations (ARIA attributes, keyboard navigation).

- Clear communication of errors and loading states.

- Fast loading of high-resolution images with loading indicators.

- Fully hosted on a free distribution platform with live URL provided.

## Hosting

This project is hosted on Vercel/Netlify and can be accessed at:

```arduine
https://your-project-url.vercel.app
```

## License

All data retrieved from museum APIs is used under their respective Open Access terms.
