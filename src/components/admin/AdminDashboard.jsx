import React, { useState, useEffect } from 'react';

export const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'hero', 'gallery', 'services'

  // Data states
  const [heroImages, setHeroImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Modal / Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null for new, item object for edit
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [resHero, resGallery, resServices] = await Promise.all([
        fetch('/api/hero/admin/all', { headers }),
        fetch('/api/gallery/admin/all', { headers }),
        fetch('/api/services/admin/all', { headers }),
      ]);

      if (resHero.ok) setHeroImages(await resHero.json());
      if (resGallery.ok) setGalleryImages(await resGallery.json());
      if (resServices.ok) setServices(await resServices.json());
    } catch (err) {
      console.error(err);
      setMessage('Error loading backend data');
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  };

  // Open Modal for Create or Edit
  const openModal = (type, item = null) => {
    setEditingItem(item);
    setSelectedFile(null);
    if (item) {
      setFormData({ ...item });
    } else {
      if (type === 'hero') {
        setFormData({ title: '', subtitle: '', image: '', isActive: true, displayOrder: heroImages.length + 1 });
      } else if (type === 'gallery') {
        setFormData({ title: '', category: 'Sanctuary', description: '', image: '', isActive: true, displayOrder: galleryImages.length + 1 });
      } else if (type === 'services') {
        setFormData({ serviceId: '', title: '', description: '', imageKey: '', image: '', isActive: true, displayOrder: services.length + 1 });
      }
    }
    setModalOpen(true);
  };

  // Toggle Active State
  const toggleActive = async (type, item) => {
    try {
      const endpoint = `/api/${type}/${item._id}`;
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (res.ok) {
        showSuccess(`Updated ${type} item status`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Item
  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/${type}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showSuccess('Item deleted successfully');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Modal Form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const type = activeTab; // 'hero', 'gallery', or 'services'
    const isEdit = !!editingItem;
    const url = isEdit ? `/api/${type}/${editingItem._id}` : `/api/${type}`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      let body;
      const headers = { Authorization: `Bearer ${token}` };

      if (selectedFile) {
        body = new FormData();
        Object.keys(formData).forEach((key) => {
          body.append(key, formData[key]);
        });
        body.append('image', selectedFile);
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(formData);
      }

      const res = await fetch(url, { method, headers, body });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Operation failed');
      }

      showSuccess(`${isEdit ? 'Updated' : 'Added'} item successfully`);
      setModalOpen(false);
      fetchData();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-[#3D0813] text-white px-6 py-4 flex items-center justify-between shadow-lg border-b border-[#C9A24B]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#7A1428] text-[#D4AF6A] font-serif font-bold text-xl flex items-center justify-center border border-[#C9A24B]/40">
            H
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-[#D4AF6A]">HOMIV Spa Admin</h1>
            <p className="text-[10px] uppercase text-amber-200/70 tracking-widest">Client Control Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-amber-200 hover:text-white transition-colors underline font-medium"
          >
            Preview Site ↗
          </a>
          <button
            onClick={onLogout}
            className="bg-[#7A1428] hover:bg-red-700 text-white text-xs px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-colors shadow"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-2xl p-4 shadow-sm border border-gray-200 shrink-0 h-fit space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 pt-2">Menu</p>
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-3 ${
              activeTab === 'dashboard' ? 'bg-[#7A1428] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>📊</span> Dashboard
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between ${
              activeTab === 'hero' ? 'bg-[#7A1428] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center gap-3">🖼️ Hero Slides</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">{heroImages.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between ${
              activeTab === 'gallery' ? 'bg-[#7A1428] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center gap-3">📷 Gallery</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">{galleryImages.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between ${
              activeTab === 'services' ? 'bg-[#7A1428] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center gap-3">💆 Services</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20">{services.length}</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 min-h-[500px]">
          {message && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-semibold flex items-center justify-between animate-fadeIn">
              <span>✅ {message}</span>
              <button onClick={() => setMessage('')} className="text-emerald-900 font-bold">✕</button>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64 text-gray-400 font-semibold text-sm">
              Loading backend records...
            </div>
          ) : (
            <>
              {/* TAB 1: DASHBOARD OVERVIEW */}
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#5C0E1E] mb-2">Welcome, Admin</h2>
                  <p className="text-xs text-gray-500 mb-8">Overview of live website content records managed via database.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#F4ECE1] border border-[#C9A24B]/30 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#7A1428]">Hero Slideshow</p>
                      <p className="text-4xl font-serif font-bold text-[#5C0E1E] mt-2">{heroImages.length}</p>
                      <p className="text-[11px] text-gray-600 mt-1">{heroImages.filter(i => i.isActive).length} active on homepage</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#F4ECE1] border border-[#C9A24B]/30 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#7A1428]">Gallery Images</p>
                      <p className="text-4xl font-serif font-bold text-[#5C0E1E] mt-2">{galleryImages.length}</p>
                      <p className="text-[11px] text-gray-600 mt-1">{galleryImages.filter(i => i.isActive).length} active items</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#F4ECE1] border border-[#C9A24B]/30 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#7A1428]">Spa Services</p>
                      <p className="text-4xl font-serif font-bold text-[#5C0E1E] mt-2">{services.length}</p>
                      <p className="text-[11px] text-gray-600 mt-1">{services.filter(s => s.isActive).length} active therapies</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#7A1428] mb-1">Quick Instructions</h3>
                    <ul className="text-xs text-amber-900 space-y-1 list-disc pl-4">
                      <li>Use the menu on the left to add, edit, or remove images and services.</li>
                      <li>Toggle active switches to publish or hide items instantly on the website.</li>
                      <li>You can upload new images directly from your computer or use existing image paths.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: HERO SLIDESHOW */}
              {activeTab === 'hero' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-[#5C0E1E]">Hero Slideshow</h2>
                      <p className="text-xs text-gray-500">Manage images displayed in the main homepage hero slideshow.</p>
                    </div>
                    <button
                      onClick={() => openModal('hero')}
                      className="bg-[#7A1428] hover:bg-[#5C0E1E] text-white text-xs px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider shadow transition-all"
                    >
                      + Add New Hero Slide
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase tracking-wider font-bold">
                          <th className="p-3">Order</th>
                          <th className="p-3">Preview</th>
                          <th className="p-3">Title & Subtitle</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {heroImages.map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="p-3 font-bold text-gray-500">{item.displayOrder}</td>
                            <td className="p-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
                              />
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                              <p className="text-gray-500 text-[11px]">{item.subtitle}</p>
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => toggleActive('hero', item)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                  item.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {item.isActive ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => openModal('hero', item)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete('hero', item._id)}
                                className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: GALLERY */}
              {activeTab === 'gallery' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-[#5C0E1E]">Gallery Images</h2>
                      <p className="text-xs text-gray-500">Manage photo gallery items shown in the Visual Sanctuary section.</p>
                    </div>
                    <button
                      onClick={() => openModal('gallery')}
                      className="bg-[#7A1428] hover:bg-[#5C0E1E] text-white text-xs px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider shadow transition-all"
                    >
                      + Add New Gallery Image
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase tracking-wider font-bold">
                          <th className="p-3">Order</th>
                          <th className="p-3">Preview</th>
                          <th className="p-3">Title & Category</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {galleryImages.map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="p-3 font-bold text-gray-500">{item.displayOrder}</td>
                            <td className="p-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
                              />
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">{item.category}</span>
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => toggleActive('gallery', item)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                  item.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {item.isActive ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => openModal('gallery', item)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete('gallery', item._id)}
                                className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: SERVICES */}
              {activeTab === 'services' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-[#5C0E1E]">Spa Services</h2>
                      <p className="text-xs text-gray-500">Manage therapeutic spa massage services and descriptions.</p>
                    </div>
                    <button
                      onClick={() => openModal('services')}
                      className="bg-[#7A1428] hover:bg-[#5C0E1E] text-white text-xs px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider shadow transition-all"
                    >
                      + Add New Service
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase tracking-wider font-bold">
                          <th className="p-3">Order</th>
                          <th className="p-3">Preview</th>
                          <th className="p-3">Title & ID</th>
                          <th className="p-3">Description</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {services.map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="p-3 font-bold text-gray-500">{item.displayOrder}</td>
                            <td className="p-3">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-16 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
                                />
                              ) : (
                                <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] text-gray-400 font-bold">
                                  Default
                                </div>
                              )}
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                              <code className="text-[10px] text-[#7A1428] bg-red-50 px-1.5 py-0.5 rounded">{item.serviceId}</code>
                            </td>
                            <td className="p-3 max-w-xs truncate text-gray-600">{item.description}</td>
                            <td className="p-3">
                              <button
                                onClick={() => toggleActive('services', item)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                                  item.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {item.isActive ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => openModal('services', item)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-bold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete('services', item._id)}
                                className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-serif font-bold text-lg text-[#5C0E1E]">
                {editingItem ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20"
                />
              </div>

              {activeTab === 'hero' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20"
                  />
                </div>
              )}

              {activeTab === 'gallery' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20"
                  />
                </div>
              )}

              {activeTab === 'services' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Service Key ID (e.g., thai, swedish)</label>
                    <input
                      type="text"
                      required
                      value={formData.serviceId || ''}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value, imageKey: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Description *</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20"
                    />
                  </div>
                </>
              )}

              {/* Image Upload or Existing Image Path */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Upload Image File (Multer)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="w-full text-xs text-gray-900 font-medium border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Or Existing Image URL / Path</label>
                <input
                  type="text"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/src/assets/images/gallery1.png"
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder || 1}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.isActive ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#7A1428] focus:ring-2 focus:ring-[#7A1428]/20"
                  >
                    <option value="true">Active (Published)</option>
                    <option value="false">Inactive (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-[#7A1428] hover:bg-[#5C0E1E] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow"
                >
                  {submitting ? 'Saving...' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
