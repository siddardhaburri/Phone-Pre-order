# NEXTGEN MOBILE — Two-Page Smartphone Showcase

A clean, premium two-page smartphone showcase website built with **React 18**, **React Router v6**, and **Tailwind CSS**.

---

## 📱 Page Architecture

### PAGE 1 — Smartphone Gallery (`/`)
* **Minimalist Design**: Pure white background (`#FFFFFF`), generous whitespace, and clean alignment.
* **Responsive Grid**: 2-column mobile layout (`grid-cols-2`) and 4-column desktop layout (`lg:grid-cols-4`).
* **Visuals Only**: Large, high-resolution smartphone product images (`object-contain`) in equal-sized containers (`aspect-[3/4]`).
* **No Clutter**: Zero specifications, descriptions, prices, promotional banners, or unnecessary elements on Page 1.
* **Navigation**: Clicking any smartphone card smoothly transitions to that phone's individual details page.

### PAGE 2 — Individual Smartphone Details (`/devices/:id`)
* **Dedicated Routes**:
  * `/devices/iphone-duo`
  * `/devices/galaxy-s27-ultra`
  * `/devices/iphone-18`
  * `/devices/motorola-signature-28`
* **Direct URL Access**: Directly navigating to or sharing any device URL works seamlessly.
* **Browser Navigation**: Full browser forward/back history support with an intuitive **"Back to Devices"** action.
* **Complete Technical Specifications**:
  * Display size and technology
  * Refresh rate
  * Processor
  * RAM
  * Internal storage
  * Rear camera
  * Front camera
  * Battery capacity
  * Charging speed
  * Operating system
  * Available colours with visual swatches
  * Device dimensions and weight
  * Concept / unconfirmed specification transparency disclosure

---

## 🚀 Running the App

```bash
# Vite Dev Server (port 5173)
npm --prefix client run dev

# Or unified production server (port 5000)
npm start
```
