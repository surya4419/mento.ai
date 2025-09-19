import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTavus } from '@/contexts/TavusContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MessageSquare, Play, AlertCircle, Sparkles, GraduationCap, Shield, Users, BookOpen, Brain, Target, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: Brain,
    title: "AI-Powered Teaching",
    description: "Personalized learning with intelligent avatars that adapt to your learning style."
  },
  {
    icon: Target,
    title: "Doubt Clarification",
    description: "Get instant, step-by-step explanations for any subject or concept."
  },
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description: "Engage with dynamic whiteboards, quizzes, and real-world examples."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your learning data is always private and secure."
  }
];

export default function Landing() {
  const navigate = useNavigate();
  
  // Add error boundary for the component
  const [componentError, setComponentError] = useState<string | null>(null);
  
  let tavusContext;
  try {
    tavusContext = useTavus();
  } catch (error) {
    console.error('Failed to use Tavus context:', error);
    setComponentError('Failed to load application data');
  }

  const { replica, loading, error, createConversation, clearError } = tavusContext || {
    replica: null,
    loading: false,
    error: null,
    createConversation: async () => { throw new Error('Context not available'); },
    clearError: () => {},
  };

  // Clear any existing errors when component mounts
  useEffect(() => {
    if (clearError) {
      clearError();
    }
  }, [clearError]);

  if (componentError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Component Error</h2>
          <p className="text-muted-foreground">{componentError}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-mento-primary text-white rounded-lg hover:bg-mento-primary/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const handleStartSession = async () => {
    try {
      const { conversation_url } = await createConversation();
      navigate(`/session?url=${encodeURIComponent(conversation_url)}`);
    } catch (error) {
      console.error('Failed to start session:', error);
      setComponentError('Failed to start session. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={48} />
      </div>
    );
  }

  // Fallback if no replica data is available
  if (!replica && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-xl font-semibold">No Data Available</h2>
          <p className="text-muted-foreground">Unable to load AI companion data.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-mento-primary text-white rounded-lg hover:bg-mento-primary/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Issue</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => {
                if (clearError) clearError();
                window.location.reload();
              }}
              className="bg-zeo-primary text-white hover:bg-zeo-primary/90"
            >
              Try Again
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                if (clearError) clearError();
              }}
            >
              Continue Anyway
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-b from-mento-surface to-background overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
  <div className="absolute top-1/4 -left-20 w-96 h-96 bg-mento-primary/5 rounded-full blur-3xl" />
  <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-mento-secondary/5 rounded-full blur-3xl" />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-mento-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative flex flex-col items-center">
        {/* Hero Texts */}
        <motion.div 
          className="w-full max-w-3xl mx-auto text-center space-y-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-mento-primary/10 border border-mento-primary/20 mx-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 text-mento-primary" />
            <span className="text-sm font-medium text-mento-primary">
              AI-Powered Teacher & Doubt Clarifier
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl lg:text-6xl font-extrabold leading-tight"
            variants={fadeInUp}
          >
            Meet <span className="bg-gradient-to-br from-mento-primary to-mento-secondary bg-clip-text text-transparent">mento.ai</span>
            <br />
            Your  <span className="bg-gradient-to-br from-mento-primary to-mento-secondary bg-clip-text text-transparent">24/7 AI </span>Teacher
          </motion.h1>

         
        </motion.div>

        {/* Centered Video with floating feature cards */}
        <div className="relative flex flex-col justify-center items-center w-full mt-9 mb-5">
          {/* Floating feature cards */}
          <motion.div className="hidden md:block absolute -top-10 -left-10 z-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="p-4 rounded-2xl glass-strong shadow-lg w-56">
              <Brain className="w-6 h-6 text-blue-500 mb-2" />
              <div className="font-semibold mb-1">AI-Powered Teaching</div>
              <div className="text-xs text-muted-foreground">Personalized learning with intelligent avatars.</div>
            </div>
          </motion.div>
          <motion.div className="hidden md:block absolute -top-10 -right-10 z-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="p-4 rounded-2xl glass-strong shadow-lg w-56">
              <Target className="w-6 h-6 text-green-500 mb-2" />
              <div className="font-semibold mb-1">Doubt Clarification</div>
              <div className="text-xs text-muted-foreground">Get instant, step-by-step explanations.</div>
            </div>
          </motion.div>
          <motion.div className="hidden md:block absolute -bottom-10 -left-10 z-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <div className="p-4 rounded-2xl glass-strong shadow-lg w-56">
              <GraduationCap className="w-6 h-6 text-purple-500 mb-2" />
              <div className="font-semibold mb-1">Interactive Learning</div>
              <div className="text-xs text-muted-foreground">Engage with dynamic whiteboards and quizzes.</div>
            </div>
          </motion.div>
          <motion.div className="hidden md:block absolute -bottom-10 -right-10 z-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="p-4 rounded-2xl glass-strong shadow-lg w-56">
              <Award className="w-6 h-6 text-yellow-500 mb-2" />
              <div className="font-semibold mb-1">Progress Tracking</div>
              <div className="text-xs text-muted-foreground">Track your learning journey and achievements.</div>
            </div>
          </motion.div>
          {/* Centered Video */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20  w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ minHeight: 250 }}
          >
            {replica?.thumbnail_video_url ? (
              <video
                src={replica.thumbnail_video_url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
                style={{ maxHeight: 480 }}
                onError={(e) => {
                  console.error('Video failed to load:', e);
                }}
              />
            ) : (
              <div className="aspect-video bg-gradient-to-br from-mento-primary/20 to-mento-secondary/20 flex items-center justify-center border border-white/10">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto bg-mento-primary/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-mento-primary" />
                  </div>
                  <span className="text-white/80 font-medium">AI Teacher Ready</span>
                </div>
              </div>
            )}
          </motion.div>
          <motion.div 
            className="w-full max-w-3xl mx-auto text-center space-y-6 mt-8"
            variants={fadeInUp}
          >
          <motion.p 
            className="text-xl text-muted-foreground leading-relaxed"
            variants={fadeInUp}
          >
            Experience personalized learning support through real-time engagement recognition 
            and intelligent AI teaching with a lifelike 3D avatar teacher.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4  justify-center"
            variants={fadeInUp}
          >
            <Button 
              onClick={handleStartSession}
              className="bg-mento-primary hover:bg-mento-primary/90 text-white px-8 py-6 text-base font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group"
            >
              <GraduationCap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Learning
            </Button>
            <Button
              variant="outline"
              className="border-mento-primary text-mento-primary hover:bg-mento-primary/10 px-8 py-6 text-base font-medium rounded-xl transition-all duration-300 group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div 
          className="mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Your Learning Journey, Our Priority
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience the future of education with our AI-powered teaching platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="group p-6 rounded-xl bg-white/5 border border-white/5 hover:border-mento-primary/20 transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mento-primary to-mento-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-32 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} mento.ai. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
