# Synodic Synergy - Education Management System

A comprehensive, self-hostable education management system built with Nuxt 3, TypeScript, and Tailwind CSS. Provides separate interfaces for students (Learn), staff (Teach), and administrators with role-based access control.

## 🚀 Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure token rotation
- **Role-based access control** (Admin, Staff, Student)
- **HTTP-only cookies** for secure token storage
- **Rate limiting** and brute force protection
- **Password strength validation** with bcrypt hashing
- **Session management** with automatic cleanup

### 👨‍🎓 Student Features (Learn)
- **Course Dashboard** - View enrolled courses and progress
- **Course Catalog** - Browse and enroll in available courses
- **Assessment Center** - Submit assignments and take quizzes
- **Progress Tracking** - Monitor learning progress and grades
- **Notice Board** - View announcements and updates
- **Timetable** - View class schedules and upcoming sessions

### 👨‍🏫 Staff Features (Teach)
- **Course Management** - Create and manage courses
- **Assessment Tools** - Create quizzes, assignments, and exams
- **Student Management** - View enrolled students and their progress
- **Attendance Tracking** - Mark and monitor student attendance
- **Grading System** - Grade submissions and provide feedback
- **Notice Publishing** - Create and publish announcements

### 👨‍💼 Admin Features
- **User Management** - Create and manage all user accounts
- **System Overview** - Monitor system health and statistics
- **Course Administration** - Oversee all courses and content
- **Role Management** - Assign and modify user roles
- **System Settings** - Configure system-wide settings
- **Reports & Analytics** - Generate comprehensive reports

### 📚 Course Management
- **Rich Content Support** - Markdown content with file attachments
- **Resource Library** - Upload and organize course materials
- **Schedule Management** - Set class times and locations
- **Enrollment Control** - Manage student enrollment limits
- **Progress Tracking** - Monitor student engagement and completion

### 📝 Assessment System
- **Multiple Question Types** - Multiple choice, essay, file upload
- **Automatic Grading** - For objective questions
- **Manual Review** - For subjective assessments
- **Late Submission Handling** - Configurable penalties
- **Grade Analytics** - Performance tracking and statistics

### 📢 Communication
- **Notice System** - Targeted announcements by role
- **Read Receipts** - Track notice engagement
- **Priority Levels** - Urgent, high, medium, low priority notices
- **Attachment Support** - Include files with notices

### 📊 Attendance Management
- **Real-time Tracking** - Mark attendance during sessions
- **Multiple Status Types** - Present, absent, late, excused, tardy
- **Automated Reports** - Generate attendance statistics
- **Configurable Settings** - Late thresholds and auto-marking

## 🛠 Technology Stack

### Frontend
- **Nuxt 3** - Vue.js framework with SSR
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management
- **GSAP** - Advanced animations
- **AOS** - Scroll animations
- **VueUse Motion** - Motion utilities

### Backend
- **Nuxt 3 API Routes** - Server-side API endpoints
- **H3** - HTTP framework
- **Node.js** - JavaScript runtime
- **Jose** - JWT library for authentication
- **Bcrypt** - Password hashing
- **Crypto** - Cryptographic utilities

### Data Storage
- **Encrypted JSON Files** - Custom encrypted storage system
- **Custom Store Utility** - Type-safe data persistence
- **UUID Generation** - Unique identifier system

## 📁 Project Structure

```
synodic-server/
├── assets/                 # Static assets
├── components/            # Vue components
│   ├── auth/             # Authentication components
│   └── ...               # Other component categories
├── composables/          # Vue composables
├── layouts/              # Page layouts
├── middleware/           # Client and server middleware
├── pages/                # Vue pages with file-based routing
│   ├── admin/           # Admin interface pages
│   ├── learn/           # Student interface pages
│   └── teach/           # Staff interface pages
├── plugins/              # Nuxt plugins
├── public/               # Public static files
├── scripts/              # Build and utility scripts
├── server/               # Server-side code
│   ├── api/             # API routes
│   ├── middleware/      # Server middleware
│   └── utils/           # Server utilities
├── stores/               # Pinia stores
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   └── stores/          # Data storage utilities
└── nuxt.config.ts        # Nuxt configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd synodic-server
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-here
   DATA_ENCRYPTION_KEY=your-32-character-encryption-key
   NODE_ENV=development
   ```

4. **Initialize the system**
   ```bash
   yarn dev
   ```

5. **Create the first admin user**
   Visit `/api/auth/register-admin` to create the initial administrator account.

### Default Access
- **Admin Interface**: `/admin`
- **Staff Interface**: `/teach`
- **Student Interface**: `/learn`
- **Login Page**: `/login`

## 🔧 Configuration

### Environment Variables
- `JWT_SECRET` - Secret key for JWT token signing
- `DATA_ENCRYPTION_KEY` - 32-character key for data encryption
- `NODE_ENV` - Environment (development/production)

### Security Settings
The system includes configurable security parameters:
- Maximum login attempts
- Lockout duration
- Password requirements
- Session timeout
- Rate limiting

## 📊 Data Models

### User
```typescript
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'staff' | 'student';
  createdAt: Date;
  updatedAt: Date;
}
```

### Course
```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  teacherId: string;
  teacherName: string;
  students: string[];
  studentCount: number;
  resources: CourseResource[];
  schedule: CourseSchedule[];
  status: 'active' | 'inactive' | 'draft';
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  maxStudents: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Assessment
```typescript
interface Assessment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'quiz' | 'assignment' | 'exam' | 'project';
  dueDate: Date;
  maxScore: number;
  weight: number;
  instructions: string;
  attachments: AssessmentAttachment[];
  status: 'draft' | 'published' | 'closed';
  allowLateSubmission: boolean;
  latePenalty: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔐 Security Features

### Authentication Flow
1. **Login** - User provides credentials
2. **Validation** - Server validates credentials and checks rate limits
3. **Token Generation** - JWT access and refresh tokens created
4. **Session Creation** - Server-side session record created
5. **Cookie Setting** - HTTP-only cookies set for token storage
6. **Access Control** - Middleware validates tokens on protected routes

### Security Measures
- **Password Hashing** - Bcrypt with salt rounds
- **Token Rotation** - Automatic refresh token rotation
- **Rate Limiting** - Per-IP and per-account limits
- **Session Management** - Automatic cleanup of expired sessions
- **Input Validation** - Comprehensive validation on all inputs
- **CORS Protection** - Proper CORS configuration
- **XSS Prevention** - Content Security Policy headers

## 🎨 UI/UX Features

### Design System
- **Dark Mode Support** - Complete dark theme implementation
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components
- **Animations** - Smooth transitions and micro-interactions
- **Loading States** - Comprehensive loading indicators

### Navigation
- **Role-based Menus** - Different navigation for each role
- **Breadcrumbs** - Clear navigation hierarchy
- **Search Functionality** - Global and context-specific search
- **Quick Actions** - Frequently used actions easily accessible

## 📈 Performance

### Optimization Features
- **Code Splitting** - Automatic route-based code splitting
- **Lazy Loading** - Images and components loaded on demand
- **Caching** - Strategic caching of static assets
- **Bundle Optimization** - Tree shaking and minification
- **Server-side Rendering** - Improved SEO and initial load times

## 🔧 Development

### Code Quality
- **TypeScript** - Full type safety
- **ESLint** - Code linting and formatting
- **Prettier** - Consistent code formatting
- **Git Hooks** - Pre-commit validation

### Testing Strategy
- **Unit Tests** - Component and utility testing
- **Integration Tests** - API endpoint testing
- **E2E Tests** - Full user flow testing

## 🚀 Deployment

### Production Build
```bash
yarn build
yarn start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Setup
1. Set production environment variables
2. Configure reverse proxy (nginx)
3. Set up SSL certificates
4. Configure database backups
5. Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔮 Roadmap

### Planned Features
- **Real-time Chat** - Student-teacher communication
- **Video Conferencing** - Integrated virtual classrooms
- **Mobile App** - Native mobile applications
- **Advanced Analytics** - Learning analytics and insights
- **API Integration** - Third-party service integrations
- **Multi-language Support** - Internationalization
- **Advanced Assessment Types** - Interactive assessments
- **Gamification** - Points, badges, and leaderboards

---

**Synodic Synergy** - Empowering education through technology. 