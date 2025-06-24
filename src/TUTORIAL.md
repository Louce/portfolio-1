# KineticFolio: Building a Stunning One-Page Portfolio (In-Depth Tutorial)

**(Video formatting: This script is designed for a 30-minute runtime, assuming a steady but clear speaking pace of ~150 words per minute. Visual cues and on-screen actions are in brackets. The word count is intentionally very high to provide maximum detail for a comprehensive video.)**

---

### [CHAPTER] (0:00) Introduction: From Static Page to Interactive Masterpiece

**[Video Start: Energetic, inspiring background music fades in. The screen shows a dynamic, full-screen recording of the final KineticFolio website. The camera smoothly scrolls, showcasing the hero text animation, the sections gracefully animating into view, the 3D project cards tilting on hover, and the AI feedback analysis in action. The overall impression is polished, professional, and alive.]**

"Hey everyone, and welcome to the channel! My name is Dendi, and if you're a developer, I want you to think about the last portfolio website you looked at. Was it clean? Professional? Probably. But was it... memorable? Did it feel like an experience, or did it feel like a static digital resume?

That's the exact question that led to the project we're going to build, from the ground up, in this video.

What if a portfolio could be more? What if it could be an interactive art piece, something that tells a story and showcases your skills not just with words, but through the very experience of using it?

In this in-depth, 30-minute tutorial, we are going to build this exact application: **KineticFolio**. It's a visually captivating, one-page portfolio designed around a philosophy I call 'Kinetic Elegance'. By the end of this video, you will not only have this incredible project, but you will deeply understand the 'why' behind the 'how' from a senior developer's perspective. You'll learn to harness the full-stack power of **Next.js** and its App Router. You'll learn to build completely custom, responsive designs at lightning speed with **Tailwind CSS**. You'll master my absolute favorite way to handle components with **ShadCN UI**. You'll orchestrate breathtaking, production-grade animations with **Framer Motion**. And, as a final 'wow' factor, you'll even integrate a powerful **Genkit** AI feature to make your project stand out from the crowd.

This is a big one, packed with professional, real-world techniques. If that sounds good to you, do me a quick favor and hit that like button and make sure you're subscribed to the channel, because we're about to cover a lot of ground. The full, final source code for the project is available on GitHub, and you'll find that link in the description below so you can follow along or check your work.

Alright, let's get right into it and set up our foundation."

---

### [CHAPTER] (2:45) Part 1: The Foundation - Project Setup & Tech Stack Deep Dive

**[On Screen: A clean, empty terminal window.]**

"Alright, every great project starts with a solid foundation. Let's get our project bootstrapped. I'm here in my terminal, and we're going to use the official `create-next-app` command, which is the standard way to start any new Next.js project. So, type this with me: `npx create-next-app@latest kineticfolio`. We're calling our project `kineticfolio`.

Now, this command-line interface will ask us a series of questions that are absolutely critical for getting our setup right from the very beginning. Let's walk through them.

-   'Would you like to use TypeScript?' **Absolutely, yes.** For any project of this complexity, TypeScript is non-negotiable. It provides static typing, which catches bugs before they ever make it to the browser and makes our code infinitely more maintainable.
-   'Would you like to use ESLint?' **Yes.** This is our code linter. It will enforce a consistent code style and help us avoid common pitfalls.
-   'Would you like to use Tailwind CSS?' **A definite yes.** This is our styling engine, and it's central to the entire design philosophy of this project.
-   'Would you like to use the `src/` directory?' **Yes.** This is a common convention for keeping our application code neatly organized and separated from configuration files in the root.
-   'Would you like to use the App Router?' **This is the most important one. YES.** The App Router is the modern, powerful, and recommended way to build Next.js apps. It enables React Server Components, nested layouts, and a host of performance optimizations that this entire tutorial is built around.
-   Finally, you can say 'No' to customizing the default import alias. The `@/*` alias it sets up for us is perfect.

While that's installing all of our initial dependencies, let's quickly talk about why this specific stack is so powerful and how these pieces fit together.

**Next.js with the App Router** is our application's entire skeleton and nervous system. It's a full-stack React framework. This means we're not just building a frontend; we're building a complete web application. By using the App Router, we get access to React Server Components. This is a game-changer. It means we can write components that render on the server, fetch data on the server, and send only the resulting HTML to the client. This dramatically reduces the amount of JavaScript the user has to download, leading to a much faster, more performant website.

**Tailwind CSS** is our styling engine. It’s a utility-first CSS framework. What that means is, instead of writing traditional CSS in separate files, we're going to use small, single-purpose classes directly in our JSX. This might seem strange at first, but it allows us to build completely custom, professional designs without ever leaving our component files, which massively speeds up development.

And finally, **ShadCN UI**. This is the part that might be new to you, and honestly, it's a game-changer in the React ecosystem. Okay, the installation is done. Let's `cd kineticfolio` and open it up in VS Code."

**[On Screen: The newly created project is now open in VS Code. The terminal is visible at the bottom.]**

"Now, to set up ShadCN, we'll run its initialization command in the integrated terminal: `npx shadcn-ui@latest init`. It's going to ask you a few questions to configure itself for our project. It's smart enough to detect our setup, so the defaults it suggests are usually perfect. Let's press Enter through the prompts. It will detect we're using TypeScript, it will suggest 'Default' and 'Neutral' for the base color theme, it will find our `src/app/globals.css` file for styling, and—this is critical—it will ask if we want to use CSS Variables for theming. **You absolutely want to say yes to this.** This is the secret to creating our beautiful light and dark modes.

Once that's done, you'll see it has created two things: a `components.json` file to store our configuration, and a `src/lib/utils.ts` file which contains a small but mighty helper function called `cn` that we'll use to merge our Tailwind classes.

Now for the magic. Shadcn is not a typical component library you install from npm. Instead, you use its command-line tool to **copy the source code** of beautifully designed, accessible components directly into your project. This means **we own the code**. We have 100% control to customize it.

Let's add all the components we'll need for this entire portfolio project in one go. This command is a bit long, but you can find it in the project's `README.md` file on GitHub. It looks like this:

`npx shadcn-ui@latest add button card sheet input textarea label toast form badge carousel accordion alert-dialog avatar dialog dropdown-menu popover progress radio-group scroll-area select separator slider switch table tabs tooltip`

**[Narrator executes the command.]**

Look at that! If you now open your `src/components/ui` folder, it's now populated with the full, un-minified source code for every single one of those components. This is the power and flexibility we're going to leverage throughout this build. We have the speed of using pre-built components with the complete control of writing them from scratch. It's the best of both worlds.

Okay, our foundation is set. It's time to start building."

---

### [CHAPTER] (8:30) Part 2: Global Styles & Root Layout

**[On Screen: VS Code is focused on `src/app/globals.css`. The file is mostly empty except for the default `@tailwind` directives.]**

"Before we build our first component, we need to define the soul of our application: the theme. A consistent and professional color palette is what separates amateur projects from professional ones. Open up the file at `src/app/globals.css`. This is where we'll define all of our site-wide styles.

We're going to define all of our colors here using CSS variables, which is the modern and correct way to handle theming, especially for supporting both light and dark modes.

**[Narrator types or pastes the CSS variable definitions into the `:root` and `.dark` blocks.]**

I'm pasting in our theme definition. Let's break this down. Inside the `@layer base` directive, we have a `:root` selector. This defines the variables for our default theme, which is the light theme. We're defining variables for `--background`, `--foreground` (which is the text color), `--primary` (our main brand color), `--accent`, and so on. Notice that I'm using HSL values, which stands for Hue, Saturation, and Lightness. Using HSL makes it incredibly easy to tweak our color palette later. For example, if we want to make our primary blue slightly darker, we just decrease the lightness value.

Right below that, we have the `.dark` selector. This block contains all the color overrides for our dark theme. When the `dark` class is applied to the `<html>` element, all of these variables will take precedence. Next.js and a package we'll install called `next-themes` will handle toggling this class on the `<html>` element for us automatically. This is a powerful and scalable way to manage themes.

Next, let's open `src/app/layout.tsx`. This is the root shell of our entire application. Every single page and component will be wrapped by this layout. It's the perfect place for things that need to be on every page, like our font, our navigation bar, our cookie banner, and our theme provider.

First, let's bring in the 'Inter' font from `next/font/google`. This is an amazing feature of Next.js that optimizes web fonts for us automatically. I'll import it and configure it with a CSS variable, `--font-inter`. This lets us use it easily in our Tailwind config.

Now, inside the `<body>` tag, this is where we'll set up our global providers. I'm going to wrap the `children` prop with the `<ThemeProvider>` from a package called `next-themes`. We'll need to install that. The ThemeProvider is what will manage switching between light and dark mode for us. Inside that, I'll wrap everything in a `<TooltipProvider>` from Shadcn, which enables all the tooltips across our app.

I'll also add our `<Toaster>` component for notifications, which we'll use later. And I'll stub out where our `<Navbar>` from `src/components/layout/Navbar.tsx` and our `<ThemeSwitcher>` will go.

Finally, and this is super important for any public-facing website, I'll fill out the `metadata` object that Next.js provides. This object controls the `<title>` tag, the meta description, keywords, and the Open Graph tags for social media previews. A professional project always has good metadata for SEO and shareability. I'm also adding a `viewport` export to control the theme color in the browser's address bar.

With our global styles, fonts, and root layout configured, we can finally start building the actual page."

---

### [CHAPTER] (13:00) Part 3: The Core Build - Crafting the Projects Section

**[On Screen: VS Code is focused on a new, empty file: `src/components/sections/Projects/Projects.tsx`.]**

"Okay, this is where the magic happens. We're going to build out what is arguably the most visually impressive and technically complex section of our portfolio: the Projects section. This section will demonstrate how to combine data, state management, custom components, and advanced animations.

But a great application is built on solid, reusable foundations. Before we dive into the `Projects` component, let's look at a key architectural piece I've prepared. Inside `src/components/layout`, there's a `SectionWrapper.tsx` component. This is a simple but vital component. It's a `<section>` element that provides consistent padding and vertical centering. It's a reusable layout primitive that ensures a rhythmic, well-paced scrolling experience as the user moves down the page. We'll use this for all of our top-level sections. Using wrappers like this keeps our code DRY—Don't Repeat Yourself.

Now, because we have this wrapper, our main page file at `src/app/page.tsx` becomes incredibly simple and readable. It's just a sequence of our main section components: `<Hero />`, `<About />`, `<Skills />`, and the `<Projects />` component that we're about to build. This clean, declarative structure is a hallmark of professional React architecture.

Alright, let's start building the **Projects Section**. Open the file at `src/components/sections/Projects/Projects.tsx`.

First, let's define our data. In a real-world application, this data would come from a database or a headless CMS. But for this tutorial, a local constant is perfect for demonstrating the concept. I'll define a constant called `projectsData`. This will be an array of objects, where each object represents one of our projects, containing its `id`, `title`, `description`, a `longDescription`, an array of `techStack` strings, and crucially, a `mediaGallery` array for our image carousel.

Now, for the card itself. The logic for a single project card is complex enough that it deserves its own component. So, right inside this file, we'll create a `ProjectCard` component that accepts a `project` object as a prop.

This is where we combine our coolest technologies. The root of the card will be a `CardContainer` component. This isn't a standard Shadcn component. If you look in the file tree at `src/components/ui/3d-card/card-3d.tsx`, you'll see it's a custom component that uses React's `onMouseMove` event to track the cursor's position relative to the card. It then uses that data to apply CSS transforms, creating that awesome 3D tilt effect. This is a fantastic example of enhancing a base component with custom logic.

Inside the `CardContainer`, we'll use `CardBody` and `CardItem`.

**[Narrator live-codes the `ProjectCard` component, explaining each part.]**

'The `CardItem` component is really cool. It takes a `translateZ` prop. This tells Framer Motion how much to 'lift' that element towards the viewer when you hover over the card, creating that incredible 3D perspective. I'll make the title lift by `translateZ="60"`, the description by `translateZ="50"`, and so on. This creates a clear visual hierarchy.

For the image, I'm using the `<Image>` component from `next/image` for automatic optimization. Notice the `sizes` prop—this is a key performance optimization that tells the browser how much space the image will take up at different screen sizes, so it can download the most efficient version possible. This is crucial for your site's performance metrics, like Largest Contentful Paint.

Now for the 'View Details' button. When this is clicked, we want to open a side panel with more information. For that, we use ShadCN's `<Sheet>` component. The state for which project is currently selected will live in our main `Projects` component, managed with a simple `useState<Project | null>(null)`. When the 'View Details' button is clicked, we'll call a function passed down via props, `onOpenSheet`, setting that state to the current project. When a project is selected in the state, the `<Sheet>`'s `open` prop becomes true, and it slides into view.

Inside the `SheetContent`, this is where we'll display the detailed project information. The centerpiece will be a `<Carousel>` component, another powerful component from Shadcn, which you can find at `src/components/ui/Carousel/carousel.tsx`. We'll pass the `mediaGallery` array from our selected project directly to this carousel.

I'm also adding the `embla-carousel-autoplay` plugin to make it automatically cycle through the images. This small touch makes the project feel much more dynamic and professional. We need a bit of state to manage this. I'll add `const [isPlaying, setIsPlaying] = useState(true);` and a button that toggles this state, which in turn calls the `play()` or `stop()` methods on the carousel's API. This gives the user full control.

And just like that, by composing these powerful tools—Framer Motion for the 3D effect, Next.js for the performant images, and Shadcn for the UI building blocks like the Card, Sheet, and Carousel—we've created a truly stunning, interactive, and feature-rich project showcase. This is the workflow that modern, component-driven web development enables, and it's an incredibly powerful way to build."

---

### [CHAPTER] (24:00) Part 4: The "Wow" Factor - Integrating Genkit AI

**[On Screen: VS Code is focused on `src/ai/flows/review-feedback-flow.ts`.]**

"Okay, our portfolio is already looking incredible. But what if we could add a truly standout feature that is sure to impress any visitor or potential employer? Let's add some AI.

We have a Feedback section in our app. Right now, it just collects feedback from users and stores it in their browser's local storage. That's cool, but we can take it to the next level. We're going to add a button that allows the user—in this case, the portfolio owner—to get an instant AI-powered analysis of any piece of feedback.

Using Google's **Genkit**, an open-source framework for building with generative AI, we can add a server-side AI flow with just a few lines of code. I've created a file at `src/ai/flows/review-feedback-flow.ts`. Look how clean and organized this is.

At the very top of the file, we have the string `'use server';`. This is a Next.js directive. It's one of the most powerful features of the App Router. It tells Next.js that this code, and all of its exports, even though they can be imported by our client-side React components, should only ever run on the server. This is how we can securely interact with AI models and API keys without exposing anything to the user's browser.

First, we define our input and output shapes using a library called **Zod**. Zod is a TypeScript-first schema declaration and validation library. We're creating a `ReviewFeedbackInputSchema` that expects a `feedbackText` string. And more importantly, we're creating a `ReviewFeedbackOutputSchema`. We are telling the AI that we expect to receive a perfectly structured JSON object back from it, with three specific fields: a `sentiment` which must be one of 'Positive', 'Neutral', or 'Negative'; a `summary` string; and a `suggestedAction` string. Using Zod like this is a senior-level best practice. It makes our interactions with the AI type-safe and reliable. We're not just hoping for the best; we're enforcing a contract.

Next, we define the prompt itself using `ai.definePrompt`. We're configuring it to use the Gemini 1.5 Flash model. We pass our Zod schemas to the `input` and `output` properties. Then, in the `prompt` string, we give the model its instructions: 'You are a helpful assistant... Your response MUST conform to the specified JSON schema.' This is called structured prompting, and it's the key to getting reliable, machine-readable output from a Large Language Model.

Finally, we wrap this in an `ai.defineFlow` function. This whole file defines a server-side function called `reviewFeedback`.

Now, here's the magic. Let's go back to our frontend component, `src/components/sections/Feedback/Feedback.tsx`. In this file, we can just `import { reviewFeedback }` from our AI flow file. Then, in our `handleAiReview` function, we can simply call `await reviewFeedback(...)` as if it were a normal, local asynchronous function. Next.js's Server Actions feature handles all the complex networking, API creation, serialization, and security for us completely automatically in the background. It feels like magic, but it's just the power of modern, integrated web development.

With this feature, our portfolio doesn't just show off projects; it uses AI to actively improve itself based on user input. That's a story that's sure to impress."

---

### [CHAPTER] (27:30) Final Touches & Deployment

**[On Screen: Browser showing the finished, polished application. Then, switch to the Vercel dashboard.]**

"And with that, the core development of our KineticFolio is complete! Before we wrap up, let's do a final review of what we've built.

We'll check for responsiveness... and as you can see, by using Tailwind's responsive utility classes like `md:` for medium screens and `lg:` for large screens, our layout adapts beautifully and looks fantastic on any screen size, from a large desktop monitor all the way down to a mobile phone.

We'll scroll up and down one last time, seeing our `whileInView={{ once: false }}` animations on each section re-trigger every single time, keeping the page feeling alive and dynamic. This is a small detail that has a huge impact on the user experience.

Now, what good is a world-class application if you can't share it with the world? Let's deploy it. Since our project is a Next.js app, the absolute best place to host it is **Vercel**, the company that created Next.js.

The process is incredibly simple. First, make sure all of your code is committed and pushed to a GitHub repository. Then, sign in to your Vercel account, click 'Add New... > Project', and import that GitHub repository. Vercel will automatically detect that it's a Next.js project and configure all the build settings for you. It knows exactly how to build, optimize, and deploy this application for the best possible performance. All you have to do is hit 'Deploy', and in about a minute, your application will be live on the web with a shareable URL, protected by a free SSL certificate. It is truly that simple."

---

### [CHAPTER] (29:00) Outro & What's Next

**[On Screen: Back to the finished application, maybe slowly cycling through the dark and light themes. A final slate with links appears.]**

"And there you have it! In just under 30 minutes, we went from an empty folder to a fully functional, beautifully animated, AI-enhanced web application using a modern, powerful, and scalable tech stack.

We learned how to set up a professional Next.js project with the App Router. We learned how to use Tailwind CSS for rapid, utility-first styling, and how to create a beautiful, custom theme with CSS variables. We mastered the Shadcn/UI workflow to gain full control over our components. We orchestrated complex animations with Framer Motion and custom hooks. And we seamlessly integrated a server-side AI feature with Genkit and Next.js Server Actions.

I really, really hope you found this tutorial valuable and that it's inspired you to build your own amazing projects. If you did, do me a huge favor and smash that like button—it genuinely helps the channel reach more people who could benefit from this content. Be sure to subscribe and turn on notifications so you don't miss future deep dives just like this one.

The complete, finished source code for everything you saw today is linked right at the top of the description below. Go check it out, clone it, and make it your own. I would love to see what you build with these techniques, so please let me know in the comments, or tell me what you'd like to see me build next.

Thanks so much for watching, and I'll see you in the next one. Happy coding!"

**[Video End: Outro music fades in, and an end screen appears with links to other videos and social media profiles.]**
