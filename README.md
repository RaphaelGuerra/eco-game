# 🦜 Eco Game

A Duolingo-style educational resort app built with React, featuring gamification mechanics, exploration-based discovery, and engaging learning experiences.

## ✨ Features

- **Gamification Engine**: XP, levels, streaks, hearts, gems, and achievements
- **Learning Path**: Structured units with bite-sized lessons
- **Exploration Mode**: Discover wildlife based on time of day and weather
- **Mascot**: Tuki the Toucan guides you through your journey
- **Celebrations**: Confetti, sound effects, and animations for every achievement
- **Mobile-First**: Responsive design optimized for mobile devices

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 5
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Audio**: Howler.js
- **Effects**: canvas-confetti
- **Icons**: Lucide React
- **Routing**: React Router v7

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Design system (Button, Card, Modal, etc.)
│   ├── gamification/ # Game mechanics (Hearts, Streak, XP, etc.)
│   ├── mascot/       # Tuki the Toucan
│   └── layout/       # App shell (TopBar, BottomNav)
├── screens/          # Full page views
├── stores/           # Zustand state management
├── lib/              # Utilities (sound, confetti, etc.)
├── styles/           # CSS and design tokens
└── data/             # Static content (coming soon)
```

## 🧭 Workflow

See the Pull Request Policy in [`plans/SYNC-WORKFLOW.md`](plans/SYNC-WORKFLOW.md:1).

## 🎮 Game Mechanics

### XP & Leveling
- Earn XP by completing lessons and discovering species
- Level up with an exponential XP curve
- Bonus XP for perfect lessons and streaks

### Hearts System
- Start with 5 hearts
- Lose a heart for wrong answers
- Hearts regenerate every 30 minutes
- Refill instantly with gems

### Streak System
- Maintain daily activity to build streaks
- Streak freezes protect against missed days
- Milestone rewards at 3, 7, 14, 30+ days

### Discovery System
- Explore to find wildlife
- Species availability varies by time of day
- Rarity system: Common, Uncommon, Rare, Legendary

## 🎨 Design System

### Colors
- **Primary**: Green (#10b981) - Growth, success
- **Secondary**: Blue (#3b82f6) - Exploration, discovery
- **Accent**: Amber (#f59e0b) - Rewards, gems
- **Coral**: (#fb7185) - Hearts, streaks

### Typography
- Font: Nunito (rounded, friendly)
- Weights: 400, 600, 700, 800

## 📱 Screens

1. **Onboarding** - Welcome flow with goal setting
2. **Dashboard** - Main hub with stats and quick actions
3. **Learning Path** - Unit and lesson progression
4. **Lesson** - Interactive challenges
5. **Explore** - Wildlife discovery
6. **Profile** - Stats and achievements
7. **Shop** - Spend gems on power-ups
8. **Collection** - Species album

## 🔊 Audio

Sound effects are loaded from `/public/sounds/`:
- `correct.mp3` - Correct answer
- `wrong.mp3` - Wrong answer
- `level-up.mp3` - Level up celebration
- `discovery.mp3` - Species discovered
- `button-press.mp3` - UI interaction

## 🗺️ Roadmap

- [ ] Backend integration (Supabase)
- [ ] Real leaderboards
- [ ] Push notifications
- [ ] More challenge types (matching, scramble)
- [ ] i18n (Spanish, Portuguese)
- [ ] Offline support

## 📄 License

MIT

---

Built with 💚 by the Eco Game team
