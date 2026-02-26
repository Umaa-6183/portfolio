import React, { useState, useRef } from 'react';
import { motion as Motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowDown, Mail, Github, Linkedin, Microscope, Code2, Brain,
  ArrowUpRight, Download, BookOpen, Server, GraduationCap, Briefcase, FileText, Globe,
  Trophy, Award, Medal, Star, X
} from 'lucide-react';

// --- DATA ARRAYS ---
const portfolioProjects = [
  {
    title: "New LLM Research",
    summary: "Brief 2-line description of what you built and why.",
    tech: ["PyTorch", "HuggingFace", "CUDA"],
    impact: "Decreased inference time by 15%.",
    github: "https://github.com/yourusername/repo-link",
    color: "#F9EFD7",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Multi-Modal Emotion Recognition",
    summary: "Architected a unified model fusing audio, visual, and text data for high-accuracy human emotional state detection.",
    tech: ["PyTorch", "Transformers", "OpenCV"],
    impact: "Achieved 94% accuracy on validation sets. Architecture published in IEEE.",
    github: "#",
    color: "#DCE4F9",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Multi-Agent AI Wellness App",
    summary: "Developed a personalized wellness ecosystem driven by interacting LLM agents to monitor and suggest health routines.",
    tech: ["LangChain", "OpenAI API", "React Native"],
    impact: "Reduced user latency by 40% using optimized vector retrieval. Serves context-aware responses.",
    github: "#",
    color: "#E6CEF4",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Cognitive Digital Twin",
    summary: "Built a synthetic data simulation environment mapping real-world physical sensor data to a predictive AI model.",
    tech: ["TensorFlow", "AWS IoT", "Python"],
    impact: "Improved predictive maintenance anomaly detection by 22% over baseline models.",
    github: "#",
    color: "#F9EFD7",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "AI Career Platform",
    summary: "Engineered a recommendation engine matching candidate resumes with dynamic job market vector embeddings.",
    tech: ["HuggingFace", "Pinecone", "Next.js"],
    impact: "Scaled to process 10,000+ resumes concurrently with sub-second search times.",
    github: "#",
    color: "#F8D9EC",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Masked Face Detection",
    summary: "Designed a lightweight CNN deployed on edge devices to detect proper facial mask wearing in real-time.",
    tech: ["YOLOv5", "C++", "Edge AI"],
    impact: "Maintained 30 FPS inference speed with 98% precision on low-power hardware.",
    github: "#",
    color: "#E3F4FB",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop"
  },
  // --- 4 NEW ADDED DUMMY PROJECTS ---
  {
    title: "Computational Genomic Sequencer",
    summary: "Deep learning pipeline for rapid DNA sequence alignment and anomaly detection.",
    tech: ["BioPython", "Keras", "AWS"],
    impact: "Accelerated sequence matching by 300% against industry standard tools.",
    github: "#",
    color: "#E6CEF4",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Protein Folding Predictor",
    summary: "Graph neural network designed to predict 3D protein structures from amino acid sequences.",
    tech: ["PyTorch Geometric", "JAX", "CUDA"],
    impact: "Achieved near state-of-the-art angstrom accuracy on custom lab datasets.",
    github: "#",
    color: "#DCE4F9",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Clinical Trial Data Extractor",
    summary: "NLP engine capable of parsing dense PDF medical journals to extract trial outcomes and dosages.",
    tech: ["BERT", "Spacy", "PostgreSQL"],
    impact: "Automated 90% of manual data entry for a medical research startup.",
    github: "#",
    color: "#F9EFD7",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Automated Micro-fluidics Control",
    summary: "Computer vision integrated control system for real-time routing of micro-fluidic droplets.",
    tech: ["OpenCV", "C++", "Raspberry Pi"],
    impact: "Reduced routing errors to under 0.1% during long-duration experiments.",
    github: "#",
    color: "#F8D9EC",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1200&auto=format&fit=crop"
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
  },
  // --- ADDED 3RD EXPERIENCE ---
  {
    role: "Data Science Research Assistant",
    company: "XYZ University Labs",
    duration: "May 2022 - Dec 2022",
    details: [
      "Conducted extensive research on computer vision models for biological image segmentation.",
      "Co-authored a paper on lightweight CNN architectures for edge computing environments.",
      "Processed and cleaned over 10,000 microscopic image samples for training datasets."
    ],
    tech: ["PyTorch", "OpenCV", "MATLAB", "Bash"]
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

// --- UPDATED AWARDS DATA ---
const awardsList = [
  {
    year: "2026",
    recognition: "I won paper award",
    project: "Multi-Modal Emotion AI",
    platform: "IEEE CAI",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2025",
    recognition: "I received academic honor",
    project: "M.Tech Thesis",
    platform: "XYZ University",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2024",
    recognition: "I secured funding",
    project: "Cognitive Digital Twin",
    platform: "Tech Ventures",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2023",
    recognition: "I got research recognition",
    project: "Protein Folding GNN",
    platform: "Bioinformatics Journal",
    image: "https://images.unsplash.com/photo-1532187863486-abf9db0c28a3?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2022",
    recognition: "Best Innovation Award",
    project: "AI Wellness Assistant",
    platform: "Tech Innovation Summit",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2022",
    recognition: "Top 10 AI Researchers",
    project: "Career Recommendation System",
    platform: "Data Science Weekly",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2021",
    recognition: "Outstanding Developer",
    project: "Masked Face Detection",
    platform: "Global Tech Awards",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&auto=format&fit=crop"
  },
  {
    year: "2020",
    recognition: "Hackathon Winner",
    project: "MindfulPath App",
    platform: "DevPost Health Hack",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
  }
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

// Text Reveal Component
const RevealText = ({ text }) => {
  const words = text.split(" ");
  return (
    <Motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
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
  const [selectedBlog, setSelectedBlog] = useState(null); // Modal State
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [hoveredAward, setHoveredAward] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredExpIndex, setHoveredExpIndex] = useState(null);
  // 1. PROGRESS BAR ANIMATION (Global)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 2. PARALLAX HERO ANIMATION
  const { scrollYProgress: heroScroll } = useScroll();
  const yHero = useTransform(heroScroll, [0, 1], ["0%", "40%"]);

  // HORIZONTAL SCROLL FOR SKILLS BACKGROUND TEXT
  const skillsRef = useRef(null);
  const { scrollYProgress: skillsScroll } = useScroll({ target: skillsRef, offset: ["start end", "end start"] });
  const xSkillsBg = useTransform(skillsScroll, [0, 1], ["10%", "-50%"]);

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

      {/* 1. HERO SECTION */}
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

        {/* 2. ABOUT SECTION */}
        <section id="about" className="py-24 px-6 md:px-20 relative overflow-hidden" style={{ backgroundColor: '#fbf8cc' }}>
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

        {/* 3. FEATURED PROJECTS (Agency Video Layout) */}
        <section id="projects" className="py-32 px-6 md:px-20 relative overflow-hidden" style={{ backgroundColor: '#fde4cf' }}>
          <div className="max-w-7xl mx-auto">
            {/* Centered Video-Style Header */}
            <FadeIn>
              <div className="text-center mb-20">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 block">+ Our Work</span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter">Latest Projects</h2>
              </div>
            </FadeIn>
            {/* Grid Layout: First item full width, next items 2-columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
              {portfolioProjects.slice(0, 5).map((project, index) => {
                const isFirst = index === 0;
                return (
                  <Motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`group cursor-pointer flex flex-col ${isFirst ? 'md:col-span-2' : ''}`}
                    onClick={() => setActiveProjectIndex(index)}
                  >
                    {/* Image Container with Zoom Hover Effect */}
                    <div className={`overflow-hidden rounded-[2rem] mb-6 ${isFirst ? 'aspect-[21/9]' : 'aspect-video'} bg-slate-100 relative`}>
                      <Motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Pastel Color Hint Overlay */}
                      <div className="absolute inset-0 mix-blend-overlay opacity-20" style={{ backgroundColor: project.color }}></div>
                    </div>

                    {/* Text Content matching video layout */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 pb-4">
                      <div className="max-w-xl">
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-slate-600 transition-colors">{project.title}</h3>
                        <p className="text-slate-600 text-lg mt-2 leading-relaxed hidden md:block">{project.summary}</p>
                      </div>

                      {/* Tags grouped on the right side */}
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {project.tech.map(t => (
                          <span key={t} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-500">{t}</span>
                        ))}
                      </div>
                    </div>
                  </Motion.div>
                );
              })}
            </div>
            {/* View All Button */}
            <FadeIn delay={0.4}>
              <div className="mt-24 text-center">
                <button
                  onClick={() => setActiveProjectIndex(0)}
                  className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-700 hover:-translate-y-1 transition-all shadow-lg"
                >
                  View All My Work
                </button>
              </div>
            </FadeIn>
          </div>
        </section>
        {/* PROJECT DETAILS MODAL ("New Page" Effect) */}
        {activeProjectIndex !== null && (
          <div className="fixed inset-0 z-[999] bg-white overflow-y-auto flex flex-col">
            {/* Header & Close Button */}
            <div className="sticky top-0 w-full px-6 py-6 flex justify-between items-center bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
              <span className="text-sm font-bold tracking-widest uppercase text-slate-400">Project {activeProjectIndex + 1} of {portfolioProjects.length}</span>
              <button
                onClick={() => setActiveProjectIndex(null)}
                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors flex items-center gap-2 text-sm font-bold"
              >
                Close <X size={18} />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto w-full px-6 py-16 flex-grow flex flex-col items-center">
              <span className="px-4 py-1.5 rounded-full font-bold text-sm mb-6 inline-block" style={{ backgroundColor: portfolioProjects[activeProjectIndex].color }}>
                {portfolioProjects[activeProjectIndex].tech[0]} Focus
              </span>

              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 text-center tracking-tight">
                {portfolioProjects[activeProjectIndex].title}
              </h1>

              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {portfolioProjects[activeProjectIndex].tech.map(t => (
                  <span key={t} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full font-semibold text-slate-600">{t}</span>
                ))}
              </div>

              <div className="w-full aspect-video rounded-[3rem] overflow-hidden bg-slate-100 mb-16 shadow-2xl">
                <img src={portfolioProjects[activeProjectIndex].image} alt="Project Demo" className="w-full h-full object-cover" />
              </div>

              <div className="w-full max-w-3xl space-y-10 text-lg md:text-xl text-slate-700 leading-relaxed">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Project Overview</h3>
                  <p>{portfolioProjects[activeProjectIndex].summary}</p>
                </div>

                <div className="p-8 bg-slate-50 rounded-3xl border-l-4" style={{ borderColor: portfolioProjects[activeProjectIndex].color }}>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Measurable Impact</h3>
                  <p className="font-medium text-slate-900">{portfolioProjects[activeProjectIndex].impact}</p>
                </div>

                <a href={portfolioProjects[activeProjectIndex].github} className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-700 transition-colors">
                  <Github size={20} /> View Source Code
                </a>
              </div>
            </div>

            {/* Footer Navigation (Next / Previous Project) */}
            <div className="w-full bg-slate-50 border-t border-slate-200 p-8 md:px-20 mt-auto">
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                <button
                  onClick={() => setActiveProjectIndex((prev) => (prev > 0 ? prev - 1 : portfolioProjects.length - 1))}
                  className="flex flex-col items-start group"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 group-hover:text-slate-600 transition-colors">Previous</span>
                  <span className="text-lg font-bold text-slate-900 flex items-center gap-2"><ArrowDown className="rotate-90" size={18} /> Back</span>
                </button>

                <button
                  onClick={() => setActiveProjectIndex((prev) => (prev < portfolioProjects.length - 1 ? prev + 1 : 0))}
                  className="flex flex-col items-end group"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 group-hover:text-slate-600 transition-colors">Up Next</span>
                  <span className="text-lg font-bold text-slate-900 flex items-center gap-2">Next Project <ArrowUpRight className="rotate-45" size={18} /></span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. RESEARCH & PUBLICATION */}
        <section id="research" className="py-32 px-6 md:px-20 relative overflow-hidden" style={{ backgroundColor: '#ffcfd2' }}>
          <svg className="absolute bottom-0 left-0 w-full h-64 text-white opacity-40" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="currentColor" fillOpacity="1" d="M0,192L80,186.7C160,181,320,171,480,181.3C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>

          <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn><h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900"><BookOpen className="text-slate-500" /> Research & Publications</h2></FadeIn>
            <div className="space-y-8" style={{ perspective: 1000 }}>
              {researchPapers.map((paper, idx) => (
                <Motion.div
                  key={idx}
                  initial={{ rotateX: 30, opacity: 0, y: 50 }}
                  whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
                  viewport={{ margin: "0px", amount: 0.3 }}
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

        {/* 5. EXPERIENCE (Hover Accordion Layout) */}
        <section id="experience" className="py-32 px-6 md:px-20 relative overflow-hidden">
          <Motion.svg animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -left-40 w-96 h-96 text-[#f1c0e8] opacity-40" viewBox="0 0 200 200" fill="currentColor"><circle cx="100" cy="100" r="100" /></Motion.svg>
          <Motion.svg animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 -right-20 w-80 h-80 text-[#f1c0e8] opacity-70" viewBox="0 0 200 200" fill="currentColor"><rect width="200" height="200" rx="40" transform="rotate(45 100 100)" /></Motion.svg>
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-20 leading-none">
                Experience
              </h2>
            </FadeIn>

            <div className="flex flex-col w-full border-t border-slate-200">
              {experience.map((exp, idx) => {
                const isHovered = hoveredExpIndex === idx;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredExpIndex(idx)}
                    onMouseLeave={() => setHoveredExpIndex(null)}
                    className="group border-b border-slate-200 py-12 cursor-pointer transition-colors"
                  >
                    {/* Always Visible Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 transition-colors group-hover:text-slate-500">
                          {exp.role}
                        </h3>
                        <p className="text-xl text-slate-500 font-medium">
                          {exp.company} <span className="text-slate-300 mx-3">|</span> {exp.duration}
                        </p>
                      </div>
                    </div>

                    {/* Smoothly Expanding Content */}
                    <Motion.div
                      initial={false}
                      animate={{
                        height: isHovered ? "auto" : 0,
                        opacity: isHovered ? 1 : 0
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.04, 0.62, 0.23, 0.98] // Smooth, snappy agency-style easing
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 pb-2">
                        <ul className="space-y-4 mb-8 max-w-4xl">
                          {exp.details.map((detail, i) => (
                            <li key={i} className="text-slate-600 text-lg leading-relaxed flex items-start gap-3">
                              <span className="text-slate-300 mt-1">▹</span> {detail}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-3">
                          {exp.tech.map(t => (
                            <span key={t} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm font-semibold text-slate-600 shadow-sm transition-colors group-hover:border-slate-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. EDUCATION */}
        <section className="py-32 px-6 md:px-20 overflow-hidden relative" style={{ backgroundColor: '#cfbaf0' }}>
          <svg className="absolute top-1/2 left-0 w-64 h-64 text-white opacity-40 -translate-y-1/2 -translate-x-1/2" viewBox="0 0 200 200" fill="currentColor"><rect width="200" height="200" rx="40" transform="rotate(45 100 100)" /></svg>
          <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn><h2 className="text-4xl font-bold mb-16 flex items-center gap-4 text-slate-900"><GraduationCap className="text-slate-600" /> Education</h2></FadeIn>
            <div className="space-y-8">
              {education.map((edu, idx) => (
                <Motion.div
                  key={idx}
                  initial={{ x: idx % 2 === 0 ? -100 : 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
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

        {/* 7. AWARDS, GRANTS & RECOGNITIONS (List Layout with Hover Image) */}
        <section
          className="py-32 px-6 md:px-20 relative overflow-hidden"
          onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
        >
          <Motion.svg animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute -top-40 -right-40 w-96 h-96 text-[#a3c4f3] opacity-60" viewBox="0 0 200 200" fill="currentColor"><rect width="200" height="200" rx="40" transform="rotate(45 100 100)" /></Motion.svg>
          <svg className="absolute bottom-0 left-0 w-full h-64 text-[#a3c4f3] opacity-40" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="currentColor" fillOpacity="1" d="M0,192L80,186.7C160,181,320,171,480,181.3C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
          {/* <Motion.svg animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 -right-0 w-96 h-96 text-[#a3c4f3] opacity-60" viewBox="0 0 200 200" fill="currentColor"><circle cx="100" cy="100" r="100" /></Motion.svg>
          <Motion.svg animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 -left-20 w-80 h-80 text-[#a3c4f3] opacity-40" viewBox="0 0 200 200" fill="currentColor"><rect width="200" height="200" rx="40" transform="rotate(45 100 100)" /></Motion.svg> */}
          <div className="max-w-7xl mx-auto relative">
            <FadeIn>
              <h2 className="text-6xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter mb-20 leading-none">
                Awards & <br /> Recognitions
              </h2>
            </FadeIn>

            {/* FIXED: Added top-0, left-0, and z-[999] so the image actually stays on the screen */}
            <Motion.img
              src={hoveredAward !== null ? awardsList[hoveredAward].image : awardsList[0].image}
              className="fixed top-0 left-0 w-72 h-80 object-cover rounded-2xl pointer-events-none z-[999] shadow-2xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: hoveredAward !== null ? 1 : 0,
                scale: hoveredAward !== null ? 1 : 0.8,
                x: mousePosition.x - 144, // Offsets by half width (288/2) to center on cursor
                y: mousePosition.y - 160  // Offsets by half height (320/2) to center on cursor
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
            />

            <div className="flex flex-col w-full relative z-10">
              {/* Table Header Row (Hidden on Mobile) */}
              <div className="hidden md:grid grid-cols-4 gap-4 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 pb-4 border-b border-slate-200">
                <div>Year</div>
                <div>Recognition</div>
                <div>Project</div>
                <div>Platform</div>
              </div>

              {/* Table Body Rows */}
              {awardsList.map((award, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredAward(idx)}
                  onMouseLeave={() => setHoveredAward(null)}
                  className="group grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 py-8 border-b border-slate-200 cursor-pointer transition-colors hover:bg-slate-50 items-center"
                >
                  <div className="text-lg font-medium text-slate-500 group-hover:text-slate-900 transition-colors">
                    {award.year}
                  </div>
                  <div className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-slate-600 transition-colors">
                    {award.recognition}
                  </div>
                  <div className="text-base font-medium text-slate-500 group-hover:text-slate-900 transition-colors">
                    {award.project}
                  </div>
                  <div className="text-base font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase">
                    {award.platform}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. TECHNICAL SKILLS */}
        <section ref={skillsRef} className="py-32 px-6 md:px-20 relative overflow-hidden " style={{ backgroundColor: '#90dbf4' }}>

          {/* MASSIVE BACKGROUND TEXT (Parallax Scroll) */}
          <Motion.div
            style={{ x: xSkillsBg }}
            className="absolute bottom-10 left-0 text-[12rem] md:text-[22rem] font-black text-slate-200/50 whitespace-nowrap z-0 pointer-events-none select-none tracking-tighter leading-none"
          >
            TOOLS SKILLS
          </Motion.div>

          <div className="max-w-7xl mx-auto relative z-10">

            {/* TOP ROW: Sticky Title + Lists */}
            <div className="flex flex-col lg:flex-row gap-16 mb-24">

              {/* Left Column: Sticky Title */}
              <div className="lg:w-1/3">
                <div className="sticky top-32">
                  <FadeIn>
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                      <span className="text-slate-900 font-black">+</span> Our Work
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black text-slate-900 uppercase leading-[0.9] tracking-tighter">
                      Tools & <br /> Skills
                    </h2>
                  </FadeIn>
                </div>
              </div>

              {/* Right Column: Skills Lists */}
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {Object.entries(skills).map(([category, skillList], idx) => (
                  <FadeIn key={category} delay={idx * 0.1}>
                    <h3 className="text-2xl font-black text-slate-900 mb-6">{category}</h3>
                    <ul className="space-y-3">
                      {skillList.map(skill => (
                        <li key={skill} className="text-lg font-medium text-slate-600 flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* BOTTOM ROW: Percentage Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {Object.keys(skills).map((category, idx) => {
                // Mapping existing categories to matching icons and mock percentages to match the video's aesthetic perfectly
                const cardIcons = [<Code2 size={40} />, <Brain size={40} />, <Server size={40} />, <Globe size={40} />, <Microscope size={40} />];
                const mockPercentages = [98, 92, 95, 88, 90];

                return (
                  <FadeIn key={`card-${category}`} delay={idx * 0.1}>
                    <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl border border-slate-100 h-full group hover:-translate-y-2 transition-transform duration-300">
                      <div className="text-slate-900 mb-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                        {cardIcons[idx]}
                      </div>
                      <h4 className="text-lg font-black text-slate-900 mb-6 leading-tight">{category}</h4>
                      <div className="bg-slate-100/80 px-6 py-2 rounded-xl text-slate-800 font-black text-xl w-full">
                        {mockPercentages[idx]}%
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

          </div>
        </section>

        {/* 9. WRITINGS & INSIGHTS (Continuous Infinite Carousel) */}
        <section className="py-32 overflow-hidden" style={{ backgroundColor: '#8eecf5' }}>
          <div className="px-6 md:px-20 mb-12 w-full max-w-7xl mx-auto">
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Writings & Insights</h2>
            <p className="text-xl text-slate-700 font-medium">Explore my latest articles</p>
          </div>

          <div className="flex w-full overflow-hidden">
            <Motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 40, repeat: Infinity }}
              className="flex gap-10 w-max px-5 pb-10"
            >
              {/* Duplicating the array to create a seamless infinite loop */}
              {[...horizontalBlogs, ...horizontalBlogs].map((title, idx) => {
                // We use modulo to keep the article numbers and colors correct for the duplicated items
                const actualIndex = idx % horizontalBlogs.length;

                return (
                  <div key={idx} className="w-[80vw] md:w-[450px] flex-shrink-0 h-[400px] bg-white rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl border border-white hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                    <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-50 blur-3xl transition-colors duration-500`} style={{ backgroundColor: actualIndex % 2 === 0 ? '#F9EFD7' : '#E3F4FB' }}></div>
                    <div className="relative z-10">
                      <span className="text-sm font-bold bg-slate-100 px-4 py-2 rounded-full inline-block mb-8">Article 0{actualIndex + 1}</span>
                      <h3 className="text-3xl font-bold text-slate-900 leading-tight group-hover:text-purple-900 transition-colors">{title}</h3>
                    </div>
                    <a href="#blogs" className="relative z-10 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:bg-[#DCE4F9] group-hover:text-black transition-colors">
                      <ArrowUpRight size={24} />
                    </a>
                  </div>
                );
              })}
            </Motion.div>
          </div>
        </section>

        {/* 10. NEW COMPREHENSIVE BLOG SECTION (Sticky Left, Scrolling Right) */}
        <section id="blogs" className="py-32 px-6 md:px-20" style={{ backgroundColor: '#98f5e1' }}>
          <div className="max-w-7xl mx-auto">

            {/* Main Section Header */}
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 flex items-center gap-4 tracking-tighter">
                <FileText className="text-[#E6CEF4]" size={48} /> Deep Dive Research
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl text-slate-600 mb-24 max-w-3xl leading-relaxed">
                A comprehensive collection of my technical research, architectural designs, and computational biology alignment.
              </p>
            </FadeIn>

            {/* Rendering Blog Categories */}
            {["Multi-Modal AI", "Multi-Agent & Architecture", "Explainability & Ethics", "Future Direction"].map((categoryName) => (

              /* Parent container must have items-start for sticky to work correctly */
              <div key={categoryName} className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32 relative items-start">

                {/* LEFT SIDE: Sticky Category Title */}
                <div className="lg:w-1/3 relative lg:sticky top-32 z-10">
                  <FadeIn delay={0.2}>
                    <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter mb-6">
                      {categoryName}
                    </h3>
                    {/* Decorative accent line */}
                    <div className="w-12 h-1.5 bg-slate-900 rounded-full mb-6"></div>
                    <p className="text-lg text-slate-500 font-medium">
                      Explore architecture insights and technical breakdowns related to {categoryName}.
                    </p>
                  </FadeIn>
                </div>

                {/* RIGHT SIDE: Scrolling Blog Cards */}
                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {detailedBlogs.filter(b => b.category === categoryName).map((blog, idx) => (
                    <FadeIn key={blog.id} delay={0.1 * idx}>
                      <div
                        onClick={() => setSelectedBlog(blog)}
                        className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full flex flex-col group"
                      >
                        <div className="mb-8 flex justify-between items-start">
                          <span
                            className="text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider transition-transform group-hover:scale-105"
                            style={{ backgroundColor: blog.color, color: '#1e293b' }}
                          >
                            {blog.tag}
                          </span>
                          <ArrowUpRight className="text-slate-300 group-hover:text-slate-900 transition-colors" size={24} />
                        </div>

                        <h4 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-slate-600 transition-colors leading-snug">
                          {blog.title}
                        </h4>

                        <p className="text-sm font-semibold text-slate-400 mt-auto pt-6 border-t border-slate-200 uppercase tracking-widest">
                          {blog.date}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 11. ACADEMIC CV DOWNLOAD */}
        <section id="cv" className="py-32 px-6 md:px-20 relative overflow-hidden" style={{ backgroundColor: '#b9fbc0' }}>
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
                  <a href="#" className="w-14 h-14 hover:bg-E3F4FB/10 backdrop-blur-md rounded-full flex items-center justify-center bg-[#E6CEF4] text-black  transition-all"><Linkedin size={24} /></a>
                  <a href="#" className="w-14 h-14 hover:bg-E6CEF4/10 backdrop-blur-md rounded-full flex items-center justify-center bg-[#DCE4F9] text-black transition-all"><Github size={24} /></a>
                  <a href="#" className="w-14 h-14 hover:bg-DCE4F9/10 backdrop-blur-md rounded-full flex items-center justify-center bg-[#F9EFD7] text-black transition-all" title="Google Scholar"><GraduationCap size={24} /></a>
                  <a href="#" className="w-14 h-14 hover:bg-F9EFD7/10 backdrop-blur-md rounded-full flex items-center justify-center bg-[#E3F4FB] text-black transition-all" title="ResearchGate"><Globe size={24} /></a>
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