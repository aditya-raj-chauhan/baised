import {
  Clock,
  FileText,
  CreditCard,
  Share2,
  Shield,
  ArrowUpCircle,
  LayoutDashboard,
  Upload,
  Files,
  Receipt
} from "lucide-react";

export const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Full Stack Developer",
    company: "TechNova Solutions",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    quote:
      "Biased makes file sharing structured and secure. Role-based access is exactly what our team needed.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer",
    company: "PixelCraft Studio",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    quote:
      "I love how controlled the access system is. Clean interface and very reliable.",
    rating: 4
  },
 
  {
    name: "Sneha Iyer",
    role: "Project Manager",
    company: "AgileWorks",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    quote:
      "File tracking and access control are extremely helpful for managing team submissions.",
    rating: 4
  }
];

export const pricingPlans = [
  {
    name: "Basic",
    price: "0",
    description: "For individuals getting started",
    features: [
      "10 file uploads",
      "Basic file sharing",
      "7-day file retention",
      "Standard email support"
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Standard",
    price: "199",
    description: "Perfect for small teams",
    features: [
      "100 file uploads",
      "Secure link sharing",
      "15-day file retention",
      "Email support",
      "Download tracking"
    ],
    cta: "Choose Standard",
    highlighted: false
  },
  {
    name: "Premium",
    price: "500",
    description: "For individuals with larger needs",
    features: [
      "500 file uploads",
      "Advanced file sharing",
      "30-day file retention",
      "Priority email support",
      "File analytics"
    ],
    cta: "Go Premium",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "999",
    description: "For organizations requiring full control",
    features: [
      "Unlimited uploads",
      "Role-based access control",
      "90-day file retention",
      "Dedicated support",
      "Advanced analytics",
      "Audit logs"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

export const features = [
  {
    icon: Clock,
    iconColor: "#a855f7",
    title: "Timed File Expiry",
    description:
      "Set expiration dates for shared files to maintain control over access duration."
  },
  {
    icon: FileText,
    iconColor: "#7c3aed",
    title: "Secure File Storage",
    description:
      "Upload and manage files securely with structured storage and metadata tracking."
  },
  {
    icon: CreditCard,
    iconColor: "#9333ea",
    title: "Flexible Plans",
    description:
      "Choose from multiple pricing tiers designed for individuals, teams, and enterprises."
  },
  {
    icon: Share2,
    iconColor: "#8b5cf6",
    title: "Advanced Sharing",
    description:
      "Generate secure shareable links with permission-based access control."
  },
  {
    icon: Shield,
    iconColor: "#6d28d9",
    title: "Role-Based Security",
    description:
      "Access is granted based on user roles ensuring proper authorization."
  },
  {
    icon: ArrowUpCircle,
    iconColor: "#c084fc",
    title: "Fast Uploads",
    description:
      "Experience optimized and reliable file uploads with real-time progress tracking."
  }
];
export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    id: "03",
    label: "My Files",
    icon: Files,
    path: "/my-files",
  },
  {
    id: "04",
    label: "Subscription",
    icon: CreditCard,
    path: "/subscription",
  },
  {
    id: "05",
    label: "Transactions",
    icon: Receipt,
    path: "/transactions",
  }
];
