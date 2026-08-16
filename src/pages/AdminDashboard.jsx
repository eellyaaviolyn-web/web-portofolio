import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'blogs'
  
  // --- Projects State ---
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: 'E-commerce App', description: 'A fullstack e-commerce site.', link: '#', image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80' },
      { id: 2, title: 'Weather Dashboard', description: 'Real-time weather application.', link: '#', image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80' }
    ];
  });
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', link: '', image: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({ title: '', description: '', link: '', image: '' });

  // --- Blogs State ---
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('portfolio_blogs');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: 'Memahami React Hooks', date: '12 Mei 2026', excerpt: 'React Hooks mengubah cara kita menulis komponen fungsional dengan state dan efek samping.', link: '#' },
      { id: 2, title: 'Styling Modern dengan Tailwind CSS', date: '05 April 2026', excerpt: 'Mengapa utility-first CSS framework seperti Tailwind sangat populer di kalangan developer frontend.', link: '#' }
    ];
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [editBlogForm, setEditBlogForm] = useState({ title: '', date: '', excerpt: '', link: '' });
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [addBlogForm, setAddBlogForm] = useState({ title: '', date: '', excerpt: '', link: '' });

  // Effects
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    } catch (e) {
      alert("Penyimpanan browser penuh! Gambar yang diupload mungkin terlalu besar.");
    }
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_blogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  // --- Shared Handlers ---
  const handleImageUpload = (e, setFormFunc, currentForm) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormFunc({ ...currentForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Projects Handlers ---
  const saveNewProject = () => {
    const newProject = { id: Date.now(), ...addForm };
    if(!newProject.image) newProject.image = 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80';
    setProjects([newProject, ...projects]);
    setIsAdding(false);
  };
  const handleDeleteProject = (id) => setProjects(projects.filter(p => p.id !== id));
  const saveEditProject = (id) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...editForm } : p));
    setEditingProject(null);
  };

  // --- Blogs Handlers ---
  const saveNewBlog = () => {
    const newBlog = { id: Date.now(), ...addBlogForm };
    if(!newBlog.date) {
      const now = new Date();
      newBlog.date = `${now.getDate()} ${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`;
    }
    setBlogs([newBlog, ...blogs]);
    setIsAddingBlog(false);
  };
  const handleDeleteBlog = (id) => setBlogs(blogs.filter(b => b.id !== id));
  const saveEditBlog = (id) => {
    setBlogs(blogs.map(b => b.id === id ? { ...b, ...editBlogForm } : b));
    setEditingBlog(null);
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
        </div>

        {/* ----------------- PROJECTS TAB ----------------- */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>Projects</h3>
              <button className="btn btn-primary" onClick={() => { setIsAdding(true); setAddForm({ title: '', description: '', link: '', image: '' }); }} disabled={isAdding}>+ Add Project</button>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <AnimatePresence>
                {isAdding && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="card" style={{ border: '2px solid var(--accent-primary)', padding: '1.5rem 2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--accent-primary)' }}>Create New Project</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input type="text" className="input-field" value={addForm.title} onChange={(e) => setAddForm({...addForm, title: e.target.value})} placeholder="Project Title" />
                      <textarea className="input-field" value={addForm.description} onChange={(e) => setAddForm({...addForm, description: e.target.value})} placeholder="Project Description" rows="2" />
                      <input type="text" className="input-field" value={addForm.link} onChange={(e) => setAddForm({...addForm, link: e.target.value})} placeholder="Project Link (Optional)" />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Upload Image</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAddForm, addForm)} className="input-field" style={{ padding: '0.5rem', flex: 1 }} />
                          {addForm.image && <img src={addForm.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '0.5rem' }} />}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={saveNewProject}>Save Project</button>
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
                          <button className="btn btn-primary" onClick={() => saveEditProject(project.id)}>Save Changes</button>
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
              <button className="btn btn-primary" onClick={() => { setIsAddingBlog(true); setAddBlogForm({ title: '', date: '', excerpt: '', link: '' }); }} disabled={isAddingBlog}>+ Add Article</button>
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
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button className="btn btn-outline" onClick={() => setIsAddingBlog(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={saveNewBlog}>Save Article</button>
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
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                          <button className="btn btn-outline" onClick={() => setEditingBlog(null)}>Cancel</button>
                          <button className="btn btn-primary" onClick={() => saveEditBlog(blog.id)}>Save Changes</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div style={{ flex: '1' }}>
                          <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>{blog.date}</p>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{blog.title}</h3>
                          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{blog.excerpt}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button className="btn btn-outline" onClick={() => { setEditingBlog(blog.id); setEditBlogForm(blog); }}>Edit</button>
                          <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444' }} onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
                        </div>
                      </div>
                    )}
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
