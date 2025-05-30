'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, BookOpen, DollarSign, Plus, Trash2, Video } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Lesson = {
  id: string
  title: string
  description: string
  videoUrl: string
}

export default function NewCoursePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: 0,
    status: 'draft' as 'draft' | 'published',
    lessons: [] as Lesson[]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Redirect back to courses page
    router.push('/creator/courses')
  }

  const addLesson = () => {
    setCourse(prev => ({
      ...prev,
      lessons: [...prev.lessons, {
        id: Date.now().toString(),
        title: '',
        description: '',
        videoUrl: ''
      }]
    }))
  }

  const updateLesson = (index: number, field: string, value: string) => {
    setCourse(prev => ({
      ...prev,
      lessons: prev.lessons.map((lesson, i) =>
        i === index ? { ...lesson, [field]: value } : lesson
      )
    }))
  }

  const removeLesson = (index: number) => {
    setCourse(prev => ({
      ...prev,
      lessons: prev.lessons.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/creator/courses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
            <p className="text-gray-600 mt-1">Share your knowledge with the world</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Course Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div>
                  <Label htmlFor="title" className="text-lg font-semibold text-gray-700">Course Title *</Label>
                  <Input
                    id="title"
                    value={course.title}
                    onChange={(e) => setCourse(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Master React Development in 30 Days"
                    className="mt-2 text-lg p-3"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-lg font-semibold text-gray-700">Description *</Label>
                  <Textarea
                    id="description"
                    value={course.description}
                    onChange={(e) => setCourse(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what students will learn and achieve in this course..."
                    rows={4}
                    className="mt-2 text-base p-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Price (USD) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={course.price}
                      onChange={(e) => setCourse(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      placeholder="99.99"
                      className="mt-2 text-lg p-3"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-lg font-semibold text-gray-700">Publication Status</Label>
                    <Select value={course.status} onValueChange={(value: 'draft' | 'published') => setCourse(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger className="mt-2 text-lg p-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft (Private)</SelectItem>
                        <SelectItem value="published">Published (Public)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lessons Section */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Course Lessons
                  </CardTitle>
                  <Button
                    type="button"
                    onClick={addLesson}
                    variant="secondary"
                    size="sm"
                    className="bg-white text-green-600 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {course.lessons.length === 0 ? (
                  <div className="text-center py-12">
                    <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No lessons added yet</p>
                    <p className="text-gray-400">Click "Add Lesson" to get started</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {course.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="border-2 border-gray-100 rounded-lg p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-semibold text-gray-800">Lesson {index + 1}</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeLesson(index)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <Input
                            value={lesson.title}
                            onChange={(e) => updateLesson(index, 'title', e.target.value)}
                            placeholder="Lesson title"
                            className="text-base"
                          />
                          <Textarea
                            value={lesson.description}
                            onChange={(e) => updateLesson(index, 'description', e.target.value)}
                            placeholder="Lesson description"
                            rows={2}
                            className="text-base"
                          />
                          <Input
                            value={lesson.videoUrl}
                            onChange={(e) => updateLesson(index, 'videoUrl', e.target.value)}
                            placeholder="Video URL (YouTube embed link)"
                            className="text-base"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Section */}
            <div className="flex gap-4 justify-center pt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !course.title || !course.description}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
              >
                {isSubmitting ? 'Creating Course...' : 'Create Course'}
              </Button>
              <Link href="/creator/courses">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
