import CheckoutFormClient from './checkout-form-client';

// Mock course data - needed for generateStaticParams
// In a real app, fetch or import this data
const allCoursesData: any = {
  "1": { id: "1", title: "Introduction to Next.js" /* ... other course props */ },
  "2": { id: "2", title: "Advanced Tailwind CSS" /* ... other course props */ },
  "3": { id: "3", title: "Full-Stack Web Development with MERN" /* ... other course props */ },
  // Add all course IDs that should have a checkout page
};

export async function generateStaticParams() {
  return Object.keys(allCoursesData).map((courseId) => ({
    courseId: courseId,
  }));
}

export default function CheckoutPage() {
  // This page now only handles static generation and renders the client component.
  // The courseId is available to CheckoutFormClient via useParams().
  return <CheckoutFormClient />;
} 