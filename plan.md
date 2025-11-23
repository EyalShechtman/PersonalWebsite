# Implementation Plan

# Implementation Plan: Blog Section
## 1. Overview/Goal
The objective is to create a new "Blog" section on the website. This section will be accessible via a new tab in the navigation bar. It will feature blog posts detailing the user's projects, with a main page listing all posts and individual pages for each post.
## 2. Step-by-Step Tasks
1.  **Create the Blog Data Source:**
    *   Create a new directory `content/blog` to store blog posts as Markdown files.
    *   Create initial placeholder Markdown files for a few projects (e.g., `pickle-rick-bot.md`, `picturai.md`).
    *   Each file will contain metadata (frontmatter) like `title`, `date`, `excerpt`, and the main content in Markdown format.
2.  **Develop Blog UI Components:**
    *   Create a `BlogCard` component to display a summary of each blog post on the main blog page.
    *   Create the main Blog page (`/app/blog/page.tsx`) that fetches data from the Markdown files and uses the `BlogCard` component to list them.
    *   Create a dynamic route and page (`/app/blog/[slug]/page.tsx`) to display the full content of a single blog post.
3.  **Integrate Navigation:**
    *   Modify the existing navigation bar component (`/app/components/ui/tubelight-navbar.tsx`) to add a new "Blog" link pointing to the `/blog` route.
4.  **Implement Data Fetching Logic:**
    *   Create a utility function to read the `content/blog` directory, parse the Markdown files (using a library like `gray-matter` and `remark`), and return the blog post data.
    *   Use this function in the main blog page to get all posts and in the individual post page to get the content for a specific slug.
5.  **Styling:**
    *   Add necessary CSS styles to `app/globals.css` or create a new CSS module to ensure the blog pages are visually consistent with the rest of the website.
## 3. Files to Modify/Create
### To Create:
*   `content/blog/pickle-rick-bot.md`: Blog post content for the first project.
*   `content/blog/picturai.md`: Blog post content for the second project.
*   `app/blog/page.tsx`: The main page for the blog, listing all posts.
*   `app/blog/[slug]/page.tsx`: The page template for displaying a single blog post.
*   `app/components/BlogCard.tsx`: A new UI component for the blog post preview.
*   `lib/posts.ts`: A utility file for functions that read and parse blog post data from the filesystem.
### To Modify:
*   `app/components/ui/tubelight-navbar.tsx`: To add the "Blog" navigation link.
*   `package.json`: To add new dependencies like `gray-matter` and `remark`.
*   `app/globals.css`: To add custom styles for the blog section.
## 4. Implementation Notes
*   **Content Management:** We will use local Markdown files for simplicity and version control. This avoids the need for an external CMS.
*   **Dependencies:** We will need to install `gray-matter` to parse the frontmatter from Markdown files and `remark` to convert the Markdown content to HTML.
*   **Routing:** We will leverage Next.js's App Router for creating the static main blog page and the dynamic individual post pages.
*   **Code Structure:** A new `lib` directory will be created for data fetching logic to keep the page components clean and focused on rendering.
