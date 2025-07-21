# Cloudflare AI Motivational Assistant 🧠

This project delivers a dynamic and intelligent motivational quote generator, leveraging the power of Google's Generative AI within a robust Cloudflare Worker backend. It's designed to provide personalized uplifting messages based on user mood, all served through a modern, responsive frontend built with Tailwind CSS and TypeScript. Get ready to receive that perfectly tailored boost of inspiration! ✨

## 🚀 Installation

Getting this project up and running locally is straightforward. Just follow these steps:

### 1. Clone the Repository

Begin by cloning the project to your local machine:

```bash
git clone https://github.com/Jonatee/my-tailwind-ts-project.git
cd my-tailwind-ts-project
```

### 2. Install Dependencies

Install all the necessary project dependencies using npm:

```bash
npm install
```

### 3. Configure Google Generative AI API Key

This project relies on the Google Generative AI API. You'll need to obtain an API key and configure it for your Cloudflare Worker.

*   🌐 **Get your API Key**: Visit the [Google AI Studio](https://ai.google.dev/) to obtain your `GOOGLE_GENAI_API_KEY`.
*   🔑 **Configure for Cloudflare Worker**:
    For local development with `wrangler dev`, you can create a `.dev.vars` file in the project root:

    ```
    GOOGLE_GENAI_API_KEY="YOUR_API_KEY_HERE"
    ```

    For deployment to Cloudflare, you'll set this as a secret:

    ```bash
    wrangler secret put GOOGLE_GENAI_API_KEY
    # Paste your API key when prompted
    ```

### 4. Adjust Frontend API Endpoint (for Local Development)

The frontend `src/index.ts` currently points to a deployed Cloudflare Worker URL. For local development, you'll want it to call your local `wrangler dev` instance.

*   📂 **Open `src/index.ts`**: Locate the `fetch` call within the `generateQuotes` function.
*   ✏️ **Modify the URL**: Change the hardcoded URL to point to your local Cloudflare Worker development server. Typically, this will be `http://127.0.0.1:8787/generate-quote` or `http://localhost:8787/generate-quote`.

    ```typescript
    // Replace with your Cloudflare Worker local development URL
    const res = await fetch(
      "http://localhost:8787/generate-quote", // <--- Change this line
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood }),
      }
    );
    ```

## 🚀 Usage

Once installed and configured, you can run and interact with the application:

### 1. Start the Tailwind CSS Watcher

Open your first terminal and run the build command. This will compile your Tailwind CSS and watch for changes, ensuring your styles are always up-to-date.

```bash
npm run build
```

### 2. Start the Cloudflare Worker Development Server

Open a second terminal and start the Cloudflare Worker. This will serve your frontend files and expose the backend API for quote generation.

```bash
npm start
```

This command runs `wrangler dev`, which will provide a local URL (e.g., `http://127.0.0.1:8787`). Open this URL in your web browser.

### 3. Interact with the Application

*   You'll see a simple web interface with a text area.
*   **Enter your current mood** (e.g., "happy", "stressed", "feeling neutral", "excited") into the text area.
*   **Click the "Generate Quote" button** (or similar, depending on the frontend design).
*   The application will send your mood to the Cloudflare Worker, which uses Google GenAI to craft a personalized motivational message.
*   The generated quote will then be displayed on the screen.
*   You can close the quote panel and generate new quotes as desired.

### 4. Deploy to Cloudflare (Optional)

If you wish to deploy your worker to Cloudflare, ensure you've run `wrangler login` and then execute:

```bash
npm run deploy
```

Remember to revert the `src/index.ts` API endpoint change back to your deployed Cloudflare Worker URL if you plan to use the deployed frontend with the deployed backend.

## ✨ Features

*   **Mood-Based Motivation**: Generates personalized motivational quotes tailored to the user's input mood (positive, negative, or neutral).
*   **Intelligent Prompt Engineering**: Utilizes a sophisticated prompt structure for Google GenAI to ensure diverse, contextually relevant, and impactful messages.
*   **Cloudflare Worker Backend**: A lightweight, scalable, and performant serverless backend powered by Cloudflare Workers for efficient API handling.
*   **TypeScript-First Development**: Built entirely with TypeScript for enhanced code quality, maintainability, and developer experience.
*   **Modern Frontend Styling**: Responsive and visually appealing user interface crafted with Tailwind CSS.
*   **CORS Support**: Configured to handle Cross-Origin Resource Sharing requests, allowing flexible integration.

## 🛠️ Technologies Used

| Technology             | Description                                          | Link                                                  |
| :--------------------- | :--------------------------------------------------- | :---------------------------------------------------- |
| **TypeScript**         | Strongly typed superset of JavaScript                | [Official Website](https://www.typescriptlang.org/)   |
| **Tailwind CSS**       | Utility-first CSS framework                          | [Official Website](https://tailwindcss.com/)          |
| **Cloudflare Workers** | Serverless platform for building scalable applications | [Official Website](https://workers.cloudflare.com/)   |
| **Google Generative AI** | AI models for generating human-like text             | [Google AI Studio](https://ai.google.dev/)            |
| **Node.js**            | JavaScript runtime environment                       | [Official Website](https://nodejs.org/)               |
| **Wrangler**           | CLI tool for Cloudflare Workers                      | [GitHub Repository](https://github.com/cloudflare/wrangler) |
| **PostCSS**            | Tool for transforming CSS with JavaScript plugins    | [Official Website](https://postcss.org/)              |
| **Autoprefixer**       | PostCSS plugin to parse CSS and add vendor prefixes | [GitHub Repository](https://github.com/postcss/autoprefixer) |

## 🤝 Contributing

We welcome contributions to this project! If you're interested in making it even better, here’s how you can help:

*   🐛 **Report Bugs**: If you find any issues, please open an issue on the GitHub repository.
*   💡 **Suggest Features**: Have an idea for a new feature? Let us know by opening an issue!
*   👨‍💻 **Submit Pull Requests**: Feel free to fork the repository, make your changes, and submit a pull request. Please ensure your code adheres to the existing style and conventions.
*   📝 **Improve Documentation**: Found something unclear or missing in the README? Your help in improving the documentation is always appreciated.

Please ensure your commits are clear and concise, and that you test your changes thoroughly before submitting a pull request.

## 📄 License

This project is licensed under the **ISC License**. For more details, see the `package.json` file.

## 👤 Author Info

*   **Name**: Jonatee
*   **LinkedIn**: [Connect on LinkedIn](https://www.linkedin.com/in/jonathan-oluwole)
*   **Twitter**: [Follow on Twitter](https://twitter.com/_Jonatee)
*   **Portfolio**: [Visit My Portfolio](https://www.jonatee-placeholder.com)

---

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)