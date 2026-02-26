import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import {
  ArrowDown, Mail, Github, Linkedin, Microscope, Code2, Brain,
  ArrowUpRight, Download, BookOpen, Server, GraduationCap, Briefcase, FileText, Globe
} from 'lucide-react';

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

// --- DATA ARRAYS ---
// --- DATA ARRAYS ---
const portfolioProjects = [
  // ⬇️ THIS IS YOUR NEW PROJECT ADDED TO THE TOP ⬇️
  {
    title: "New LLM Research",
    summary: "Brief 2-line description of what you built and why.",
    tech: ["PyTorch", "HuggingFace", "CUDA"],
    impact: "Decreased inference time by 15%.",
    github: "https://github.com/yourusername/repo-link",
    color: "#F9EFD7"
  },
  // ⬇️ THESE ARE YOUR EXISTING PROJECTS ⬇️
  {
    title: "Multi-Modal Emotion Recognition",
    summary: "Architected a unified model fusing audio, visual, and text data for high-accuracy human emotional state detection.",
    tech: ["PyTorch", "Transformers", "OpenCV", "Librosa"],
    impact: "Achieved 94% accuracy on validation sets. Architecture published in IEEE.",
    github: "#",
    color: "#DCE4F9" // Blue
  },
  {
    title: "Multi-Agent AI Wellness App",
    summary: "Developed a personalized wellness ecosystem driven by interacting LLM agents to monitor and suggest health routines.",
    tech: ["LangChain", "OpenAI API", "React Native", "FastAPI"],
    impact: "Reduced user latency by 40% using optimized vector retrieval. Serves context-aware responses.",
    github: "#",
    color: "#E6CEF4" // Purple
  },
  {
    title: "Cognitive Digital Twin",
    summary: "Built a synthetic data simulation environment mapping real-world physical sensor data to a predictive AI model.",
    tech: ["TensorFlow", "AWS IoT", "Python", "Kubernetes"],
    impact: "Improved predictive maintenance anomaly detection by 22% over baseline models.",
    github: "#",
    color: "#F9EFD7" // Yellow
  },
  {
    title: "AI Career Platform",
    summary: "Engineered a recommendation engine matching candidate resumes with dynamic job market vector embeddings.",
    tech: ["HuggingFace", "Pinecone", "Next.js", "Docker"],
    impact: "Scaled to process 10,000+ resumes concurrently with sub-second search times.",
    github: "#",
    color: "#F8D9EC" // Pink
  },
  {
    title: "Masked Face Detection",
    summary: "Designed a lightweight CNN deployed on edge devices to detect proper facial mask wearing in real-time.",
    tech: ["YOLOv5", "C++", "Edge AI", "OpenVINO"],
    impact: "Maintained 30 FPS inference speed with 98% precision on low-power hardware.",
    github: "#",
    color: "#E3F4FB" // Light Blue
  }
];

const researchPapers = [
  {
    title: "Advanced Multi-Modal Fusion Techniques for Real-Time Emotion Recognition",
    abstract: "This paper proposes a novel cross-attention mechanism bridging audio spectrograms and facial landmark embeddings, solving temporal misalignment in emotion detection.",
    venue: "IEEE Conference on Artificial Intelligence (CAI)",
    link: "#",
    contribution: "Lead author; designed the core fusion architecture and conducted primary benchmarking."
  }
];

const experience = [
  // ⬇️ THIS IS YOUR NEW EXPERIENCE ADDED TO THE TOP ⬇️
  {
    role: "Machine Learning Engineer",
    company: "New AI Startup",
    duration: "Aug 2024 - Present",
    details: [
      "Designed the core multi-modal architecture.",
      "Bullet point two goes here.",
      "Bullet point three goes here."
    ],
    tech: ["Python", "AWS", "TensorFlow"]
  },
  // ⬇️ THIS IS YOUR PREVIOUS EXPERIENCE ⬇️
  {
    role: "ML Intern",
    company: "JM Analytics",
    duration: "Jan 2023 - Present",
    details: [
      "Built an automated data pipeline using PySpark and AWS Glue to process 500GB+ of daily unstructured data.",
      "Trained and deployed a custom NLP NER model to extract financial entities from dense PDFs.",
      "Optimized model inference time by 35% utilizing ONNX runtime conversions and containerization."
    ],
    tech: ["AWS", "PySpark", "Transformers", "Docker"]
  }
];

const education = [
  {
    degree: "M.Tech in Computer Science and Engineering",
    institution: "XYZ University",
    year: "2024",
    cgpa: "9.2/10"
  },
  {
    degree: "B.Tech in Computer Science",
    institution: "ABC Institute of Technology",
    year: "2022",
    cgpa: "8.9/10"
  }
];

const skills = {
  "Programming": ["Python", "C++", "SQL", "JavaScript", "Bash"],
  "Machine Learning": ["Scikit-Learn", "XGBoost", "Pandas", "NumPy", "SciPy"],
  "Deep Learning": ["PyTorch", "TensorFlow", "Keras", "HuggingFace", "Transformers"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "CI/CD", "Git"],
  "Tools": ["Jupyter", "Linux", "OpenCV", "MLflow", "WandB"]
};

const blogs = [
  "Multi-modal learning explained: Bridging Text, Vision, and Audio",
  "AWS for ML deployment: From Notebook to Production",
  "Decoding Emotion Recognition Architectures",
  "The Future of AI in Healthcare and Biological Data"
];

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const API_URL = "https://portfolio-v825.onrender.com/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert("Message sent successfully!");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error("Error sending message", error);
      alert("Demo mode: Message logged to console.");
    }
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-[#F8D9EC] bg-zinc-950">

      {/* FLOATING BOTTOM NAV */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-full flex gap-1 shadow-2xl">
        {['Home', 'Projects', 'Research', 'Experience'].map((item, i) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${i === 0 ? 'bg-white/20 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center p-4 md:p-6 pb-24">
        <nav className="absolute top-0 left-0 w-full px-8 md:px-12 py-8 flex justify-between items-center z-20 text-white">
          <div className="font-bold text-xl tracking-tighter">UMAA MAHESHWARY SV</div>
          <button className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-[#DCE4F9] hover:text-black transition-all text-sm font-semibold">
            Contact Me
          </button>
        </nav>

        <Motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-full max-w-[96rem] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-zinc-900 shadow-2xl flex flex-col justify-between"
        >
          {/* Background Image Setup */}
          <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/90"></div>

          <div className="relative z-10 flex justify-between w-full max-w-4xl mx-auto text-white/70 text-xs md:text-sm font-medium px-8 mt-24 uppercase tracking-widest">
            <span>Machine Learning Engineer</span>
            <span className="hidden md:inline">Multi-Modal AI</span>
            <span>Research-Oriented</span>
          </div>

          <div className="relative z-10 flex flex-col justify-end p-8 md:p-16 h-full pb-16 max-w-5xl">
            <Motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-6 leading-[1.05]"
            >
              Building scalable <br />
              <span style={{ color: '#E3F4FB' }}>AI architectures.</span>
            </Motion.h1>

            <Motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-white/70 font-light max-w-2xl leading-relaxed mb-10"
            >
              Building scalable AI systems across deep learning, cloud environments, and intelligent architectures.
            </Motion.p>

            <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center gap-4">
              <a href="#projects" className="flex items-center gap-2 bg-[#DCE4F9] text-slate-900 px-7 py-3.5 rounded-full font-bold hover:brightness-105 transition-all">
                View Projects <ArrowUpRight size={18} />
              </a>
              <a href="#cv" className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all">
                Download Resume <Download size={18} />
              </a>
            </Motion.div>
          </div>
        </Motion.div>
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <div className="bg-white rounded-t-[3rem] relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">

        {/* 2. ABOUT SECTION */}
        <section id="about" className="py-24 px-6 md:px-20 border-b border-slate-100">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6">About Me</h2>
              <p className="text-2xl md:text-3xl text-slate-800 leading-snug font-light">
                Recent Computer Science graduate specializing in <strong className="font-semibold" style={{ background: 'linear-gradient(to right, #E6CEF4, #DCE4F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Machine Learning, Deep Learning, and Multi-Modal AI systems</strong>. My expertise lies in architecting intelligent solutions across cloud environments and building high-performance models.
                <br /><br />
                Currently focused on transitioning complex biological data and healthcare challenges into scalable AI systems. Driven by a strong research mindset, I aim to bridge the gap between theoretical ML architectures and real-world system deployments.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 3. FEATURED PROJECTS */}
        <section id="projects" className="py-32 px-6 md:px-20">
          <div className="max-w-6xl mx-auto">
            <FadeIn><h2 className="text-4xl font-bold mb-16 text-slate-900">Featured Projects</h2></FadeIn>
            <div className="grid md:grid-cols-2 gap-8">
              {portfolioProjects.map((project, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className="h-full flex flex-col p-8 rounded-[2rem] border border-slate-100 transition-all hover:shadow-xl group" style={{ backgroundColor: project.color + '40' }}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-white rounded-2xl shadow-sm"><Code2 size={24} className="text-slate-700" /></div>
                      <a href={project.github} className="p-3 bg-white/50 rounded-full hover:bg-white transition-colors"><Github size={20} /></a>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-900">{project.title}</h3>
                    <p className="text-slate-600 mb-6 flex-grow">{project.summary}</p>
                    <div className="bg-white/60 p-4 rounded-xl mb-6 border border-white/40">
                      <p className="text-sm font-semibold text-slate-900 mb-1">Impact:</p>
                      <p className="text-sm text-slate-700">{project.impact}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-slate-600 shadow-sm">{t}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. RESEARCH & PUBLICATION */}
        <section id="research" className="py-24 px-6 md:px-20 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <FadeIn><h2 className="text-4xl font-bold mb-12 flex items-center gap-4"><BookOpen className="text-slate-400" /> Research & Publications</h2></FadeIn>
            <div className="space-y-8">
              {researchPapers.map((paper, idx) => (
                <FadeIn key={idx} delay={0.1}>
                  <div className="p-8 bg-white border border-slate-200 rounded-3xl hover:border-[#E6CEF4] transition-colors">
                    <span className="text-xs font-bold px-3 py-1 bg-[#F8D9EC] text-pink-900 rounded-full mb-4 inline-block">{paper.venue}</span>
                    <h3 className="text-2xl font-bold mb-3">{paper.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed italic">"{paper.abstract}"</p>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <p className="text-sm font-medium text-slate-800"><span className="text-slate-400">Contribution:</span> {paper.contribution}</p>
                      <a href={paper.link} className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:opacity-70">View Paper <ArrowUpRight size={16} /></a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. EXPERIENCE & 6. EDUCATION */}
        <section id="experience" className="py-24 px-6 md:px-20 border-t border-slate-100">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">

            {/* Experience */}
            <div>
              <FadeIn><h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><Briefcase className="text-slate-400" /> Experience</h2></FadeIn>
              <div className="space-y-8">
                {experience.map((exp, idx) => (
                  <FadeIn key={idx} delay={0.1}>
                    <div className="relative pl-8 border-l-2 border-[#DCE4F9]">
                      <div className="absolute w-4 h-4 bg-[#DCE4F9] rounded-full -left-[9px] top-1 border-4 border-white"></div>
                      <span className="text-sm font-bold text-[#8ba2db] uppercase tracking-wider">{exp.duration}</span>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">{exp.role}</h3>
                      <p className="text-lg text-slate-500 font-medium mb-4">{exp.company}</p>
                      <ul className="space-y-2 mb-4">
                        {exp.details.map((detail, i) => (
                          <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                            <span className="text-[#F8D9EC] mt-0.5">▹</span> {detail}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map(t => <span key={t} className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-600">{t}</span>)}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <FadeIn><h2 className="text-3xl font-bold mb-10 flex items-center gap-3"><GraduationCap className="text-slate-400" /> Education</h2></FadeIn>
              <div className="space-y-8">
                {education.map((edu, idx) => (
                  <FadeIn key={idx} delay={0.2}>
                    <div className="p-6 rounded-3xl bg-[#F9EFD7] border border-yellow-100">
                      <span className="text-sm font-bold text-yellow-700 bg-white/50 px-3 py-1 rounded-full mb-3 inline-block">{edu.year}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{edu.degree}</h3>
                      <p className="text-slate-700 mb-3">{edu.institution}</p>
                      <p className="text-sm font-bold text-slate-900">CGPA: {edu.cgpa}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. TECHNICAL SKILLS */}
        <section className="py-24 px-6 md:px-20 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <FadeIn><h2 className="text-4xl font-bold mb-12 flex items-center gap-4"><Server className="text-slate-400" /> Technical Skills</h2></FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, skillList], idx) => (
                <FadeIn key={category} delay={idx * 0.1}>
                  <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm h-full">
                    <h3 className="text-lg font-bold mb-4 text-slate-800">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">{skill}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 9. BLOGS */}
        <section className="py-24 px-6 md:px-20">
          <div className="max-w-4xl mx-auto">
            <FadeIn><h2 className="text-4xl font-bold mb-12 flex items-center gap-4"><FileText className="text-slate-400" /> Writings & Insights</h2></FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((title, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <a href="#" className="block p-6 rounded-3xl bg-slate-50 hover:bg-[#E3F4FB] border border-slate-100 transition-colors group">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 group-hover:text-blue-900 transition-colors">{title}</h3>
                    <span className="text-sm font-semibold text-slate-500 flex items-center gap-1 group-hover:text-blue-700">Read Article <ArrowUpRight size={14} /></span>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 10. ACADEMIC CV DOWNLOAD */}
        <section id="cv" className="py-24 px-6 md:px-20 bg-[#F8D9EC]/30 border-y border-[#F8D9EC]">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Research & Academic Profile</h2>
              <p className="text-slate-600 mb-8 text-lg">Comprehensive details of my research publications, academic history, and technical architecture experience.</p>
              <button className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
                <Download size={20} /> Download Full Academic CV (PDF)
              </button>
            </FadeIn>
          </div>
        </section>

        {/* 11. CONTACT */}
        <section id="contact" className="py-32 px-6 md:px-20 bg-zinc-900 text-white rounded-t-[3rem]">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Let's build intelligent systems.</h2>
              <p className="text-white/60 mb-10 text-lg">Open for Research Engineer roles, ML architecture consultations, and technical collaborations.</p>

              <div className="space-y-4 mb-10">
                <a href="mailto:example@email.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"><Mail size={24} /> umaa.maheshwary@example.com</a>
                <div className="flex gap-4 pt-4">
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E6CEF4] hover:text-black transition-all"><Linkedin size={20} /></a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#DCE4F9] hover:text-black transition-all"><Github size={20} /></a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F9EFD7] hover:text-black transition-all" title="Google Scholar"><GraduationCap size={20} /></a>
                  <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E3F4FB] hover:text-black transition-all" title="ResearchGate"><Globe size={20} /></a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/5 p-8 rounded-[2rem] border border-white/10">
                <input type="text" placeholder="Full Name" required className="p-4 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:border-[#E6CEF4] text-white placeholder:text-white/40" onChange={e => setFormData({ ...formData, name: e.target.value })} value={formData.name} />
                <input type="email" placeholder="Email Address" required className="p-4 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:border-[#DCE4F9] text-white placeholder:text-white/40" onChange={e => setFormData({ ...formData, email: e.target.value })} value={formData.email} />
                <input type="tel" placeholder="Phone Number" className="p-4 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:border-[#F8D9EC] text-white placeholder:text-white/40" onChange={e => setFormData({ ...formData, phone: e.target.value })} value={formData.phone} />
                <textarea placeholder="Your Message / Query" rows="4" required className="p-4 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:border-[#F9EFD7] text-white placeholder:text-white/40" onChange={e => setFormData({ ...formData, message: e.target.value })} value={formData.message}></textarea>
                <button type="submit" className="py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors mt-2">Submit Query</button>
              </form>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}