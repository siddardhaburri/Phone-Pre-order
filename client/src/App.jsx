import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import DeviceDetailsPage from './pages/DeviceDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PAGE 1 — Smartphone Gallery */}
        <Route path="/" element={<GalleryPage />} />

        {/* PAGE 2 — Individual Smartphone Details */}
        <Route path="/devices/:id" element={<DeviceDetailsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
