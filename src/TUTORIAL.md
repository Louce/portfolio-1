# KineticFolio: Building a Stunning One-Page Portfolio (Detailed Video Tutorial Script)

**(Video formatting: This script is designed for a 30-minute runtime, assuming a steady but clear speaking pace of ~150 words per minute. Visual cues and on-screen actions are in brackets.)**

---

### [CHAPTER] (0:00) Introduction: Building an Animated Masterpiece

**[Video Start: Energetic, inspiring background music fades in. The screen shows a dynamic, full-screen recording of the final KineticFolio website. The camera smoothly scrolls, showcasing the hero text animation, the sections gracefully animating into view, the 3D project cards tilting on hover, and the AI feedback analysis in action. The overall impression is polished, professional, and alive.]**

"Hey everyone, and welcome to the channel! Have you ever wanted to build a truly modern, stunning, and high-performance web application from the ground up, but felt overwhelmed by all the choices? How do you correctly combine a powerful full-stack framework with a lightning-fast styling workflow, a professional component library, breathtaking animations, and even AI?

Well, today, you are going to find out.

In this in-depth, 30-minute tutorial, we are going to build this exact application: **KineticFolio**. It's a visually captivating, one-page portfolio designed to be an interactive art piece, showcasing skills not just with words, but through the very experience of using it. By the end of this video, you will not only have this incredible project, but you will deeply understand the 'why' behind the 'how' from a senior developer's perspective. You'll learn to harness the power of **Next.js** and its App Router for full-stack development, build completely custom designs at incredible speed with **Tailwind CSS**, use my absolute favorite way to handle components with **ShadCN UI**, orchestrate complex animations with **Framer Motion**, and even integrate a powerful **Genkit** AI feature to make your project stand out.

If that sounds good to you, make sure you're subscribed to the channel, because we're about to cover a lot of ground. The full, final source code for the project is available on GitHub, and you'll find that link in the description below so you can follow along or check your work.

Alright, let's get right into it and set up our foundation."

---

### [CHAPTER] (2:30) Part 1: The Foundation - Project Setup & Tech Deep Dive

**[On Screen: A clean, empty terminal window.]**

"Alright, first things first, let's get our project bootstrapped. I'm here in my terminal, and we're going to use the official `create-next-app` command. So, type this with me: `npx create-next-app@latest kineticfolio`. We're calling it `kineticfolio`. Now, this will ask us a series of questions that are critical for getting our setup right from the start.

We definitely want to use **TypeScript**, so select 'Yes'. Say 'Yes' to **ESLint** for code quality. 'Yes' to **Tailwind CSS**, which is our styling engine. We'll use the `src/` directory for better organization, so say 'Yes' to that. And crucially, make sure you say 'Yes' to using the **App Router**. It's the modern, powerful, recommended way to build Next.js apps, and this entire tutorial is built around its strengths. Finally, you can say 'No' to customizing the default import alias.

While that's installing, let's quickly talk about why this specific stack is so powerful.

**Next.js with the App Router** is our application's entire skeleton and nervous system. Looking at the file structure, you'll see the `src/app` directory. This is key. It enables React Server Components, which means we can fetch data and render components on the server, sending minimal JavaScript to the client. This is a huge win for performance.

**Tailwind CSS** is our styling engine. It’s a utility-first CSS framework that will allow us to build completely custom, professional designs without ever leaving our HTML or writing a separate CSS file.

And finally, **ShadCN UI**. This is the part that might be new to you, and it's a game-changer. Once our project is open in VS Code, we'll initialize ShadCN. It's not a typical component library you install. Instead, you use its command-line tool to copy the source code of beautifully designed, accessible components directly into your project. This means you **own the code**. You have 100% control to customize it.

Okay, the installation is done. Let's `cd kineticfolio` and open it up in VS Code."

**[On Screen: The newly created project is now open in VS Code. The terminal is visible at the bottom.]**

"Now, to set up ShadCN, we'll run its init command: `npx shadcn-ui@latest init`. It's going to ask you a few questions to configure itself for our project—the defaults it suggests are usually perfect, so you can just press Enter through the prompts. It will detect you're using TypeScript, Default and Neutral for the theme, your `src/app/globals.css` file, and that you want to use CSS Variables, which is critical for our theming.

Once that's done, it creates a `components.json` file to store our config and a `lib/utils.ts` file. Now, let's add all the components we'll need for this entire project in one go. You can find this full command in the project's `TUTORIAL.md` file on GitHub, but it looks like this:

`npx shadcn-ui@latest add button card sheet input textarea label toast form badge carousel accordion alert-dialog avatar dialog dropdown-menu popover progress radio-group scroll-area select separator slider switch table tabs tooltip`

Look at that! If you check your `src/components/ui` folder, it's now populated with the full source code for every one of those components. This is the power we're going to leverage. Okay, our foundation is set. Let's start building."

---

### [CHAPTER] (8:00) Part 2: Global Styles & Layout

**[On Screen: VS Code is focused on `src/app/globals.css`. The file is mostly empty except for the default `@tailwind` directives.]**

"Before we build our components, we need to define the soul of our application: the theme. Open up the file at `src/app/globals.css`. We're going to define all of our colors here using CSS variables, which is the modern and correct way to handle theming, especially for light and dark modes.

**[Narrator types or pastes the CSS variable definitions into the `:root` and `.dark` blocks.]**

I'm defining variables for `--background`, `--foreground`, `--primary`, `--accent`, and so on. Notice I'm using HSL values. This makes it incredibly easy to tweak our color palette later. The `.dark` class selector automatically contains all the overrides for our dark theme. Next.js and the `next-themes` package will handle toggling this class on the `<html>` element for us.

Next, let's open `src/app/layout.tsx`. This is the root shell of our entire application. Every page will be wrapped by this component. It's the perfect place for things that need to be on every page, like our font, our navigation bar, and our theme provider.

First, I'll set up the 'Inter' font from `next/font/google`. Then, inside the `<body>` tag, I'll wrap the `children` with the `<ThemeProvider>` from `next-themes`, which we'll need to install. I'll also add our `<Toaster>` component for notifications, and I'll stub out where our `<Navbar>` from `src/components/layout/Navbar.tsx` will go. Finally, I'll fill out the `metadata` object. This is super important for SEO—it tells Google and social media sites what our page is about, what title to show, and what image to use for previews. A professional project always has good metadata.

With our global styles and layout configured, we can start building the actual page."

---

### [CHAPTER] (12:30) Part 3: The Core Build - Crafting the Projects Section

**[On Screen: VS Code is focused on `src/app/page.tsx`.]**

"Okay, this is where the magic happens. We're going to build out the most visually impressive section of our portfolio: the Projects section. A great application is built on solid, reusable foundations. So, before we build the big sections, let's look at a key architectural component.

Inside `src/components/layout`, there's a `SectionWrapper.tsx` component. This is a simple `<section>` element that provides consistent padding and vertical centering. It's a reusable layout primitive that ensures a rhythmic, well-paced scrolling experience. We'll use this for all our top-level sections.

Now, our `src/app/page.tsx` becomes incredibly simple and readable. It's just a sequence of our main section components: `<Hero />`, `<About />`, `<Skills />`, and the `<Projects />` component that we're about to build. This declarative structure is a hallmark of clean React architecture.

Let's start building the **Projects Section**. Create a new file at `src/components/sections/Projects/Projects.tsx`.

First, I'll define a constant called `projectsData`. This will be an array of objects, where each object represents one of our projects, containing its title, description, image URLs, and the tech stack. In a real application, this data would come from a database or a CMS, but for this tutorial, a local constant is perfect.

Now, for the card itself. We're going to create a `ProjectCard` component right inside this file. This is where we combine our coolest technologies. The root will be a `CardContainer` component. This isn't a standard ShadCN component; if you look in `src/components/ui/3d-card/card-3d.tsx`, you'll see it's a custom component that uses React's `onMouseMove` event to create that awesome 3D tilt effect with CSS transforms. This is a fantastic example of enhancing a base component.

Inside that, we'll use `CardBody` and `CardItem`.

**[Narrator live-codes the `ProjectCard` component, explaining each part.]**

'The `CardItem` component is really cool. It takes a `translateZ` prop. This tells Framer Motion how much to 'lift' that element off the card when you hover over it, creating that 3D perspective. I'll make the title lift by `translateZ="60"`, the description by `translateZ="50"`, and so on. For the image, I'm using Next.js's `<Image>` component from `next/image` for automatic optimization. Notice the `sizes` prop—this is a key performance optimization that tells the browser how much space the image will take up at different screen sizes, so it can download the most efficient version.

Now for the 'View Details' button. When this is clicked, we want to open a side panel. For that, we use ShadCN's `<Sheet>` component. The state for the currently selected project will live in our main `Projects` component, managed with a simple `useState<Project | null>(null)`. When a project is selected, the `<Sheet>`'s `open` prop becomes true.

Inside the `SheetContent`, we're going to put a `<Carousel>` component, another powerful component from ShadCN, which you can find at `src/components/ui/Carousel/carousel.tsx`. We'll pass the `mediaGallery` of our selected project to this carousel. I'm also adding the `embla-carousel-autoplay` plugin to make it automatically cycle through the images, which feels very professional.

And just like that, by composing these powerful tools—Framer Motion for animation, Next.js for performance, and ShadCN for the UI building blocks—we've created a truly stunning, interactive, and feature-rich project showcase. This is the workflow that modern web development enables."

---

### [CHAPTER] (24:00) Part 4: The "Wow" Factor - Integrating Genkit AI

**[On Screen: VS Code is focused on `src/ai/flows/review-feedback-flow.ts`.]**

"Okay, our portfolio is already looking incredible. But what if we could add a truly standout feature that is sure to impress any visitor? Let's add some AI.

Using Google's **Genkit**, we can add a server-side AI flow with just a few lines of code. I've created a file at `src/ai/flows/review-feedback-flow.ts`. Look how clean this is. At the top of the file, we have `'use server';`, which tells Next.js that this code, even though it's imported by our client components, should only ever run on the server.

First, we define our input and output shapes using **Zod**. We tell the AI we expect to give it a `feedbackText` string, and we expect to receive a structured JSON object back with a `sentiment`, a `summary`, and a `suggestedAction`. Using Zod like this is a senior-level best practice. It makes our AI interactions type-safe and reliable.

Next, we define the prompt itself using `ai.definePrompt`. We're telling the Gemini model, 'You are a helpful assistant. Analyze this feedback and your response MUST conform to the specified JSON schema.' This is called structured prompting, and it's key to getting reliable, machine-readable output from an LLM.

Finally, we wrap this in an `ai.defineFlow` function. This whole file is a server-side function. Back on our frontend, in the `Feedback` section (`src/components/sections/Feedback/Feedback.tsx`), we can just `import { reviewFeedback }` and `await` it as if it were a local function. Next.js's Server Actions handle all the complex networking and API creation for us in the background. It feels like magic, but it's just modern web development. With this, our portfolio doesn't just show off projects; it uses AI to actively improve itself based on user input."

---

### [CHAPTER] (27:00) Final Touches & Deployment

**[On Screen: Browser showing the finished, polished application. Then, switch to the Vercel dashboard.]**

"And with that, the core development of our KineticFolio is complete! Before we wrap up, let's do a final review. We'll check for responsiveness... and as you can see, by using Tailwind's responsive utilities like `md:` and `lg:`, it looks fantastic on any screen size. We'll scroll up and down one last time, seeing our `whileInView={{ once: false }}` animations re-trigger every single time, keeping the page feeling alive.

Now, what good is an app if you can't share it with the world? Let's deploy it. Since our project is a Next.js app, the best place to host it is **Vercel**, the company that created Next.js.

The process is incredibly simple. First, make sure all your code is pushed to a GitHub repository. Then, sign in to your Vercel account, click 'Add New... > Project', and import that GitHub repository. Vercel will automatically detect that it's a Next.js project and configure all the build settings for you. All you have to do is hit 'Deploy', and in about a minute, your application will be live on the web with a shareable URL. It is truly that simple."

---

### [CHAPTER] (28:30) Outro & What's Next

**[On Screen: Back to the finished application, maybe slowly cycling through the dark and light themes. A final slate with links appears.]**

"And there you have it! In just under 30 minutes, we went from an empty folder to a fully functional, beautifully animated, AI-enhanced web application using a modern, powerful, and scalable tech stack. We learned how to set up a professional Next.js project, how to use Tailwind for rapid custom styling, and how to leverage Shadcn/UI for complete control over our components.

I really, really hope you found this tutorial valuable. If you did, do me a huge favor and smash that like button—it genuinely helps the channel reach more people. Subscribe and turn on notifications so you don't miss future deep dives just like this one.

The complete, finished source code for everything you saw today is linked right at the top of the description below. Go check it out, clone it, and make it your own. I would love to see what you build with these techniques, so let me know in the comments, or tell me what you'd like to see me build next.

Thanks so much for watching, and I'll see you in the next one. Happy coding!"

**[Video End: Outro music fades in, and an end screen appears with links to other videos and social media profiles.]**

    