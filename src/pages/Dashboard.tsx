import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Image, 
  Users, 
  Settings, 
  BarChart3, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  ExternalLink,
  X,
  Save,
  Upload,
  Globe,
  Mail,
  Phone
} from 'lucide-react';

interface Page {
  id: number;
  title: string;
  lastModified: string;
  status: 'Published' | 'Draft';
  content?: string;
  slug?: string;
}

interface MediaFile {
  id: number;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  maintenanceMode: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showCreatePageModal, setShowCreatePageModal] = useState(false);
  const [showEditPageModal, setShowEditPageModal] = useState(false);
  const [showUploadMediaModal, setShowUploadMediaModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  
  // Form states
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [pageStatus, setPageStatus] = useState<'Published' | 'Draft'>('Draft');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Data states
  const [pages, setPages] = useState<Page[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'TechLink',
    siteDescription: 'Your trusted technology partner',
    contactEmail: 'contact@techlink.com',
    contactPhone: '+1 (555) 123-4567',
    maintenanceMode: false,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const email = localStorage.getItem('userEmail');
      
      if (!isAuthenticated) {
        navigate('/signin', { replace: true });
      } else {
        setUserEmail(email);
        setIsLoading(false);
      }
    };

    checkAuth();
    
    // Load pages from localStorage
    const savedPages = localStorage.getItem('cms_pages');
    if (savedPages) {
      setPages(JSON.parse(savedPages));
    } else {
      // Initialize with default pages
      const defaultPages: Page[] = [
        { id: 1, title: 'Home Page', lastModified: getTimeAgo(new Date(Date.now() - 2 * 60 * 60 * 1000)), status: 'Published' },
        { id: 2, title: 'About Us', lastModified: getTimeAgo(new Date(Date.now() - 24 * 60 * 60 * 1000)), status: 'Published' },
        { id: 3, title: 'Services Overview', lastModified: getTimeAgo(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)), status: 'Draft' },
        { id: 4, title: 'Contact Page', lastModified: getTimeAgo(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)), status: 'Published' },
      ];
      setPages(defaultPages);
      localStorage.setItem('cms_pages', JSON.stringify(defaultPages));
    }
    
    // Load media files from localStorage
    const savedMedia = localStorage.getItem('cms_media');
    if (savedMedia) {
      setMediaFiles(JSON.parse(savedMedia));
    }
    
    // Load site settings from localStorage
    const savedSettings = localStorage.getItem('cms_settings');
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }
  }, [navigate]);

  // Save pages to localStorage whenever pages change
  useEffect(() => {
    if (pages.length > 0) {
      localStorage.setItem('cms_pages', JSON.stringify(pages));
    }
  }, [pages]);

  // Save media files to localStorage whenever mediaFiles change
  useEffect(() => {
    if (mediaFiles.length > 0) {
      localStorage.setItem('cms_media', JSON.stringify(mediaFiles));
    }
  }, [mediaFiles]);

  // Helper function to format time ago
  function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/signin', { replace: true });
  };

  const handleCreatePage = () => {
    setPageTitle('');
    setPageContent('');
    setPageStatus('Draft');
    setEditingPage(null);
    setShowCreatePageModal(true);
  };

  const handleSavePage = () => {
    if (!pageTitle.trim()) {
      alert('Please enter a page title');
      return;
    }

    if (editingPage) {
      // Update existing page
      const updatedPages = pages.map(p => 
        p.id === editingPage.id 
          ? { ...p, title: pageTitle, content: pageContent, status: pageStatus, lastModified: getTimeAgo(new Date()) }
          : p
      );
      setPages(updatedPages);
    } else {
      // Create new page
      const newPage: Page = {
        id: Date.now(),
        title: pageTitle,
        content: pageContent,
        status: pageStatus,
        lastModified: getTimeAgo(new Date()),
        slug: pageTitle.toLowerCase().replace(/\s+/g, '-'),
      };
      setPages([newPage, ...pages]);
    }

    setShowCreatePageModal(false);
    setShowEditPageModal(false);
    setPageTitle('');
    setPageContent('');
    setEditingPage(null);
  };

  const handleEditPage = (pageId: number) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setEditingPage(page);
      setPageTitle(page.title);
      setPageContent(page.content || '');
      setPageStatus(page.status);
      setShowEditPageModal(true);
    }
  };

  const handleDeletePage = (pageId: number) => {
    if (window.confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      const updatedPages = pages.filter(p => p.id !== pageId);
      setPages(updatedPages);
    }
  };

  const handleUploadMedia = () => {
    setUploadedFiles([]);
    setShowUploadMediaModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleSaveMedia = () => {
    if (uploadedFiles.length === 0) {
      alert('Please select at least one file to upload');
      return;
    }

    const newMediaFiles: MediaFile[] = uploadedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file), // In production, this would be a server URL
      uploadedAt: getTimeAgo(new Date()),
    }));

    setMediaFiles([...newMediaFiles, ...mediaFiles]);
    setUploadedFiles([]);
    setShowUploadMediaModal(false);
    alert(`${uploadedFiles.length} file(s) uploaded successfully!`);
  };

  const handleSiteSettings = () => {
    setShowSettingsModal(true);
  };

  const handleSaveSettings = () => {
    if (!siteSettings.siteName.trim() || !siteSettings.contactEmail.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    localStorage.setItem('cms_settings', JSON.stringify(siteSettings));
    setShowSettingsModal(false);
    alert('Site settings saved successfully!');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Calculate stats dynamically
  const stats = [
    { label: 'Total Pages', value: pages.length.toString(), icon: FileText, color: 'bg-blue-500' },
    { label: 'Media Files', value: mediaFiles.length.toString(), icon: Image, color: 'bg-green-500' },
    { label: 'Users', value: '8', icon: Users, color: 'bg-purple-500' },
    { label: 'Analytics', value: '1.2K', icon: BarChart3, color: 'bg-orange-500' },
  ];

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>CMS Dashboard - TechLink</title>
        <meta 
          name="description" 
          content="TechLink CMS Dashboard - Manage your website content" 
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {userEmail || 'Admin'}
                </span>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Site
                </a>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={handleCreatePage}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-colors cursor-pointer"
              >
                <Plus className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-700">Create New Page</span>
              </button>
              <button 
                onClick={handleUploadMedia}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-colors cursor-pointer"
              >
                <Image className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-700">Upload Media</span>
              </button>
              <button 
                onClick={handleSiteSettings}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-colors cursor-pointer"
              >
                <Settings className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-700">Site Settings</span>
              </button>
            </div>
          </motion.div>

          {/* Recent Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Pages</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search pages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPages.length > 0 ? (
                    filteredPages.map((page) => (
                      <tr key={page.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{page.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{page.lastModified}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              page.status === 'Published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {page.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEditPage(page.id)}
                              className="text-primary-600 hover:text-primary-900 transition-colors"
                              title="Edit page"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeletePage(page.id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Delete page"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No pages found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Create/Edit Page Modal */}
      <AnimatePresence>
        {(showCreatePageModal || showEditPageModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingPage ? 'Edit Page' : 'Create New Page'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreatePageModal(false);
                    setShowEditPageModal(false);
                    setPageTitle('');
                    setPageContent('');
                    setEditingPage(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="Enter page title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={pageContent}
                    onChange={(e) => setPageContent(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                    placeholder="Enter page content (HTML supported)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={pageStatus}
                    onChange={(e) => setPageStatus(e.target.value as 'Published' | 'Draft')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowCreatePageModal(false);
                    setShowEditPageModal(false);
                    setPageTitle('');
                    setPageContent('');
                    setEditingPage(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePage}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingPage ? 'Update Page' : 'Create Page'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Media Modal */}
      <AnimatePresence>
        {showUploadMediaModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Upload Media</h2>
                <button
                  onClick={() => {
                    setShowUploadMediaModal(false);
                    setUploadedFiles([]);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                    />
                    <span className="text-primary-600 hover:text-primary-700 font-medium">
                      Click to select files
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    Images, videos, documents (Max 10MB per file)
                  </p>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Selected Files:</h3>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Image className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowUploadMediaModal(false);
                    setUploadedFiles([]);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMedia}
                  disabled={uploadedFiles.length === 0}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-4 h-4" />
                  Upload {uploadedFiles.length > 0 && `(${uploadedFiles.length})`}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Site Settings Modal */}
      <AnimatePresence>
        {showSettingsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Site Name *
                  </label>
                  <input
                    type="text"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={siteSettings.contactPhone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Maintenance Mode
                    </label>
                    <p className="text-xs text-gray-500">
                      Enable to put the site in maintenance mode
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={siteSettings.maintenanceMode}
                      onChange={(e) => setSiteSettings({ ...siteSettings, maintenanceMode: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
