Design Document: AgoraAesthetic: "Cupertino Minimal" (Apple-Inspired)Core Libraries: framer-motion, lucide-react, tailwindcssTheme Strategy: Strict Light/Dark Mode (System Sync + Toggle)1. Design Philosophy: "Less, but Better"The interface will prioritize content (the code) over chrome (buttons/menus). We will use translucency (glassmorphism), subtle shadows, and physics-based motion to create depth and hierarchy without clutter.The "Apple" DNA Checklist:Typography: Sans-serif (Inter or system-ui). High contrast for headings, subtle greys for secondary text.Glassmorphism: Sidebars and modals will use backdrop-blur-xl to let background colors bleed through subtly.Rounded Corners: specific strict radius tokens (e.g., rounded-2xl for cards, rounded-lg for buttons).Micro-Interactions: Buttons shouldn't just change color; they should scale down slightly on click (scale-95).Borders: Extremely subtle 1px borders (e.g., border-white/10 in dark mode) to define edges without harsh lines.2. Color SystemWe will use semantic naming for colors to handle the Light/Dark switch effortlessly.TokenLight Mode (White)Dark Mode (Black)UsageBackground#F5F5F7 (Off-white)#000000 (True Black)Main app background.Surface#FFFFFF (Pure White)#1C1C1E (Dark Grey)Cards, Modals, Editor bg.Primary#007AFF (Apple Blue)#0A84FF (Light Blue)CTAs, Active States.Text Primary#1D1D1F#F5F5F7Headings, Main Code.Text Secondary#86868B#86868BLabels, subtitles.Borderrgba(0,0,0, 0.1)rgba(255,255,255, 0.15)Dividers, Card borders.3. Landing Page DesignGoal: Convert visitors with elegance and clarity.A. Navigation Bar (Floating)Style: A floating "pill" shape centered at the top, not a full-width bar.Effect: backdrop-blur-md, bg-white/70 (light) or bg-black/70 (dark).Content: Logo (Icon + Text), "Features", "Pricing", and a "Sign In" button.B. Hero Section (The Hook)Typography: Massive, centered Headline.Text: "Code together. Instantly."Style: Gradient text masked with a subtle animation (shimmer effect).Visual: A 3D-tilted screenshot of the editor interface (using CSS 3D transforms) that floats up as the page loads.CTA Button:"Get Started" -> Large, rounded pill shape.Hover: Glow effect (box-shadow) + slight lift (y: -2).Press: Scale down (scale: 0.98).C. Feature Grid (Bento Box Style)Inspired by Apple's product summary slides. A grid of uneven, rounded rectangles.Card 1 (Speed): "Real-time Sync." A minimal animation of a cursor moving.Card 2 (Tech): "Powered by Supabase." Logo centered with a glass glow.Card 3 (Focus): "Zen Mode." A toggle switch animation.Interaction: Hovering over a card creates a "spotlight" effect on the border.4. The Editor Interface (The Workspace)Goal: Distraction-free coding with powerful tools just a click away.A. Layout StructureInstead of a crowded IDE, think iPad App.Sidebar (Left): Collapsible. Contains File Explorer and Active Users.Style: Translucent glass. Icons (Lucide) only, until expanded.Main Stage (Center): The Monaco Editor.Style: Floating card with rounded corners (rounded-xl) and a subtle drop shadow (shadow-2xl). It does not touch the screen edges (16px padding around it).Output Panel (Bottom/Right):Style: A drawer that slides up from the bottom using AnimatePresence.B. The "Apple" Details in the EditorAvatars:User circles in the top right.When a user types, their avatar pulses with a colored ring.Cursors:Remote cursors shouldn't be jarring vertical lines. They should have a "flag" with the user's name that fades out when they stop typing.Command Palette (Cmd + K):Opens a spotlight-like search bar in the center of the screen.Use cmdk library styled with blurred background.5. Motion & Interaction (Framer Motion)We will use spring physics (stiffness: 400, damping: 30) for everything. No linear easings.Page Transitions:When moving from Landing -> App, the Hero screenshot expands to fill the screen, becoming the actual editor (Shared Layout Animation).Modals/Dialogs:Scale up from 0.9 to 1.0 and fade in.Background backdrop blurs in.Theme Toggle:An icon that rotates 180deg while morphing from a Sun (Lucide Sun) to a Moon (Lucide Moon).6. Technical Implementation Plan for DesignDependenciesBashnpm install framer-motion lucide-react clsx tailwind-merge
Tailwind Config (tailwind.config.js)We need to extend the config to support our "Apple" spacing and blurs.JavaScriptmodule.exports = {
  darkMode: 'class', // Manual toggle
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Closest to San Francisco
      },
      colors: {
        apple: {
          blue: '#007AFF',
          gray: '#F5F5F7',
          dark: '#1C1C1E',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow': '0 0 20px rgba(0, 122, 255, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  }
}
Component Example: The Glass CardJavaScriptimport { motion } from 'framer-motion';

const GlassCard = ({ children, className }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`
      bg-white/60 dark:bg-black/60 
      backdrop-blur-xl 
      border border-white/20 dark:border-white/10
      rounded-2xl shadow-xl
      ${className}
    `}
  >
    {children}
  </motion.div>
);