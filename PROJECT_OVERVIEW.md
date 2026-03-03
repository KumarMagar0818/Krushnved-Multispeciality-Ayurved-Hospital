# KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL - Patient Management System

## Project Overview

A complete patient visit management system built for KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL in Dharashiv, run by Dr. Kiran Magar (BMS, MD). The system handles patient registration, visit tracking, revisit scheduling, and WhatsApp reminder functionality for appointment follow-ups.

## Features

### 1. Dashboard
- **Overview Statistics**
  - Total Patients count
  - Today's Appointments
  - Upcoming Appointments (next 3 days)
  - Overdue Appointments requiring follow-up
  
- **Appointment Management**
  - Today's appointments list
  - Tomorrow's appointments list
  - Overdue appointments with action buttons:
    - Mark as Completed
    - Reschedule Appointment
    - Send WhatsApp Reminder

### 2. Patient Registration
- **Personal Information**
  - Full Name
  - Age
  - Gender (Male/Female/Other)
  - Phone Number (with +91 prefix)
  - Email Address (optional)
  - Full Address
  
- **Medical Information**
  - Chief Complaint/Symptoms
  - Visit Date
  - Next Visit Date (optional)
  - Treatment Details
  - Consultation Fees

- **Edit Functionality**
  - Edit existing patient records
  - Pre-filled forms for editing

### 3. Patient List
- **Search & Filter**
  - Search by name or phone number
  - Real-time filtering
  
- **Patient Table Columns**
  - Patient Name
  - Age/Gender
  - Phone Number
  - Last Visit Date
  - Next Visit Date
  - Status Badge (Overdue/Upcoming/Completed)
  
- **Quick Actions**
  - View Details (eye icon)
  - Edit Patient (edit icon)
  - Send WhatsApp Reminder (message icon) - only for patients with next visit
  - Reschedule Appointment (calendar icon) - only for patients with next visit
  - Mark as Completed (check icon) - only for patients with next visit

### 4. Patient Details View
- **Comprehensive Patient Profile**
  - Full patient information
  - Contact details
  - Address
  - Last visit date
  - Next visit date
  - Consultation fees
  - Chief complaint
  - Treatment plan
  
- **Actions Available**
  - Edit Patient Information
  - Close/Back to List

### 5. WhatsApp Reminder System
- **Reminder Preview**
  - Shows formatted WhatsApp message
  - Patient details summary
  - Appointment date & time
  - Hospital contact information
  - Copy to clipboard functionality
  
- **Message Template**
  ```
  नमस्ते [Patient Name],
  
  आपकी पुनर्भेट KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL, Dharashiv येथे निश्चित केली आहे.
  
  तारीख: [Next Visit Date]
  
  कृपया वेळेवर येण्याची खात्री करा.
  
  Dr. Kiran Magar (BMS, MD)
  KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL
  Dharashiv
  ```

### 6. Appointment Rescheduling
- **Reschedule Dialog**
  - Shows current appointment details
  - Current next visit date (highlighted in red)
  - Last visit date reference
  - Calendar picker for new date
  - Visual feedback with color coding (new date in green)
  
- **Smart Date Handling**
  - Rescheduled patients automatically removed from today's appointments
  - Clear distinction between last visit and next visit dates
  - Updates appointment status accordingly

## Technical Stack

### Frontend Framework
- **React 18.3.1** with TypeScript
- **Vite 6.3.5** for build tooling

### UI Components
- **Radix UI** for accessible components
  - Dialog, Popover, Select, Calendar, Tabs, etc.
- **Tailwind CSS 4.1.12** for styling
- **Lucide React** for icons
- **Sonner** for toast notifications
- **date-fns** for date manipulation

### Form Handling
- **React Hook Form 7.55.0** for form management

### Additional Libraries
- **class-variance-authority** for component variants
- **clsx** & **tailwind-merge** for className utilities

## Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx           # Main dashboard with stats & appointments
│   │   │   ├── PatientRegistration.tsx # Patient registration/edit form
│   │   │   ├── PatientList.tsx         # Patient list table with search
│   │   │   ├── PatientDetails.tsx      # Detailed patient view
│   │   │   ├── WhatsAppReminder.tsx    # WhatsApp reminder dialog
│   │   │   ├── RescheduleDialog.tsx    # Appointment reschedule dialog
│   │   │   ├── ui/                     # Reusable UI components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── calendar.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── sheet.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   └── ... (other UI components)
│   │   │   └── figma/
│   │   │       └── ImageWithFallback.tsx
│   │   └── App.tsx                     # Main application component
│   └── styles/
│       ├── fonts.css
│       ├── index.css
│       ├── tailwind.css
│       └── theme.css
├── package.json
├── vite.config.ts
└── postcss.config.mjs
```

## Key Data Structure

### Patient Interface
```typescript
interface Patient {
  id: string;                    // Auto-generated (P001, P002, etc.)
  name: string;                  // Patient full name
  age: string;                   // Patient age
  gender: "male" | "female" | "other";
  phone: string;                 // Phone number with +91
  email?: string;                // Optional email
  address?: string;              // Full address
  complaint: string;             // Chief complaint/symptoms
  visitDate: Date;               // Last/first visit date
  nextVisit?: Date;              // Next scheduled visit
  treatment?: string;            // Treatment plan details
  fees: string;                  // Consultation fees
}
```

## Application Flow

1. **Dashboard** - Shows overview and quick actions for appointments
2. **New Patient Registration** - Add new patients to the system
3. **Patient List** - View all patients, search, and perform actions
4. **Patient Details** - View comprehensive patient information
5. **Reschedule** - Update appointment dates for patients
6. **WhatsApp Reminders** - Send appointment reminders via WhatsApp

## Key Features Implementation

### Appointment Status Logic
- **Today**: Next visit is scheduled for today OR first visit is today (with no next visit)
- **Tomorrow**: Next visit is scheduled for tomorrow
- **Upcoming**: Next visit is within the next 3 days
- **Overdue**: Next visit date has passed
- **Completed**: No next visit scheduled

### Rescheduling Logic
- When rescheduling, only the `nextVisit` date is updated
- The original `visitDate` (last visit) remains unchanged
- Patients with rescheduled appointments disappear from "Today's Appointments" unless rescheduled to today
- Clear visual distinction between current and new appointment dates

### Today's Appointments Filter
- Prioritizes `nextVisit` over `visitDate`
- If patient has a `nextVisit`, only that date is checked
- If no `nextVisit`, checks if first visit (`visitDate`) is today

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Dependencies

### Core Dependencies
```json
{
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "date-fns": "3.6.0",
  "lucide-react": "0.487.0",
  "react-hook-form": "7.55.0",
  "sonner": "2.0.3"
}
```

### UI Component Libraries
```json
{
  "@radix-ui/react-dialog": "1.1.6",
  "@radix-ui/react-popover": "1.1.6",
  "@radix-ui/react-select": "2.1.6",
  "@radix-ui/react-tabs": "1.1.3",
  "@radix-ui/react-label": "2.1.2",
  "@radix-ui/react-separator": "1.1.2",
  "react-day-picker": "8.10.1"
}
```

### Styling
```json
{
  "tailwindcss": "4.1.12",
  "@tailwindcss/vite": "4.1.12",
  "class-variance-authority": "0.7.1",
  "tailwind-merge": "3.2.0",
  "clsx": "2.1.1"
}
```

## Responsive Design

- **Mobile-First Approach**
  - Mobile menu (hamburger) for small screens
  - Responsive table layouts
  - Adaptive card grids
  - Touch-friendly button sizes

- **Breakpoints**
  - Mobile: < 768px (stacked layouts, mobile menu)
  - Tablet: 768px - 1024px (2-column grids)
  - Desktop: > 1024px (full tabs, 4-column grids)

## Color Scheme

- **Primary**: Green (representing Ayurveda and nature)
- **Accent**: Blue (trust and professionalism)
- **Status Colors**:
  - Red: Overdue appointments
  - Green: Completed/Success
  - Blue: Upcoming/Info
  - Orange: Warnings/Reminders

## Sample Data

The application comes pre-loaded with 4 sample patients demonstrating various scenarios:
1. Rajesh Patil - Joint pain treatment
2. Sunita Deshmukh - Digestive issues
3. Prakash Jadhav - Chronic back pain
4. Kavita Shinde - Stress and sleep disorders

## Future Enhancement Possibilities

1. **Backend Integration**
   - Database persistence (Supabase/Firebase)
   - User authentication
   - Multi-user access control

2. **Advanced Features**
   - SMS integration
   - Email notifications
   - Prescription generation
   - Billing & invoicing
   - Medical history tracking
   - File/image uploads for reports

3. **Analytics**
   - Revenue tracking
   - Patient visit patterns
   - Treatment effectiveness metrics

4. **WhatsApp API Integration**
   - Direct WhatsApp message sending
   - Template messages
   - Automated reminders

## Notes

- All dates are handled using `date-fns` library
- Toast notifications for user feedback (success/error messages)
- Form validation using React Hook Form
- Accessible UI components from Radix UI
- Currently uses local state (no backend persistence)
- WhatsApp reminders use manual copy-paste workflow

## License

Private/Proprietary - KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL

## Contact

**KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL**  
Dr. Kiran Magar (BMS, MD)  
Dharashiv, Maharashtra

---

**Last Updated**: March 3, 2026
