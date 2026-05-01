# ElectionIQ 🗳️

ElectionIQ is an AI-powered interactive guide designed to demystify the Indian election process for first-time voters and students. Built with a modern React + Vite frontend, it integrates Google's powerful Gemini AI to provide real-time, accurate, and unbiased answers to any electoral questions.

![ElectionIQ AI Guide](public/favicon.svg)

## 🌟 Key Features

*   **AI Assistant:** A voice-enabled Chatbot powered by Google Gemini 2.0 Flash to answer questions ranging from Voter ID registration to EVM functionality.
*   **Interactive Learning Modules:** 6 step-by-step modules covering the entire election lifecycle.
*   **Visual Timelines & Charts:** Dynamic representations of the election process, Model Code of Conduct, and historical voting statistics.
*   **Fully Accessible:** Keyboard navigable with complete ARIA label support for screen readers.
*   **Highly Optimized:** Utilizes React `Suspense` and `lazy()` for component-level code splitting, ensuring blazing fast load times.
*   **Secure:** Implements `dompurify` to aggressively sanitize all AI outputs and protect against XSS injections.

## 🚀 Tech Stack

*   **Frontend:** React 19, Vite 8, CSS Modules
*   **AI Engine:** Google Gemini API (`@google/genai`)
*   **Cloud Services:** Google Firebase (Analytics/Hosting), Google Cloud Run
*   **Testing:** Vitest, React Testing Library
*   **Icons & Animation:** Lucide React, Framer Motion

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iam-ayushraj05/ElectionIQ.git
   cd ElectionIQ
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Run the Test Suite:**
   ```bash
   npm run test
   ```

## ☁️ Deployment (Google Cloud Run)

This project includes a `Dockerfile` and `nginx.conf` fully configured for Google Cloud Run deployment.

To deploy via Google Cloud CLI:
```bash
gcloud run deploy electioniq-app \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-build-env-vars="VITE_GEMINI_API_KEY=your_google_gemini_api_key_here"
```

## 🔒 Security Notes
* Never commit your `.env` file. It has been strictly ignored in `.gitignore`.
* The Docker container automatically maps to Cloud Run's dynamically injected `$PORT`.

---
*Built for PromptWars 2026*
