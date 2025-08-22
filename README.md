# Prem Kashyap Portfolio - React App

A modern, responsive portfolio website built with React and deployed on Cloudflare Workers.

## Features

- 🚀 Built with React + Vite for fast development
- 🎨 Modern design with dark/light theme support
- 📱 Fully responsive design
- ⚡ Deployed on Cloudflare Workers for global performance
- 🔧 TypeScript ready
- 💫 Smooth animations and interactions

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account

### Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment to Cloudflare Workers

### Setup Wrangler

1. Install Wrangler globally:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Update `wrangler.toml` with your account ID and desired site name.

### Deploy

1. Build the project:
```bash
npm run build
```

2. Deploy to Cloudflare Workers:
```bash
npm run deploy
# or
wrangler deploy
```

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # CSS files
│   ├── data/            # JSON data files
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── wrangler.toml        # Cloudflare Workers configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to Cloudflare Workers

## Technologies Used

- React 18
- Vite
- CSS Variables for theming
- Intersection Observer API
- Cloudflare Workers
- Wrangler CLI

## License

MIT License - feel free to use this as a template for your own portfolio!
