import { NextResponse } from 'next/server';

// In-memory storage (replace with database in production)
let qaDatabase = [
    {
      id: '1',
      question: "How do I start a career in web development?",
      answer: "Start with HTML, CSS, and JavaScript. Build small projects to practice, learn Git for version control, and explore frameworks like React.js and Node.js. Create a portfolio showcasing your work."
    },
    {
      id: '2',
      question: "What is the importance of Next.js in web development?",
      answer: "Next.js is a React framework that simplifies server-side rendering and static site generation, making web apps faster and more SEO-friendly."
    },
    {
      id: '3',
      question: "How can I manage my studies effectively at AKTU?",
      answer: "Plan your study schedule in advance. Focus on understanding concepts rather than rote learning. Utilize online resources, attend lectures, and form study groups with classmates."
    },
    {
      id: '4',
      question: "Are there online resources to help AKTU students with programming?",
      answer: "Yes, platforms like GeeksforGeeks, LeetCode, CodeChef, and W3Schools are excellent resources. AKTU also provides digital content and tutorials for core subjects."
    },
    {
      id: '5',
      question: "How do I balance web development learning and AKTU curriculum?",
      answer: "Set specific time blocks for both. Focus on web development during free hours or weekends. Choose projects that align with your coursework to enhance learning."
    },
    {
      id: '6',
      question: "What are common anxiety triggers for students, and how can I handle them?",
      answer: "Common triggers include exams, deadlines, and peer pressure. Manage anxiety by practicing mindfulness, exercising regularly, and maintaining a positive outlook. Seek support from friends or counselors if needed."
    },
    {
      id: '7',
      question: "How can web development skills help me get a good job after AKTU?",
      answer: "Web development is in high demand. By showcasing your skills in building responsive websites, optimizing performance, and using modern frameworks, you can stand out to recruiters in tech roles."
    },
    {
      id: '8',
      question: "How do I prepare for web development internships?",
      answer: "Focus on building projects, understanding fundamental web technologies, and learning frameworks like React and Express. Prepare a strong resume and practice coding challenges on platforms like HackerRank."
    },
    {
      id: '9',
      question: "What are some ways to reduce exam-related anxiety?",
      answer: "Prepare early, take regular breaks, and practice past papers. Avoid cramming at the last minute. Deep breathing exercises and positive affirmations can also help."
    },
    {
      id: '10',
      question: "Can anxiety impact my ability to focus on web development?",
      answer: "Yes, anxiety can reduce focus and productivity. Counter it by setting achievable goals, taking regular breaks, and seeking help when feeling overwhelmed. Meditation and relaxation exercises can also improve focus."
    },
    {
        id: '11',
        question: "web development",
        answer: "Start with HTML, CSS, and JavaScript. Build small projects to practice, learn Git for version control, and explore frameworks like React.js and Node.js. Create a portfolio showcasing your work."
      }
  ];
  

export async function GET() {
  return NextResponse.json(qaDatabase);
}

export async function POST(request) {
  const body = await request.json();
  const { question, answer } = body;

  if (!question || !answer) {
    return NextResponse.json(
      { error: 'Question and answer are required' }, 
      { status: 400 }
    );
  }

  const newQAPair = {
    id: String(Date.now()),
    question,
    answer,
    createdAt: new Date()
  };

  qaDatabase.push(newQAPair);
  return NextResponse.json(newQAPair, { status: 201 });
}