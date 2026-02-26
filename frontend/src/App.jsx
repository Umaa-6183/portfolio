import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowDown, Mail, Github, Linkedin, Microscope, Code2, PenTool } from 'lucide-react';

// Reusable Scroll Reveal Component
const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const yOffset = direction === "up" ? 50 : direction === "down" ? -50 : 0;
  const xOffset = direction === "left" ? 50 : direction === "right" ? -50 : 0;
  return (
    <Motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </Motion.div>
  );
};

export default function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Update this URL after you deploy your backend to Render
  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Backend not running yet.", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert("Message sent!");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-pastel-pink">

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pastel-cyan via-pastel-blue to-pastel-purple">
        <div className="z-10 text-center px-6">
          <Motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-slate-600 font-semibold tracking-widest uppercase mb-4 text-sm"
          >
            Portfolio
          </Motion.h2>
          <Motion.h1
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6"
          >
            Algorithm <br /> Engineering & UI/UX
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-slate-700 font-light max-w-2xl mx-auto"
          >
            Cryo-EM Algorithm Engineer transitioning biological complexity into seamless, high-performance digital architectures.
          </Motion.p>
        </div>
        <Motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-12 text-slate-600">
          <ArrowDown size={32} />
        </Motion.div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-32 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <h2 className="text-4xl font-bold mb-8 text-slate-900 border-l-4 border-pastel-purple pl-4">The Architecture of Logic</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Completing my MTech in Computer Science and Engineering, my core focus is building realistic, complicated, and highly rewarding systems.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Beyond optimizing algorithms, I am deeply passionate about biology. Whether I am analyzing structures under a microscope or drawing to conceptualize UI/UX layouts, I believe the best code bridges the gap between intricate natural systems and human-centric design.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 gap-6">
            <FadeIn delay={0.2}><div className="bg-pastel-cyan p-8 rounded-3xl flex flex-col items-center"><Code2 size={40} className="mb-2" /><b>Logic</b></div></FadeIn>
            <FadeIn delay={0.4}><div className="bg-pastel-pink p-8 rounded-3xl flex flex-col items-center translate-y-8"><Microscope size={40} className="mb-2" /><b>Data</b></div></FadeIn>
            <FadeIn delay={0.3}><div className="bg-pastel-yellow p-8 rounded-3xl flex flex-col items-center"><PenTool size={40} className="mb-2" /><b>Design</b></div></FadeIn>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC PROJECTS */}
      <section className="py-32 px-6 md:px-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn><h2 className="text-4xl font-bold mb-20 text-center text-slate-900">Featured Engineering</h2></FadeIn>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <FadeIn key={project.id} direction={index % 2 === 0 ? "left" : "right"}>
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center group`}>

                  {/* Visual Block */}
                  <div className={`w-full md:w-1/2 aspect-video rounded-3xl flex items-center justify-center p-8 transition-transform duration-500 group-hover:scale-105 ${index % 2 === 0 ? 'bg-pastel-purple/50' : 'bg-pastel-yellow/50'}`}>
                    <h3 className="text-2xl font-black text-white mix-blend-difference">{project.title.split(' ')[0]}</h3>
                  </div>

                  {/* Text Block */}
                  <div className="w-full md:w-1/2">
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-slate-600 text-lg mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTACT */}
      <section className="py-32 px-6 md:px-20 bg-pastel-blue/30">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-8">Initialize Connection</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" placeholder="Name" required className="p-4 rounded-xl" onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Email" required className="p-4 rounded-xl" onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <textarea placeholder="Message" rows="4" required className="p-4 rounded-xl" onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
              <button type="submit" className="py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">Send</button>
            </form>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}