import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Calculator, 
  Microscope, 
  Globe, 
  Palette, 
  Music,
  Search,
  Filter,
  Star,
  Clock,
  Users
} from 'lucide-react';

const subjects = [
  {
    title: "Mathematics",
    description: "Algebra, Calculus, Geometry, Statistics",
    icon: Calculator,
    color: "bg-blue-500",
    topics: ["Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry"],
    difficulty: "All Levels"
  },
  {
    title: "Science",
    description: "Physics, Chemistry, Biology, Earth Science",
    icon: Microscope,
    color: "bg-green-500",
    topics: ["Physics", "Chemistry", "Biology", "Earth Science", "Astronomy"],
    difficulty: "All Levels"
  },
  {
    title: "English",
    description: "Grammar, Literature, Writing, Communication",
    icon: BookOpen,
    color: "bg-purple-500",
    topics: ["Grammar", "Literature", "Writing", "Reading", "Communication"],
    difficulty: "All Levels"
  },
  {
    title: "History",
    description: "World History, Geography, Social Studies",
    icon: Globe,
    color: "bg-orange-500",
    topics: ["World History", "Geography", "Social Studies", "Civics", "Economics"],
    difficulty: "All Levels"
  },
  {
    title: "Arts",
    description: "Visual Arts, Music, Drama, Creative Writing",
    icon: Palette,
    color: "bg-pink-500",
    topics: ["Visual Arts", "Music", "Drama", "Creative Writing", "Design"],
    difficulty: "All Levels"
  },
  {
    title: "Music",
    description: "Music Theory, Instruments, Composition",
    icon: Music,
    color: "bg-indigo-500",
    topics: ["Music Theory", "Instruments", "Composition", "History", "Performance"],
    difficulty: "All Levels"
  }
];

const recentResources = [
  {
    title: "Introduction to Algebra",
    subject: "Mathematics",
    duration: "45 min",
    rating: 4.8,
    students: 1250
  },
  {
    title: "Photosynthesis Explained",
    subject: "Science",
    duration: "30 min",
    rating: 4.9,
    students: 980
  },
  {
    title: "Shakespeare's Sonnets",
    subject: "English",
    duration: "60 min",
    rating: 4.7,
    students: 750
  },
  {
    title: "World War II Overview",
    subject: "History",
    duration: "50 min",
    rating: 4.6,
    students: 1100
  }
];

export default function Library() {
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
              Learning <span className="gradient-text">Library</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore subjects, access resources, and track your learning progress
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search subjects or topics..."
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-zeo-primary/50"
              />
            </div>
            <Button variant="glass" className="group">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </motion.div>

        {/* Subjects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.title}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="glass border-border/20 hover:border-zeo-primary/20 transition-all duration-300 cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{subject.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{subject.difficulty}</p>
                      </div>
                    </div>
                    <CardDescription>{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.slice(0, 3).map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-2 py-1 text-xs bg-zeo-primary/10 text-zeo-primary rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                        {subject.topics.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                            +{subject.topics.length - 3} more
                          </span>
                        )}
                      </div>
                      <Button variant="outline" className="w-full group-hover:bg-zeo-primary/10 group-hover:border-zeo-primary/20">
                        Start Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Popular Learning Resources
              </CardTitle>
              <CardDescription>Most accessed and highly rated educational content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {recentResources.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    className="p-4 rounded-lg glass hover:glass-strong transition-all duration-200 cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium group-hover:text-zeo-primary transition-colors">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.subject}</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {resource.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {resource.students.toLocaleString()} students
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

