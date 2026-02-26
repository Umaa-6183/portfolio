import React, { useState, useRef } from 'react';
import { motion as Motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowDown, Mail, Github, Linkedin, Microscope, Code2, Brain,
  ArrowUpRight, Download, BookOpen, Server, GraduationCap, Briefcase, FileText, Globe,
  Trophy, Award, Medal, Star
} from 'lucide-react';

// --- DATA ARRAYS ---
const portfolioProjects = [
  {
    title: "New LLM Research",
    summary: "Brief 2-line description of what you built and why.",
    tech: ["PyTorch", "HuggingFace", "CUDA"],
    impact: "Decreased inference time by 15%.",
    github: "https://github.com/yourusername/repo-link",
    color: "#F9EFD7"
  },
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

// NEW DATA ARRAY
const awards = [
  { title: "I won paper award", icon: <Trophy size={32} /> },
  { title: "I received academic honor", icon: <GraduationCap size={32} /> },
  { title: "I secured funding", icon: <Star size={32} /> },
  { title: "I got research recognition", icon: <Medal size={32} /> }
];

const skills = {
  "Programming": ["Python", "C++", "SQL", "JavaScript", "Bash"],
  "Machine Learning": ["Scikit-Learn", "XGBoost", "Pandas", "NumPy", "SciPy"],
  "Deep Learning": ["PyTorch", "TensorFlow", "Keras", "HuggingFace", "Transformers"],
  "Cloud & DevOps": ["AWS", "Docker", "Kubernetes", "CI/CD", "Git"],
  "Tools": ["Jupyter", "Linux", "OpenCV", "MLflow", "WandB"]
};

const horizontalBlogs = [
  "Multi-modal learning explained: Bridging Text, Vision, and Audio",
  "AWS for ML deployment: From Notebook to Production",
  "Decoding Emotion Recognition Architectures",
  "The Future of AI in Healthcare and Biological Data",
  "Architecting LLM Agents for Scale"
];

// New Comprehensive Blogs Data
const detailedBlogs = [
  {
    id: 1,
    category: "Multi-Modal AI",
    tag: "Research Insight",
    title: "Understanding Multi-Modal Deep Learning",
    date: "August 12, 2025",
    author: "Umaa Maheshwary SV",
    color: "#F9EFD7",
    intro: "Modern AI is shifting from uni-modal constraints to human-like perception. This blog explores why integrating audio, visual, and textual data is critical for next-generation intelligence.",
    concept: "Multi-modal learning is a subfield of ML aiming to build models capable of processing and linking information from multiple modalities simultaneously, much like the human brain processes sights and sounds.",
    architecture: "The architecture generally involves unimodal encoders (e.g., CNNs for images, Transformers for text), a cross-attention fusion layer to map embeddings into a shared latent space, and a unified decoding head. ",
    challenges: "The primary challenges include temporal misalignment between data streams, modality collapse (where the model ignores weaker signals), and severe computational overhead during training.",
    applications: "Widely applicable in Healthcare diagnostics (combining MRI with patient records), Emotion AI, and Autonomous Navigation.",
    future: "The future heavily relies on computational biology alignment, specifically integrating multi-omics data seamlessly with patient phenotypic characteristics.",
    conclusion: "Multi-modal systems bridge the gap between abstract data and real-world complexity, acting as the foundation for true generalizable AI."
  },
  {
    id: 2,
    category: "Multi-Modal AI",
    tag: "Technical Deep Dive",
    title: "Designing a Cross-Cultural Emotion Recognition System",
    date: "September 05, 2025",
    author: "Umaa Maheshwary SV",
    color: "#E3F4FB",
    intro: "Emotion expression varies drastically across cultures. Building a model that generalizes globally requires nuanced, bias-aware architecture designs.",
    concept: "Cross-cultural emotion recognition focuses on identifying universal markers of emotion while accounting for cultural specificities in facial micro-expressions and vocal intonations.",
    architecture: "We utilize a dual-stream Transformer network. One stream captures universal spatial-temporal features, while the secondary stream applies a culture-specific attention masking mechanism. ",
    challenges: "Data scarcity in non-Western populations and the subjective nature of annotating emotional ground truth across different geographic regions.",
    applications: "Global customer service AI, inclusive mental health screening tools, and localized user experience testing.",
    future: "Integrating real-time physiological biosignals (heart rate variability, galvanic skin response) to cross-verify visual and auditory emotion predictions.",
    conclusion: "True emotional AI requires a departure from 'one-size-fits-all' datasets and a move towards culturally empathetic architectural design."
  },
  {
    id: 3,
    category: "Multi-Modal AI",
    tag: "AI Systems",
    title: "The Future of Context-Aware AI Systems",
    date: "October 20, 2025",
    author: "Umaa Maheshwary SV",
    color: "#F8D9EC",
    intro: "An AI without context is merely a sophisticated calculator. This piece discusses the shift towards persistent, context-aware intelligence.",
    concept: "Context-aware AI refers to systems that understand the situational, historical, and environmental context of a user's prompt, dynamically altering their processing pathways.",
    architecture: "This relies on high-dimensional vector databases coupled with an LLM orchestration layer that retrieves stateful context before passing inputs to the generative model. ",
    challenges: "Managing context window limits efficiently, mitigating hallucination via stale data retrieval, and ensuring ultra-low latency.",
    applications: "Advanced clinical decision support systems and hyper-personalized digital twin environments.",
    future: "Aligning these systems with continuous biological monitoring streams to provide real-time, context-aware health interventions.",
    conclusion: "Context is the final hurdle in making AI feel genuinely proactive rather than simply reactive."
  },
  {
    id: 4,
    category: "Multi-Agent & Architecture",
    tag: "AI Systems",
    title: "Designing a Multi-Agent AI Architecture",
    date: "November 14, 2025",
    author: "Umaa Maheshwary SV",
    color: "#E6CEF4",
    intro: "Breaking down monolithic LLMs into collaborative, specialized agents is revolutionizing how we handle complex programmatic tasks.",
    concept: "Multi-Agent AI involves deploying several independent AI agents, each initialized with a specific persona, toolset, and objective, working collaboratively to solve a larger problem.",
    architecture: "A typical setup includes a 'Supervisor' node that parses the initial query and distributes sub-tasks to 'Worker' nodes. The workers communicate via a shared memory buffer before returning the aggregated payload. ",
    challenges: "Agent looping (where agents infinitely pass tasks back and forth without resolution) and the cost implications of multiple overlapping API calls.",
    applications: "Automated software engineering, robust data pipeline generation, and complex financial modeling.",
    future: "Simulating entire biological pathways by assigning individual agents to act as specific proteins or enzymes within a synthetic environment.",
    conclusion: "Multi-agent systems provide the necessary abstraction and specialization required to tackle enterprise-grade problems."
  },
  {
    id: 5,
    category: "Multi-Agent & Architecture",
    tag: "Technical Deep Dive",
    title: "Building a Wellness AI Assistant with NLP & AWS",
    date: "December 01, 2025",
    author: "Umaa Maheshwary SV",
    color: "#DCE4F9",
    intro: "A practical breakdown of engineering a scalable wellness application that bridges NLP with secure cloud infrastructure.",
    concept: "Wellness AI assistants require a delicate balance of empathetic natural language processing and highly secure, compliant backend data handling.",
    architecture: "The backend is hosted on AWS utilizing API Gateway and Lambda functions, invoking a LangChain-orchestrated memory module to generate safe, conversational wellness routines. ",
    challenges: "Ensuring HIPAA-compliant data routing, minimizing cold-start latency on AWS Lambda, and designing strict guardrails to prevent unverified medical advice.",
    applications: "Digital therapeutics, personalized meditation curation, and proactive burn-out prevention tools.",
    future: "Integrating direct readouts from wearable health devices into the NLP context window for precision wellness tracking.",
    conclusion: "Combining serverless cloud scalability with sophisticated NLP is the blueprint for modern health-tech applications."
  },
  {
    id: 6,
    category: "Multi-Agent & Architecture",
    tag: "Cloud & Deployment",
    title: "From Model to Deployment: Scaling AI on AWS",
    date: "January 10, 2026",
    author: "Umaa Maheshwary SV",
    color: "#F9EFD7",
    intro: "Training a model is only 20% of the job. This blog details the architectural requirements for scaling AI inferences securely.",
    concept: "Deployment scaling focuses on MLOps pipelines—taking a static model weight file and wrapping it in an elastic, highly available API endpoint.",
    architecture: "Using AWS SageMaker for inference endpoint creation, paired with an Elastic Load Balancer and auto-scaling groups triggered by CloudWatch GPU utilization metrics. ",
    challenges: "Optimizing container sizes (Dockerizing PyTorch environments often leads to bloated images) and managing cross-zone network latency.",
    applications: "Any production-level AI startup, massive e-commerce recommendation engines, and high-frequency trading platforms.",
    future: "Deploying lightweight foundational models at the edge (Edge AI) specifically for mobile biological diagnostic devices.",
    conclusion: "Robust MLOps is the silent backbone that turns a promising academic model into a viable, scalable product."
  },
  {
    id: 7,
    category: "Explainability & Ethics",
    tag: "Explainable AI",
    title: "Why Explainable AI Matters in Recommendation Systems",
    date: "February 04, 2026",
    author: "Umaa Maheshwary SV",
    color: "#E3F4FB",
    intro: "When an AI makes a decision that alters a user's career or life path, 'black-box' logic is no longer acceptable.",
    concept: "Explainable AI (XAI) refers to methods and techniques that allow human users to understand and trust the results and output created by machine learning algorithms.",
    architecture: "Implementing post-hoc explanation methods like SHAP (SHapley Additive exPlanations) or LIME alongside the primary neural network to assign feature importance scores dynamically. ",
    challenges: "The trade-off between model accuracy and interpretability, as highly complex deep neural networks inherently resist simple linear explanations.",
    applications: "Career placement platforms, judicial sentencing algorithms, and clinical trial participant selections.",
    future: "Developing 'inherently interpretable' neural architectures for computational biology, ensuring scientists can exactly trace why a model predicted a specific genetic mutation.",
    conclusion: "Explainability is not just an ethical requirement; it is a fundamental engineering requirement for user trust."
  },
  {
    id: 8,
    category: "Explainability & Ethics",
    tag: "AI Systems",
    title: "Privacy-First AI Architecture Design",
    date: "February 18, 2026",
    author: "Umaa Maheshwary SV",
    color: "#F8D9EC",
    intro: "As AI ingests increasingly personal data, architectural paradigms must shift from centralized hoarding to decentralized privacy.",
    concept: "Privacy-first architecture ensures that sensitive user data is never exposed or centralized in plaintext during the model training or inference phases.",
    architecture: "Implementation revolves around Federated Learning frameworks, where edge devices train local models and only send encrypted gradient updates to a centralized aggregation server. ",
    challenges: "Significant communication overhead between edge devices and servers, and susceptibility to sophisticated data-poisoning attacks.",
    applications: "Mobile keyboard predictions, smart home voice assistants, and decentralized patient health record analysis.",
    future: "Leveraging fully homomorphic encryption to allow AI models to perform complex biological sequence alignments directly on encrypted patient data.",
    conclusion: "The next era of AI scalability will be dictated by those who can compute efficiently without ever seeing the raw data."
  },
  {
    id: 9,
    category: "Future Direction",
    tag: "AI & Biology",
    title: "Multi-Modal AI for Multi-Omics Integration",
    date: "March 02, 2026",
    author: "Umaa Maheshwary SV",
    color: "#E6CEF4",
    intro: "The most complex data structure known to humanity is human biology. AI is the only tool capable of deciphering it.",
    concept: "Multi-omics integration involves combining genomic, proteomic, and transcriptomic data to gain a holistic understanding of a biological system or disease pathology.",
    architecture: "Designing graph neural networks (GNNs) where nodes represent different biological entities (genes, proteins) and edges represent their multi-modal relationships, processed through deep representation learning. ",
    challenges: "The extreme high-dimensionality of omics data (often millions of features per sample) leading to the curse of dimensionality, and severe noise in biological sequencing.",
    applications: "Precision medicine, targeted drug discovery, and cancer biomarker identification.",
    future: "Building foundational models of whole human cells, entirely shifting computational biology from observation to precise prediction.",
    conclusion: "Merging AI engineering with multi-omics is not just a technological step; it is a paradigm shift in medical science."
  },
  {
    id: 10,
    category: "Future Direction",
    tag: "AI & Biology",
    title: "Deep Learning in Systems Biology",
    date: "March 15, 2026",
    author: "Umaa Maheshwary SV",
    color: "#DCE4F9",
    intro: "Moving beyond single-protein analysis, Deep Learning is now simulating entire biological ecosystems.",
    concept: "Systems biology aims to understand biological entities not in isolation, but as part of a complex, interacting network. Deep learning acts as the computational engine to simulate these nonlinear interactions.",
    architecture: "Utilizing deep recurrent neural networks (RNNs) combined with neural differential equations to model the continuous time-series dynamics of cellular regulatory networks. ",
    challenges: "Biological systems are notoriously chaotic; small perturbations can lead to massive downstream effects, making long-term model predictions highly unstable.",
    applications: "Synthetic biology design, metabolic pathway engineering, and pandemic epidemiological modeling.",
    future: "Creating 'Cognitive Digital Twins' of patient organs, allowing doctors to simulate drug responses via AI before administering physical treatments.",
    conclusion: "By applying deep learning to systems biology, we are learning to program the physical world with the same precision we program software."
  }
];
// FIXED: `amount: 0.2` used instead of `margin: "-100px"` to prevent early/broken animations.
const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const yOffset = direction === "up" ? 50 : direction === "down" ? -50 : 0;
  const xOffset = direction === "left" ? 50 : direction === "right" ? -50 : 0;
  return (
    <Motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </Motion.div>
  );
};

// Text Reveal Component (Animation: Text Reveal & Highlight)
const RevealText = ({ text }) => {
  const words = text.split(" ");
  return (
    <Motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
      className="inline-block"
    >
      {words.map((word, index) => (
        <Motion.span
          key={index}
          className="inline-block mr-2"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
          }}
        >
          {word}
        </Motion.span>
      ))}
    </Motion.div>
  );
};

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  // 1. PROGRESS BAR ANIMATION (Global)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 2. PARALLAX HERO ANIMATION
  const { scrollYProgress: heroScroll } = useScroll();
  const yHero = useTransform(heroScroll, [0, 1], ["0%", "40%"]);

  // 3. HORIZONTAL SCROLL FOR BLOGS
  const blogTargetRef = useRef(null);
  const { scrollYProgress: blogScrollProgress } = useScroll({ target: blogTargetRef });
  const xBlogs = useTransform(blogScrollProgress, [0, 1], ["0%", "-75%"]);

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
    <div className="min-h-screen text-slate-800 font-sans selection:bg-[#F8D9EC] bg-zinc-950 overflow-x-hidden">

      {/* Top Progress Bar */}
      <Motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F9EFD7] via-[#F8D9EC] to-[#E3F4FB] z-[100]"
      />

      {/* FLOATING BOTTOM NAV */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-full flex gap-1 shadow-2xl">
        {['Home', 'Projects', 'Experience', 'Blogs'].map((item, i) => (
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

      {/* 1. HERO SECTION (Animation: Parallax BG) */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center p-4 md:p-6 pb-24 overflow-hidden">
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
          <Motion.img
            style={{ y: yHero }}
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
            alt="Hero Background"
            className="absolute inset-0 w-full h-[120%] object-cover opacity-50 mix-blend-overlay -top-[10%]"
          />
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

        {/* 2. ABOUT SECTION (Animation: Text Reveal) */}
        <section id="about" className="py-24 px-6 md:px-20 relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
          {/* Subtle SVG Background */}
          <svg className="absolute top-0 right-0 w-96 h-96 text-[#E3F4FB] opacity-30 -translate-y-1/2 translate-x-1/3" viewBox="0 0 200 200" fill="currentColor"><circle cx="100" cy="100" r="100" /></svg>

          <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn>
              <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6">About Me</h2>
              <p className="text-2xl md:text-3xl text-slate-800 leading-snug font-light">
                <RevealText text="Recent Computer Science graduate specializing in " />
                <strong className="font-semibold" style={{ background: 'linear-gradient(to right, #E6CEF4, #DCE4F9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  <RevealText text="Machine Learning, Deep Learning, and Multi-Modal AI systems. " />
                </strong>
                <RevealText text="My expertise lies in architecting intelligent solutions across cloud environments and building high-performance models." />
                <br /><br />
                <RevealText text="Currently focused on transitioning complex biological data and healthcare challenges into scalable AI systems. Driven by a strong research mindset, I aim to bridge the gap between theoretical ML architectures and real-world system deployments." />
              </p>
            </FadeIn>
          </div>
        </section>

        {/* 3. FEATURED PROJECTS (Animation: Stacking Sticky Cards) */}
        <section id="projects" className="py-32 px-6 md:px-20 relative" style={{ backgroundColor: '#F9EFD7' }}>
          <div className="max-w-6xl mx-auto">
            <FadeIn><h2 className="text-4xl font-bold mb-16 text-slate-900">Featured Projects</h2></FadeIn>
            <div className="space-y-12">
              {portfolioProjects.map((project, index) => (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  className="sticky flex flex-col p-8 md:p-12 rounded-[3rem] border border-white/50 shadow-xl"
                  style={{ backgroundColor: '#ffffff', top: `${100 + (index * 20)}px` }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-3xl" style={{ backgroundColor: project.color }}><Code2 size={28} className="text-slate-800" /></div>
                    <a href={project.github} className="p-3 bg-slate-50 rounded-full hover:bg-slate-200 transition-colors"><Github size={20} /></a>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900">{project.title}</h3>
                  <p className="text-slate-600 mb-8 text-lg flex-grow">{project.summary}</p>
                  <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                    <p className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Impact</p>
                    <p className="text-slate-700">{project.impact}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map(t => (
                      <span key={t} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700 shadow-sm">{t}</span>
                    ))}
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. RESEARCH & PUBLICATION (Animation: 3D Rotation) */}
        <section id="research" className="py-32 px-6 md:px-20 relative overflow-hidden" style={{ backgroundColor: '#E3F4FB' }}>
          {/* SVG Deco */}
          <svg className="absolute bottom-0 left-0 w-full h-64 text-white opacity-40" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="currentColor" fillOpacity="1" d="M0,192L80,186.7C160,181,320,171,480,181.3C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>

          <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn><h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900"><BookOpen className="text-slate-500" /> Research & Publications</h2></FadeIn>
            <div className="space-y-8" style={{ perspective: 1000 }}>
              {researchPapers.map((paper, idx) => (
                <Motion.div
                  key={idx}
                  initial={{ rotateX: 30, opacity: 0, y: 50 }}
                  whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="p-10 bg-white shadow-xl rounded-[2rem] border border-white"
                >
                  <span className="text-xs font-bold px-4 py-1.5 bg-[#F8D9EC] text-pink-900 rounded-full mb-6 inline-block tracking-wide">{paper.venue}</span>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900">{paper.title}</h3>
                  <p className="text-slate-600 mb-8 text-lg leading-relaxed italic border-l-4 border-[#DCE4F9] pl-6">"{paper.abstract}"</p>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-slate-100">
                    <p className="text-sm font-medium text-slate-800"><span className="text-slate-400 font-bold uppercase">Contribution:</span> {paper.contribution}</p>
                    <a href={paper.link} className="flex items-center gap-2 text-sm font-bold bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-700 transition-colors">View Paper <ArrowUpRight size={16} /></a>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. EXPERIENCE (Animation: Self-Drawing Paths) */}
        <section id="experience" className="py-32 px-6 md:px-20 relative" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-4xl mx-auto">
            <FadeIn><h2 className="text-4xl font-bold mb-16 flex items-center gap-4"><Briefcase className="text-slate-400" /> Experience</h2></FadeIn>
            <div className="relative space-y-16">

              {/* Self Drawing Timeline Line */}
              <div className="absolute left-[15px] top-4 bottom-0 w-[2px] bg-slate-100">
                <Motion.div
                  initial={{ height: "0%" }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full bg-gradient-to-b from-[#E6CEF4] to-[#DCE4F9]"
                />
              </div>

              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-12">
                  <Motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="absolute w-8 h-8 rounded-full -left-[15px] top-0 border-4 border-white bg-[#DCE4F9] shadow-md flex items-center justify-center"
                  />
                  <FadeIn delay={0.3} direction="right">
                    <span className="text-sm font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full uppercase tracking-wider mb-4 inline-block">{exp.duration}</span>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">{exp.role}</h3>
                    <p className="text-xl text-[#E6CEF4] font-bold mb-6 drop-shadow-sm">{exp.company}</p>
                    <ul className="space-y-4 mb-8">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="text-slate-600 text-lg flex items-start gap-3 bg-slate-50 p-4 rounded-xl">
                          <span className="text-[#DCE4F9] mt-1 font-bold">▹</span> {detail}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map(t => <span key={t} className="text-xs font-bold px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm">{t}</span>)}
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. EDUCATION (Animation: Fade/Slide Horizontal) */}
        <section className="py-32 px-6 md:px-20 overflow-hidden relative" style={{ backgroundColor: '#F8D9EC' }}>
          <svg className="absolute top-1/2 left-0 w-64 h-64 text-white opacity-40 -translate-y-1/2 -translate-x-1/2" viewBox="0 0 200 200" fill="currentColor"><rect width="200" height="200" rx="40" transform="rotate(45 100 100)" /></svg>
          <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn><h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900"><GraduationCap className="text-slate-600" /> Education</h2></FadeIn>
            <div className="space-y-8">
              {education.map((edu, idx) => (
                <Motion.div
                  key={idx}
                  initial={{ x: idx % 2 === 0 ? -100 : 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  className="p-8 md:p-10 rounded-[2rem] bg-white/80 backdrop-blur-md shadow-lg border border-white"
                >
                  <span className="text-sm font-bold text-slate-600 bg-white px-4 py-2 rounded-full mb-6 inline-block shadow-sm">{edu.year}</span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{edu.degree}</h3>
                  <p className="text-slate-600 mb-4 text-lg">{edu.institution}</p>
                  <p className="inline-block px-4 py-1.5 bg-[#DCE4F9] text-slate-800 font-bold rounded-lg text-sm">CGPA: {edu.cgpa}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. AWARDS, GRANTS & RECOGNITIONS (Animation: Scroll-Driven Zoom Out) */}
        <section className="py-32 px-6 md:px-20 relative" style={{ backgroundColor: '#DCE4F9' }}>
          <div className="max-w-5xl mx-auto">
            <FadeIn><h2 className="text-4xl font-bold mb-16 text-center text-slate-900">Awards, Grants & Recognitions</h2></FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {awards.map((award, idx) => (
                <Motion.div
                  key={idx}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, type: "spring" }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white p-8 rounded-[2rem] flex flex-col items-center text-center shadow-lg border border-white"
                >
                  <div className="w-16 h-16 rounded-full bg-[#E3F4FB] flex items-center justify-center text-blue-900 mb-6">
                    {award.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{award.title}</h3>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. TECHNICAL SKILLS */}
        <section className="py-32 px-6 md:px-20" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-6xl mx-auto">
            <FadeIn><h2 className="text-4xl font-bold mb-16 flex items-center gap-4"><Server className="text-slate-400" /> Technical Skills</h2></FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList], idx) => (
                <FadeIn key={category} delay={idx * 0.1}>
                  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm h-full hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-6 text-slate-800 border-b border-slate-200 pb-4">{category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {skillList.map(skill => (
                        <span key={skill} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">{skill}</span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 9. WRITINGS & INSIGHTS (Horizontal Scroll - Fixed Height & Gap) */}
        {/* Adjusted Height to h-[250vh] instead of 400vh to fix the massive white gap */}
        <section ref={blogTargetRef} className="relative h-[250vh]" style={{ backgroundColor: '#E6CEF4' }}>
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <div className="px-10 md:px-20 mb-10 w-full max-w-7xl mx-auto">
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Writings & Insights</h2>
              <p className="text-xl text-slate-700 font-medium">Scroll to explore my latest articles <ArrowDown className="inline animate-bounce ml-2" /></p>
            </div>

            <Motion.div style={{ x: xBlogs }} className="flex gap-10 px-10 md:px-20 w-max pb-10">
              {horizontalBlogs.map((title, idx) => (
                <div key={idx} className="w-[80vw] md:w-[450px] flex-shrink-0 h-[400px] bg-white rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl border border-white hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                  <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-50 blur-3xl transition-colors duration-500`} style={{ backgroundColor: idx % 2 === 0 ? '#F9EFD7' : '#E3F4FB' }}></div>
                  <div className="relative z-10">
                    <span className="text-sm font-bold bg-slate-100 px-4 py-2 rounded-full inline-block mb-8">Article 0{idx + 1}</span>
                    <h3 className="text-3xl font-bold text-slate-900 leading-tight group-hover:text-purple-900 transition-colors">{title}</h3>
                  </div>
                  <a href="#blogs" className="relative z-10 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:bg-[#DCE4F9] group-hover:text-black transition-colors">
                    <ArrowUpRight size={24} />
                  </a>
                </div>
              ))}
            </Motion.div>
          </div>
        </section>

        {/* 10. NEW COMPREHENSIVE BLOG SECTION */}
        <section id="blogs" className="py-32 px-6 md:px-20" style={{ backgroundColor: '#ffffff' }}>
          <div className="max-w-7xl mx-auto">
            <FadeIn><h2 className="text-4xl font-bold mb-6 text-slate-900 flex items-center gap-4"><FileText className="text-[#E6CEF4]" /> Deep Dive Research & Architecture Blogs</h2></FadeIn>
            <FadeIn delay={0.1}><p className="text-xl text-slate-600 mb-16 max-w-3xl">A comprehensive collection of my technical research, architectural designs, and computational biology alignment.</p></FadeIn>

            {/* Rendering Blog Categories */}
            {["Multi-Modal AI", "Multi-Agent & Architecture", "Explainability & Ethics", "Future Direction"].map((categoryName, catIndex) => (
              <div key={categoryName} className="mb-20">
                <FadeIn delay={0.2}><h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-8 border-b border-slate-100 pb-4">{categoryName}</h3></FadeIn>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {detailedBlogs.filter(b => b.category === categoryName).map((blog, idx) => (
                    <FadeIn key={blog.id} delay={0.1 * idx}>
                      <div
                        onClick={() => setSelectedBlog(blog)}
                        className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col"
                      >
                        <span className="text-xs font-bold px-3 py-1 rounded-full w-max mb-6" style={{ backgroundColor: blog.color, color: '#1e293b' }}>{blog.tag}</span>
                        <h4 className="text-2xl font-bold text-slate-900 mb-4">{blog.title}</h4>
                        <p className="text-sm font-semibold text-slate-500 mt-auto">{blog.date}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. ACADEMIC CV DOWNLOAD */}
        <section id="cv" className="py-32 px-6 md:px-20 relative overflow-hidden" style={{ backgroundColor: '#F9EFD7' }}>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <FadeIn>
              <h2 className="text-4xl font-bold mb-6 text-slate-900">Research & Academic Profile</h2>
              <p className="text-slate-700 mb-10 text-xl">Comprehensive details of my research publications, academic history, and technical architecture experience.</p>
              <button className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-700 hover:scale-105 transition-all shadow-xl">
                <Download size={24} /> Download Full Academic CV (PDF)
              </button>
            </FadeIn>
          </div>
        </section>

        {/* 12. CONTACT */}
        <section id="contact" className="py-32 px-6 md:px-20 relative rounded-t-[3rem] overflow-hidden" style={{ backgroundColor: '#18181b' }}>
          <Motion.svg animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -right-40 w-96 h-96 text-[#F8D9EC] opacity-10" viewBox="0 0 200 200" fill="currentColor"><circle cx="100" cy="100" r="100" /></Motion.svg>
          <Motion.svg animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 -left-20 w-80 h-80 text-[#DCE4F9] opacity-10" viewBox="0 0 200 200" fill="currentColor"><rect width="200" height="200" rx="40" transform="rotate(45 100 100)" /></Motion.svg>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 relative z-10">
            <FadeIn>
              <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-white tracking-tight">Let's build <br /><span style={{ color: '#F9EFD7' }}>intelligent systems.</span></h2>
              <p className="text-white/60 mb-12 text-xl leading-relaxed">Open for Research Engineer roles, ML architecture consultations, and technical collaborations.</p>

              <div className="space-y-6 mb-12">
                <a href="mailto:example@email.com" className="flex items-center gap-4 text-white/90 text-xl hover:text-[#E3F4FB] transition-colors"><Mail size={28} /> umaa.maheshwary@example.com</a>
                <div className="flex gap-4 pt-6">
                  <a href="#" className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#E6CEF4] hover:text-black transition-all"><Linkedin size={24} /></a>
                  <a href="#" className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#DCE4F9] hover:text-black transition-all"><Github size={24} /></a>
                  <a href="#" className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#F9EFD7] hover:text-black transition-all" title="Google Scholar"><GraduationCap size={24} /></a>
                  <a href="#" className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-[#E3F4FB] hover:text-black transition-all" title="ResearchGate"><Globe size={24} /></a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white/5 backdrop-blur-xl p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl">
                <input type="text" placeholder="Full Name" required className="p-5 rounded-2xl bg-white/10 border border-white/10 focus:outline-none focus:border-[#E6CEF4] text-white placeholder:text-white/50 transition-colors" onChange={e => setFormData({ ...formData, name: e.target.value })} value={formData.name} />
                <input type="email" placeholder="Email Address" required className="p-5 rounded-2xl bg-white/10 border border-white/10 focus:outline-none focus:border-[#DCE4F9] text-white placeholder:text-white/50 transition-colors" onChange={e => setFormData({ ...formData, email: e.target.value })} value={formData.email} />
                <input type="tel" placeholder="Phone Number" className="p-5 rounded-2xl bg-white/10 border border-white/10 focus:outline-none focus:border-[#F8D9EC] text-white placeholder:text-white/50 transition-colors" onChange={e => setFormData({ ...formData, phone: e.target.value })} value={formData.phone} />
                <textarea placeholder="Your Message / Query" rows="5" required className="p-5 rounded-2xl bg-white/10 border border-white/10 focus:outline-none focus:border-[#F9EFD7] text-white placeholder:text-white/50 transition-colors" onChange={e => setFormData({ ...formData, message: e.target.value })} value={formData.message}></textarea>
                <button type="submit" className="py-5 bg-[#DCE4F9] text-slate-900 font-black tracking-wide uppercase rounded-2xl hover:bg-white transition-colors mt-2">Submit Query</button>
              </form>
            </FadeIn>
          </div>
        </section>
      </div>

      {/* BLOG MODAL (Full Screen Overlay) */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10">
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-8 md:px-16 border-b border-slate-100 flex justify-between items-start z-20">
              <div>
                <span className="text-sm font-bold px-3 py-1 rounded-full mb-4 inline-block" style={{ backgroundColor: selectedBlog.color, color: '#1e293b' }}>{selectedBlog.tag}</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 leading-tight">{selectedBlog.title}</h2>
                <p className="text-slate-500 font-medium">By {selectedBlog.author} • {selectedBlog.date}</p>
              </div>
              <button onClick={() => setSelectedBlog(null)} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                <X size={24} className="text-slate-700" />
              </button>
            </div>

            {/* Modal Content - Structured Exactly as Requested */}
            <div className="p-8 md:p-16 space-y-12 text-lg text-slate-700 leading-relaxed">

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="text-[#E6CEF4]">1️⃣</span> Introduction</h3>
                <p className="bg-slate-50 p-6 rounded-2xl border-l-4 border-[#DCE4F9] italic">{selectedBlog.intro}</p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="text-[#E6CEF4]">2️⃣</span> Core Concept Explanation</h3>
                <p>{selectedBlog.concept}</p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="text-[#E6CEF4]">3️⃣</span> Architecture / Technical Section</h3>
                <p className="mb-6">{selectedBlog.architecture}</p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="text-[#E6CEF4]">4️⃣</span> Challenges & Limitations</h3>
                <p>{selectedBlog.challenges}</p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="text-[#E6CEF4]">5️⃣</span> Applications</h3>
                <p>{selectedBlog.applications}</p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="text-[#E6CEF4]">6️⃣</span> Future Directions</h3>
                <p>{selectedBlog.future}</p>
              </section>

              <section className="pt-8 border-t border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="text-[#E6CEF4]">7️⃣</span> Conclusion</h3>
                <p className="font-medium text-slate-800">{selectedBlog.conclusion}</p>
              </section>

            </div>
          </Motion.div>
        </div>
      )}

    </div>
  );
}