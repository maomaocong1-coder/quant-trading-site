'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LessonSidebar, LessonContent } from '@/components/course';

interface Lesson {
  _id: string;
  title: string;
  content: string;
  slug: string;
  moduleIndex: number;
  order: number;
  codeExamples?: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  }[];
  resources?: {
    title: string;
    url: string;
    type: string;
  }[];
}

interface Course {
  _id: string;
  title: string;
  slug: string;
  modules: {
    _id: string;
    title: string;
    order: number;
    lessons: {
      _id: string;
      title: string;
      slug: string;
      order: number;
    }[];
  }[];
}

export default function LessonPage() {
  const params = useParams();
  const courseSlug = params.slug as string;
  const lessonSlug = params.lessonSlug as string;
  const { data: session } = useSession();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<{ title: string; slug: string; moduleIndex: number; order: number }[]>([]);
  const [navigation, setNavigation] = useState<{
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
  }>({ prev: null, next: null });
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonRes, courseRes] = await Promise.all([
          fetch(`/api/courses/${courseSlug}/${lessonSlug}`),
          fetch(`/api/courses/${courseSlug}`),
        ]);

        if (lessonRes.ok) {
          const lessonData = await lessonRes.json();
          setLesson(lessonData.lesson);
          setNavigation(lessonData.navigation);
          
          const allLessons = lessonData.allLessons || [];
          const currentIndex = allLessons.findIndex((l: { slug: string }) => l.slug === lessonSlug);
          setNavigation({
            prev: currentIndex > 0 ? { slug: allLessons[currentIndex - 1].slug, title: allLessons[currentIndex - 1].title } : null,
            next: currentIndex < allLessons.length - 1 ? { slug: allLessons[currentIndex + 1].slug, title: allLessons[currentIndex + 1].title } : null,
          });
        }

        if (courseRes.ok) {
          const courseData = await courseRes.json();
          setCourse(courseData.course);
          setLessons(courseData.lessons);
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchData();
  }, [courseSlug, lessonSlug]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!session?.user?.id) return;
      
      try {
        const res = await fetch('/api/user/progress');
        if (res.ok) {
          const progressData = await res.json();
          const courseProgress = progressData.find((p: { courseSlug: string }) => p.courseSlug === courseSlug);
          if (courseProgress) {
            setCompletedLessons(courseProgress.completedLessons);
            setIsCompleted(courseProgress.completedLessons.includes(lessonSlug));
          }
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [session, courseSlug, lessonSlug]);

  const handleMarkComplete = async () => {
    try {
      await fetch('/api/progress/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug, lessonSlug }),
      });
      setCompletedLessons([...completedLessons, lessonSlug]);
      setIsCompleted(true);
    } catch (error) {
      console.error('Error marking complete:', error);
    }
  };

  const handleMarkIncomplete = async () => {
    try {
      await fetch('/api/progress/complete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug, lessonSlug }),
      });
      setCompletedLessons(completedLessons.filter(l => l !== lessonSlug));
      setIsCompleted(false);
    } catch (error) {
      console.error('Error marking incomplete:', error);
    }
  };

  if (!lesson || !course) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const modules = course.modules.map((m, index) => ({
    _id: `module-${index}`,
    title: m.title,
    order: m.order || index,
    lessons: lessons.filter(l => l.moduleIndex === index).map(l => ({
      _id: l.slug,
      title: l.title,
      slug: l.slug,
      order: l.order,
    })),
  }));

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <LessonSidebar
        courseSlug={courseSlug}
        modules={modules}
        currentLessonSlug={lessonSlug}
        completedLessons={completedLessons}
      />
      <LessonContent
        lesson={lesson}
        navigation={navigation}
        courseSlug={courseSlug}
        isCompleted={isCompleted}
        onMarkComplete={handleMarkComplete}
        onMarkIncomplete={handleMarkIncomplete}
      />
    </div>
  );
}