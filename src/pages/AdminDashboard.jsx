import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects'); 
  
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', link: '', github_link: '', image: '', tags: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({ title: '', description: '', link: '', github_link: '', image: '', tags: '' });

  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editBlogForm, setEditBlogForm] = useState({ title: '', date: '', excerpt: '', link: '', image: '' });
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [addBlogForm, setAddBlogForm] = useState({ title: '', date: '', excerpt: '', link: '', image: '' });

  const [testimonials, setTestimonials] = useState([]);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [addTestimonialForm, setAddTestimonialForm] = useState({ name: '', role: '', content: '', rating: 5, avatar: '' });
  
  const [uploadingImage, setUploadingImage] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const { data: pData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (pData) setProjects(pData);
      
      const { data: bData } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (bData) setBlogs(bData);

      const { data: tData } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (tData) setTestimonials(tData);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  // Testimonials Handlers
  const saveNewTestimonial = async () => {
    const { data, error } = await supabase.from('testimonials').insert([addTestimonialForm]).select();
    if (data) {
      setTestimonials([data[0], ...testimonials]);
      setIsAddingTestimonial(false);
      setAddTestimonialForm({ name: '', role: '', content: '', rating: 5, avatar: '' });
    } else {
      alert('Error: ' + error?.message);
    }
  };
  const handleDeleteTestimonial = async (id) => {
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  // Image Upload to Supabase
  const handleImageUpload = async (e, setFormFunc, currentForm) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.');
      e.target.value = '';
      return;
    }

    // Validasi ukuran file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.');
      e.target.value = '';
      return;
    }

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio_images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      alert('Gagal upload gambar. Error: ' + uploadError.message);
      setUploadingImage(false);
      return;
    }

    const { data } = supabase.storage.from('portfolio_images').getPublicUrl(fileName);
    setFormFunc({ ...currentForm, image: data.publicUrl });
    setUploadingImage(false);
  };

  // Projects Handlers
  const saveNewProject = async () => {
    const newProject = { ...addForm };
    if (!newProject.image) newProject.image = 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80';
    // Parse tags string to array
    if (typeof newProject.tags === 'string') {
      newProject.tags = newProject.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    
    const { data, error } = await supabase.from('projects').insert([newProject]).select();
    if (data) {
      setProjects([data[0], ...projects]);
      setIsAdding(false);
    } else {
      alert("Error: " + error?.message);
    }
  };
  const handleDeleteProject = async (id) => {
    await supabase.from('projects').delete().eq('id', id);
    setProjects(projects.filter(p => p.id !== id));
  };
  const saveEditProject = async (id) => {
    const toSave = { ...editForm };
    if (typeof toSave.tags === 'string') {
      toSave.tags = toSave.tags.split(',').map(t => t.trim()).filter(Boolean);
    }
    const { data, error } = await supabase.from('projects').update(toSave).eq('id', id).select();
    if (data) {
      setProjects(projects.map(p => p.id === id ? data[0] : p));
      setEditingProject(null);
    } else {
      alert("Error: " + error?.message);
    }
  };

  // Blogs Handlers
  const saveNewBlog = async () => {
    const newBlog = { ...addBlogForm };
    if(!newBlog.date) {
      const now = new Date();
      newBlog.date = `${now.getDate()} ${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`;
    }
    const { data, error } = await supabase.from('blogs').insert([newBlog]).select();
    if (data) {
      setBlogs([data[0], ...blogs]);
      setIsAddingBlog(false);
    } else {
      alert("Error: " + error?.message);
    }
  };
  const handleDeleteBlog = async (id) => {
    await supabase.from('blogs').delete().eq('id', id);
    setBlogs(blogs.filter(b => b.id !== id));
  };
  const saveEditBlog = async (id) => {
    const { data, error } = await supabase.from('blogs').update(editBlogForm).eq('id', id).select();
    if (data) {
      setBlogs(blogs.map(b => b.id === id ? data[0] : b));
      setEditingBlog(null);
    } else {
      alert("Error: " + error?.message);
    }
  };

  return (
    <div className="section container" style={{ minHeight: '100vh', paddingTop: '4rem', position: 'relative' }}>
      <div className="bg-blob" style={{ top: '10%', left: '10%', width: '400px', height: '400px', background: 'var(--accent-primary)', opacity: 0.1 }}></div>
      <div className="bg-blob" style={{ bottom: '10%', right: '10%', width: '300px', height: '300px', background: 'var(--accent-secondary)', opacity: 0.1 }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass" 
        style={{ padding: '3rem', borderRadius: '1.5rem', zIndex: 1, position: 'relative' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="heading-lg" style={{ margin: 0 }}>
              <span className="gradient-text">Admin</span> Dashboard
            </h2>
            <p className="text-lead" style={{ marginTop: '0.5rem', fontSize: '1rem' }}>Manage your portfolio content</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline" 
              onClick={handleLogout}
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Custom Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <button 
            className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'glass'}`} 
            onClick={() => setActiveTab('projects')}
            style={{ padding: '0.5rem 1.5rem', borderRadius: '50px' }}
          >
            Manage Projects
          </button>
          <button 
            className={`btn ${activeTab === 'blogs' ? 'btn-primary' : 'glass'}`} 
            onClick={() => setActiveTab('blogs')}
            style={{ padding: '0.5rem 1.5rem', borderRadius: '50px' }}
          >
            Manage Blog Articles
          </button>
          <button 
            className={`btn ${activeTab === 'testimonials' ? 'btn-primary' : 'glass'}`} 
            onClick={() => setActiveTab('testimonials')}
            style={{ padding: '0.5rem 1.5rem', borderRadius: '50px' }}
          >
            💬 Testimonials
          </button>
        </div>

        {/* ----------------- PROJECTS TAB ----------------- */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>Projects</h3>
              <button className="btn btn-primary" onClick={() => { setIsAdding(true); setAddForm({ title: '', description: '', link: '', github_link: '', image: '', tags: '' }); }} disabled={isAdding}>+ Add Project</button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <AnimatePresence>
                {isAdding && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="card" style={{ border: '2px solid var(--accent-primary)', padding: '1.5rem 2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Create New Project</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input type="text" className="input-field" value={addForm.title} onChange={(e) => setAddForm({...addForm, title: e.target.value})} placeholder="Project Title" />
                      <textarea className="input-field" value={addForm.description} onChange={(e) => setAddForm({...addForm, description: e.target.value})} placeholder="Project Description" rows="2" />
                      <input type="text" className="input-field" value={addForm.link} onChange={(e) => setAddForm({...addForm, link: e.target.value})} placeholder="🌐 Live Demo Link (Optional)" />
                      <input type="text" className="input-field" value={addForm.github_link} onChange={(e) => setAddForm({...addForm, github_link: e.target.value})} placeholder="📂 GitHub Repository Link (Optional)" />
                      <input type="text" className="input-field" value={addForm.tags} onChange={(e) => setAddForm({...addForm, tags: e.target.value})} placeholder="🏷️ Tags (pisah koma: React.js, Supabase, Tailwind CSS)" />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Upload Image</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAddForm, addForm)} className="input-field" style={{ padding: '0.5rem', flex: 1 }} />
                          {addForm.image && <img src={addForm.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem' }} />}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={saveNewProject} disabled={uploadingImage}>
                          {uploadingImage ? 'Uploading...' : 'Save Project'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {projects.map(project => (
                  <motion.div key={project.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="card" style={{ padding: '1.5rem 2rem' }}>
                    {editingProject === project.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" className="input-field" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} placeholder="Project Title" />
                        <textarea className="input-field" value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} placeholder="Project Description" rows="2" />
                        <input type="text" className="input-field" value={editForm.link} onChange={(e) => setEditForm({...editForm, link: e.target.value})} placeholder="Project Link (Optional)" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Upload Image</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setEditForm, editForm)} className="input-field" style={{ padding: '0.5rem', flex: 1 }} />
                            {editForm.image && <img src={editForm.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem' }} />}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                          <button className="btn btn-outline" onClick={() => setEditingProject(null)}>Cancel</button>
                          <button className="btn btn-primary" onClick={() => saveEditProject(project.id)} disabled={uploadingImage}>
                            {uploadingImage ? 'Uploading...' : 'Save Changes'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flex: '1' }}>
                          <img src={project.image} alt={project.title} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                          <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{project.title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{project.description}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button className="btn btn-outline" onClick={() => { setEditingProject(project.id); setEditForm(project); }}>Edit</button>
                          <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444' }} onClick={() => handleDeleteProject(project.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ----------------- BLOGS TAB ----------------- */}
        {activeTab === 'blogs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>Blog Articles</h3>
              <button className="btn btn-primary" onClick={() => { setIsAddingBlog(true); setAddBlogForm({ title: '', date: '', excerpt: '', link: '', image: '' }); }} disabled={isAddingBlog}>+ Add Article</button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <AnimatePresence>
                {isAddingBlog && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="card" style={{ border: '2px solid var(--accent-primary)', padding: '1.5rem 2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Create New Article</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input type="text" className="input-field" value={addBlogForm.title} onChange={(e) => setAddBlogForm({...addBlogForm, title: e.target.value})} placeholder="Article Title" />
                      <input type="text" className="input-field" value={addBlogForm.date} onChange={(e) => setAddBlogForm({...addBlogForm, date: e.target.value})} placeholder="Date (e.g. 12 Mei 2026) - leave blank for today" />
                      <textarea className="input-field" value={addBlogForm.excerpt} onChange={(e) => setAddBlogForm({...addBlogForm, excerpt: e.target.value})} placeholder="Short excerpt/description" rows="3" />
                      <input type="text" className="input-field" value={addBlogForm.link} onChange={(e) => setAddBlogForm({...addBlogForm, link: e.target.value})} placeholder="Link to full article (Optional)" />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Upload Thumbnail (Optional)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAddBlogForm, addBlogForm)} className="input-field" style={{ padding: '0.5rem', flex: 1 }} />
                          {addBlogForm.image && <img src={addBlogForm.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem' }} />}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button className="btn btn-outline" onClick={() => setIsAddingBlog(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={saveNewBlog} disabled={uploadingImage}>
                          {uploadingImage ? 'Uploading...' : 'Save Article'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {blogs.map(blog => (
                  <motion.div key={blog.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="card" style={{ padding: '1.5rem 2rem' }}>
                    {editingBlog === blog.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" className="input-field" value={editBlogForm.title} onChange={(e) => setEditBlogForm({...editBlogForm, title: e.target.value})} placeholder="Article Title" />
                        <input type="text" className="input-field" value={editBlogForm.date} onChange={(e) => setEditBlogForm({...editBlogForm, date: e.target.value})} placeholder="Date" />
                        <textarea className="input-field" value={editBlogForm.excerpt} onChange={(e) => setEditBlogForm({...editBlogForm, excerpt: e.target.value})} placeholder="Short excerpt/description" rows="3" />
                        <input type="text" className="input-field" value={editBlogForm.link} onChange={(e) => setEditBlogForm({...editBlogForm, link: e.target.value})} placeholder="Link to full article" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Upload Thumbnail (Optional)</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setEditBlogForm, editBlogForm)} className="input-field" style={{ padding: '0.5rem', flex: 1 }} />
                            {editBlogForm.image && <img src={editBlogForm.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem' }} />}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                          <button className="btn btn-outline" onClick={() => setEditingBlog(null)}>Cancel</button>
                          <button className="btn btn-primary" onClick={() => saveEditBlog(blog.id)} disabled={uploadingImage}>
                            {uploadingImage ? 'Uploading...' : 'Save Changes'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: '1' }}>
                          {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '70px', height: '50px', objectFit: 'cover', borderRadius: '0.5rem', flexShrink: 0 }} />}
                          <div>
                            <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>{blog.date}</p>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{blog.title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{blog.excerpt}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button className="btn btn-outline" onClick={() => { setEditingBlog(blog.id); setEditBlogForm({...blog, image: blog.image || ''}); }}>Edit</button>
                          <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444' }} onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}{' '}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ----------------- TESTIMONIALS TAB ----------------- */}
        {activeTab === 'testimonials' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>💬 Testimonials</h3>
              <button className="btn btn-primary" onClick={() => setIsAddingTestimonial(true)} disabled={isAddingTestimonial}>+ Add Testimonial</button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <AnimatePresence>
                {isAddingTestimonial && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="card" style={{ border: '2px solid var(--accent-primary)', padding: '1.5rem 2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>New Testimonial</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input type="text" className="input-field" value={addTestimonialForm.name} onChange={(e) => setAddTestimonialForm({...addTestimonialForm, name: e.target.value})} placeholder="Nama (contoh: Andi Pratama)" />
                      <input type="text" className="input-field" value={addTestimonialForm.role} onChange={(e) => setAddTestimonialForm({...addTestimonialForm, role: e.target.value})} placeholder="Jabatan/Relasi (contoh: Teman Sekelas)" />
                      <input type="text" className="input-field" value={addTestimonialForm.avatar} onChange={(e) => setAddTestimonialForm({...addTestimonialForm, avatar: e.target.value})} placeholder="Inisial Avatar (2 huruf, contoh: AP) atau URL foto" />
                      <textarea className="input-field" value={addTestimonialForm.content} onChange={(e) => setAddTestimonialForm({...addTestimonialForm, content: e.target.value})} placeholder="Isi ulasan/testimonial..." rows="3" />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Rating:</label>
                        {[1,2,3,4,5].map(s => (
                          <button key={s} onClick={() => setAddTestimonialForm({...addTestimonialForm, rating: s})} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: s <= addTestimonialForm.rating ? '#f59e0b' : 'var(--border-color)' }}>★</button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                        <button className="btn btn-outline" onClick={() => setIsAddingTestimonial(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={saveNewTestimonial}>Save</button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {testimonials.length === 0 && !isAddingTestimonial && (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)', border: '2px dashed var(--border-color)', borderRadius: '1rem' }}>
                    <p>Belum ada testimonial. Klik "+ Add Testimonial" untuk menambahkan.</p>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Testimonial default (sample) akan ditampilkan di website selama tidak ada data di sini.</p>
                  </div>
                )}

                {testimonials.map(t => (
                  <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card" style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <strong>{t.name}</strong>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>— {t.role}</span>
                        <span style={{ color: '#f59e0b' }}>{'★'.repeat(t.rating)}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{t.content}</p>
                    </div>
                    <button className="btn" onClick={() => handleDeleteTestimonial(t.id)} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid #ef4444', flexShrink: 0 }}>Delete</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default AdminDashboard;
