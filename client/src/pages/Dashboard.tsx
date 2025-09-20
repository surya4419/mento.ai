import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Avatar3D from '@/components/Avatar3D';
import { 
  TrendingUp, 
  BookOpen, 
  Clock, 
  MessageCircle, 
  Brain,
  Calendar,
  BarChart3,
  GraduationCap,
  Target,
  Award,
  Plus,
  ArrowRight,
  Users,
  Lightbulb
} from 'lucide-react';

const learningData = [
  { date: '2024-01-15', subject: 'Mathematics', score: 8 },
  { date: '2024-01-16', subject: 'Science', score: 7 },
  { date: '2024-01-17', subject: 'English', score: 4 },
  { date: '2024-01-18', subject: 'Mathematics', score: 9 },
  { date: '2024-01-19', subject: 'History', score: 8 },
  { date: '2024-01-20', subject: 'Science', score: 9 },
  { date: '2024-01-21', subject: 'Mathematics', score: 8 }
];

const insights = [
  {
    title: "Learning Progress",
    description: "Your understanding scores have improved by 23% this week",
    icon: TrendingUp,
    trend: "positive",
    value: "+23%"
  },
  {
    title: "Study Consistency",
    description: "You've maintained regular study sessions for 12 days",
    icon: Target,
    trend: "positive", 
    value: "12 days"
  },
  {
    title: "Doubt Resolution",
    description: "Questions resolved increased by 40% this month",
    icon: Lightbulb,
    trend: "positive",
    value: "+40%"
  }
];

const recentSessions = [
  {
    date: "Today, 2:30 PM",
    duration: "45 min",
    subject: "Mathematics",
    topics: ["Algebra", "Quadratic equations"]
  },
  {
    date: "Yesterday, 8:15 PM", 
    duration: "32 min",
    subject: "Science",
    topics: ["Physics", "Newton's laws"]
  },
  {
    date: "Jan 19, 1:45 PM",
    duration: "28 min", 
    subject: "English",
    topics: ["Grammar", "Essay writing"]
  }
];

export default function Dashboard() {
  const averageScore = learningData.reduce((acc, curr) => acc + curr.score, 0) / learningData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zeo-surface via-background to-zeo-surface p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Welcome back, <span className="gradient-text">Sarah</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's your learning journey overview
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="glass" className="group">
              <Calendar className="w-4 h-4" />
              Schedule Study
            </Button>
            <Button variant="hero" className="group">
              <MessageCircle className="w-4 h-4" />
              Start Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Sessions This Week</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Understanding</p>
                  <p className="text-2xl font-bold">{averageScore.toFixed(1)}/10</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-emotion-happy/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emotion-happy" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
                  <p className="text-2xl font-bold">24.5h</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-zeo-secondary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-zeo-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-zeo-primary" />
                    Learning Progress
                  </CardTitle>
                  <CardDescription>Your understanding scores across subjects over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {learningData.map((day, index) => (
                      <motion.div
                        key={day.date}
                        className="flex items-center justify-between p-3 rounded-lg glass"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            day.subject === 'Mathematics' ? 'bg-blue-500' :
                            day.subject === 'Science' ? 'bg-green-500' :
                            day.subject === 'English' ? 'bg-purple-500' :
                            day.subject === 'History' ? 'bg-orange-500' :
                            'bg-gray-500'
                          }`} />
                          <span className="text-sm font-medium">{day.subject}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-hero"
                              initial={{ width: 0 }}
                              animate={{ width: `${day.score * 10}%` }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            />
                          </div>
                          <span className="text-sm font-medium">{day.score}/10</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Recent Study Sessions
                  </CardTitle>
                  <CardDescription>Your latest learning sessions with mento.ai</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSessions.map((session, index) => (
                      <motion.div
                        key={index}
                        className="p-4 rounded-lg glass hover:glass-strong transition-all duration-200 cursor-pointer group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{session.date}</p>
                            <p className="text-sm text-muted-foreground">{session.duration} • {session.subject}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-zeo-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {session.topics.map((topic, topicIndex) => (
                            <span
                              key={topicIndex}
                              className="px-2 py-1 text-xs bg-zeo-primary/10 text-zeo-primary rounded-full"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* ZEO Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass border-border/20 text-center">
                <CardContent className="p-6">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                    <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold mb-2">mento.ai is ready to teach</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start a new session to continue your learning journey
                  </p>
                  <Button variant="hero" className="w-full">
                    <Plus className="w-4 h-4" />
                    New Session
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Insights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-zeo-secondary" />
                    Learning Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {insights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                      <motion.div
                        key={insight.title}
                        className="p-3 rounded-lg glass"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            insight.trend === 'positive' ? 'bg-emotion-happy/20' : 'bg-emotion-anxious/20'
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              insight.trend === 'positive' ? 'text-emotion-happy' : 'text-emotion-anxious'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium">{insight.title}</h4>
                              <span className={`text-xs font-semibold ${
                                insight.trend === 'positive' ? 'text-emotion-happy' : 'text-emotion-anxious'
                              }`}>
                                {insight.value}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">{insight.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}