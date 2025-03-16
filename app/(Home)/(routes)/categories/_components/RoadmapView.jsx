"use client";
import React, { useState, useEffect } from 'react';
import { Check, Circle } from 'lucide-react';

function RoadmapView({ category }) {
  const [roadmapData, setRoadmapData] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  
  // Load enrolled courses from localStorage
  useEffect(() => {
    const storedCourses = localStorage.getItem('enrolledCourses');
    if (storedCourses) {
      setEnrolledCourses(JSON.parse(storedCourses));
    }
  }, []);

  // Set roadmap data based on category
  useEffect(() => {
    let roadmap = [];
    
    switch(category) {
      case 'ml-ai':
        roadmap = [
          {
            title: 'Foundation',
            items: [
              { id: 'python', name: 'Python' },
              { id: 'linear-algebra', name: 'Linear Algebra' },
              { id: 'calculus', name: 'Calculus' },
              { id: 'statistics', name: 'Statistics' }
            ]
          },
          {
            title: 'Core Concepts',
            items: [
              { id: 'data-preprocessing', name: 'Data Preprocessing & Visualization' },
              { id: 'ml-algorithms', name: 'ML Algorithms (Supervised, Unsupervised)' }
            ]
          },
          {
            title: 'Deep Learning',
            items: [
              { id: 'neural-networks', name: 'Neural Networks (CNN, RNN)' },
              { id: 'frameworks', name: 'Frameworks (TensorFlow, PyTorch)' }
            ]
          },
          {
            title: 'Projects',
            items: [
              { id: 'digit-recognition', name: 'Handwritten Digit Recognition' },
              { id: 'image-classification', name: 'Image Classification' },
              { id: 'sentiment-analysis', name: 'Sentiment Analysis' },
              { id: 'time-series', name: 'Time Series Forecasting' },
              { id: 'recommendation-system', name: 'Recommendation System' }
            ]
          }
        ];
        break;
        
      case 'web-dev':
        roadmap = [
          {
            title: 'Frontend',
            items: [
              { id: 'html', name: 'HTML' },
              { id: 'css', name: 'CSS' },
              { id: 'javascript', name: 'JavaScript' },
              { id: 'react-nextjs', name: 'Framework (React/Next.js)' }
            ]
          },
          {
            title: 'Backend',
            items: [
              { id: 'nodejs-express', name: 'Node.js & Express' },
              { id: 'rest-graphql', name: 'REST/GraphQL APIs' },
              { id: 'prisma', name: 'Prisma' }
            ]
          },
          {
            title: 'Database',
            items: [
              { id: 'sql-nosql', name: 'SQL/NoSQL' },
              { id: 'mongodb', name: 'MongoDB' },
              { id: 'postgresql', name: 'PostgreSQL' }
            ]
          },
          {
            title: 'Projects',
            items: [
              { id: 'portfolio-website', name: 'Portfolio Website' },
              { id: 'blog-platform', name: 'Blog Platform' },
              { id: 'ecommerce-site', name: 'E-commerce Site' },
              { id: 'realtime-chat', name: 'Real-time Chat App' },
              { id: 'social-media', name: 'Social Media Dashboard' }
            ]
          }
        ];
        break;
        
      case 'mobile-dev':
        roadmap = [
          {
            title: 'Platform',
            items: [
              { id: 'android', name: 'Android (Java/Kotlin)' },
              { id: 'ios', name: 'iOS (Swift)' },
              { id: 'cross-platform', name: 'Cross-platform (React Native/Flutter)' }
            ]
          },
          {
            title: 'UI/UX',
            items: [
              { id: 'responsive-design', name: 'Responsive Design' },
              { id: 'animations', name: 'Animations' }
            ]
          },
          {
            title: 'Data',
            items: [
              { id: 'api-integration', name: 'API Integration' },
              { id: 'local-storage', name: 'Local Storage' }
            ]
          },
          {
            title: 'Projects',
            items: [
              { id: 'weather-app', name: 'Weather App' },
              { id: 'todo-list', name: 'To-Do List App' },
              { id: 'chat-app', name: 'Chat App' },
              { id: 'ecommerce-mobile', name: 'E-commerce Mobile App' },
              { id: 'fitness-tracker', name: 'Fitness Tracker' }
            ]
          }
        ];
        break;
        
      case 'cloud-computing':
        roadmap = [
          {
            title: 'Basics',
            items: [
              { id: 'cloud-concepts', name: 'Cloud Concepts (IaaS, PaaS, SaaS)' },
              { id: 'virtualization', name: 'Virtualization & Networking' }
            ]
          },
          {
            title: 'Platforms',
            items: [
              { id: 'aws', name: 'AWS' },
              { id: 'azure', name: 'Azure' },
              { id: 'gcp', name: 'GCP' }
            ]
          },
          {
            title: 'Containers & Serverless',
            items: [
              { id: 'docker', name: 'Docker' },
              { id: 'kubernetes', name: 'Kubernetes' },
              { id: 'lambda', name: 'AWS Lambda' }
            ]
          },
          {
            title: 'Projects',
            items: [
              { id: 'static-website', name: 'Static Website on S3/CloudFront' },
              { id: 'serverless-api', name: 'Serverless REST API' },
              { id: 'multi-region-app', name: 'Multi-region Web App' },
              { id: 'dockerized-microservices', name: 'Dockerized Microservices' },
              { id: 'cicd-pipeline', name: 'CI/CD Pipeline Setup' }
            ]
          }
        ];
        break;
        
      case 'devops':
        roadmap = [
          {
            title: 'Fundamentals',
            items: [
              { id: 'linux', name: 'Linux' },
              { id: 'shell-scripting', name: 'Shell Scripting' },
              { id: 'git', name: 'Git' }
            ]
          },
          {
            title: 'CI/CD',
            items: [
              { id: 'jenkins', name: 'Jenkins' },
              { id: 'github-actions', name: 'GitHub Actions' }
            ]
          },
          {
            title: 'Containers & Orchestration',
            items: [
              { id: 'docker-devops', name: 'Docker' },
              { id: 'kubernetes-devops', name: 'Kubernetes' }
            ]
          },
          {
            title: 'Monitoring',
            items: [
              { id: 'prometheus', name: 'Prometheus' },
              { id: 'grafana', name: 'Grafana' },
              { id: 'elk-stack', name: 'ELK Stack' }
            ]
          },
          {
            title: 'Projects',
            items: [
              { id: 'automated-pipeline', name: 'Automated Build/Deploy Pipeline' },
              { id: 'terraform-iac', name: 'Terraform Infrastructure as Code' },
              { id: 'kubernetes-project', name: 'Kubernetes Orchestration' },
              { id: 'jenkins-ci', name: 'CI Setup with Jenkins' },
              { id: 'monitoring-dashboard', name: 'Monitoring Dashboard' }
            ]
          }
        ];
        break;
        
      case 'mlops':
        roadmap = [
          {
            title: 'ML Basics',
            items: [
              { id: 'model-training', name: 'Model Training & Evaluation' }
            ]
          },
          {
            title: 'Deployment',
            items: [
              { id: 'model-serving', name: 'Model Serving (Flask/FastAPI)' },
              { id: 'docker-containerization', name: 'Docker Containerization' }
            ]
          },
          {
            title: 'CI/CD for ML',
            items: [
              { id: 'automated-pipelines', name: 'Automated Pipelines' },
              { id: 'model-versioning', name: 'Model Versioning' }
            ]
          },
          {
            title: 'Monitoring',
            items: [
              { id: 'realtime-tracking', name: 'Real-time Model Performance Tracking' }
            ]
          },
          {
            title: 'Projects',
            items: [
              { id: 'end-to-end-pipeline', name: 'End-to-End ML Pipeline' },
              { id: 'auto-retraining', name: 'Auto Retraining Pipeline' },
              { id: 'prediction-api', name: 'Real-time Prediction API' },
              { id: 'versioning-system', name: 'Model Versioning System' },
              { id: 'ml-monitoring', name: 'ML Monitoring Dashboard' }
            ]
          }
        ];
        break;
        
      case 'dsa':
        roadmap = [
          {
            title: 'Fundamentals',
            items: [
              { id: 'programming', name: 'Programming (Python/Java/C++)' },
              { id: 'core-data-structures', name: 'Core Data Structures (Arrays, Linked Lists, Stacks, Queues)' }
            ]
          },
          {
            title: 'Algorithms',
            items: [
              { id: 'sorting', name: 'Sorting' },
              { id: 'searching', name: 'Searching' },
              { id: 'recursion', name: 'Recursion' },
              { id: 'dynamic-programming', name: 'Dynamic Programming' },
              { id: 'greedy', name: 'Greedy' }
            ]
          },
          {
            title: 'Practice',
            items: [
              { id: 'leetcode', name: 'LeetCode' },
              { id: 'hackerrank', name: 'HackerRank challenges' }
            ]
          },
          {
            title: 'Projects',
            items: [
              { id: 'bst-implementation', name: 'BST Implementation' },
              { id: 'graph-traversal', name: 'Graph Traversal Visualizer' },
              { id: 'sorting-visualizer', name: 'Sorting Algorithm Visualizer' },
              { id: 'dp-solver', name: 'Dynamic Programming Solver' },
              { id: 'data-structure-library', name: 'Custom Data Structure Library' }
            ]
          }
        ];
        break;
        
      default:
        roadmap = [];
    }
    
    setRoadmapData(roadmap);
  }, [category]);

  // Check if a course is completed based on stored progress
  const isCourseCompleted = (courseId) => {
    const progress = localStorage.getItem(`progress_${courseId}`);
    return progress && parseInt(progress) === 100;
  };

  // Check if a course is enrolled
  const isCourseEnrolled = (courseId) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Learning Roadmap</h2>
      
      <div className="space-y-10">
        {roadmapData.map((section, sectionIndex) => (
          <div key={section.title} className="relative">
            {/* Section title */}
            <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">
              {section.title}
            </h3>
            
            {/* Connecting line */}
            {sectionIndex < roadmapData.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>
            )}
            
            {/* Items */}
            <div className="space-y-4 pl-8 relative">
              {section.items.map((item) => {
                const completed = isCourseCompleted(item.id);
                const enrolled = isCourseEnrolled(item.id);
                
                return (
                  <div key={item.id} className="flex items-center relative">
                    {/* Status indicator */}
                    <div className="absolute -left-8 flex items-center justify-center">
                      {completed ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center z-10">
                          <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                      ) : enrolled ? (
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 flex items-center justify-center z-10">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center z-10">
                          <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                    </div>
                    
                    {/* Course name */}
                    <div className={`p-3 rounded-lg ${
                      completed ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900' : 
                      enrolled ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900' : 
                      'bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700'
                    } w-full`}>
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${
                          completed ? 'text-green-700 dark:text-green-400' : 
                          enrolled ? 'text-blue-700 dark:text-blue-400' : 
                          'text-gray-700 dark:text-gray-300'
                        }`}>
                          {item.name}
                        </span>
                        
                        {completed && (
                          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full">
                            Completed
                          </span>
                        )}
                        {enrolled && !completed && (
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoadmapView; 