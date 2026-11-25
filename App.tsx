import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ArchivePage } from './pages/ArchivePage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { SkillsPage } from './pages/SkillsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { GalleryPage } from './pages/GalleryPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

// Scroll to top helper on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="archive" element={<ArchivePage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
