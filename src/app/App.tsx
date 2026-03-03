import { useState, useEffect } from "react";
import { PatientRegistration } from "./components/PatientRegistration";
import { PatientList, Patient } from "./components/PatientList";
import { PatientDetails } from "./components/PatientDetails";
import { WhatsAppReminder } from "./components/WhatsAppReminder";
import { RescheduleDialog } from "./components/RescheduleDialog";
import { Dashboard } from "./components/Dashboard";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Stethoscope,
  Menu,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";

// Default patients for initialization
const getDefaultPatients = (): Patient[] => [
  {
    id: "P001",
    name: "Rajesh Patil",
    age: "45",
    gender: "male",
    phone: "+91 9876543210",
    email: "rajesh.patil@example.com",
    address: "Shivaji Nagar, Dharashiv",
    complaint: "Joint pain and stiffness in knees",
    visitDate: new Date("2026-01-03"),
    nextVisit: new Date("2026-01-08"),
    treatment:
      "Ayurvedic oil massage (Abhyanga)\nMaharasnadi Kwath - 20ml twice daily\nYogaraj Guggulu - 2 tablets after meals\nCastor oil for local application",
    fees: "500",
  },
  {
    id: "P002",
    name: "Sunita Deshmukh",
    age: "38",
    gender: "female",
    phone: "+91 9123456789",
    email: "",
    address: "Gandhi Chowk, Dharashiv",
    complaint: "Digestive issues and acidity",
    visitDate: new Date("2026-01-04"),
    nextVisit: new Date("2026-01-10"),
    treatment:
      "Avipattikar Churna - 1 tsp with warm water before meals\nKamadudha Ras - 1 tablet twice daily\nDiet recommendations: Avoid spicy and oily foods",
    fees: "400",
  },
  {
    id: "P003",
    name: "Prakash Jadhav",
    age: "52",
    gender: "male",
    phone: "+91 9988776655",
    email: "prakash.j@example.com",
    address: "Station Road, Dharashiv",
    complaint: "Chronic back pain and fatigue",
    visitDate: new Date("2026-01-05"),
    nextVisit: new Date("2026-01-06"),
    treatment:
      "Kati Basti therapy\nDashmoolarishta - 20ml with water after meals\nTriphala Churna - 1 tsp at bedtime\nYoga and stretching exercises recommended",
    fees: "600",
  },
  {
    id: "P004",
    name: "Kavita Shinde",
    age: "29",
    gender: "female",
    phone: "+91 9834567890",
    email: "kavita.shinde@example.com",
    address: "Nagar Road, Dharashiv",
    complaint: "Stress and sleep disorders",
    visitDate: new Date("2026-01-02"),
    nextVisit: new Date("2026-01-07"),
    treatment:
      "Brahmi Vati - 2 tablets at bedtime\nAshwagandha Churna - 1 tsp with milk\nMeditation and pranayama practice\nJatamansi oil for head massage",
    fees: "450",
  },
];

function App() {
  // Load patients from localStorage on initial render
  const [patients, setPatients] = useState<Patient[]>(() => {
    const savedPatients = localStorage.getItem('hospital-patients');
    if (savedPatients) {
      try {
        const parsed = JSON.parse(savedPatients);
        // Convert date strings back to Date objects
        return parsed.map((p: any) => ({
          ...p,
          visitDate: new Date(p.visitDate),
          nextVisit: p.nextVisit ? new Date(p.nextVisit) : undefined,
        }));
      } catch (error) {
        console.error('Error loading patients:', error);
        return getDefaultPatients();
      }
    }
    return getDefaultPatients();
  });

  // Save patients to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hospital-patients', JSON.stringify(patients));
  }, [patients]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details">("list");
  const [reminderPatient, setReminderPatient] = useState<Patient | null>(null);
  const [reschedulePatient, setReschedulePatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to reset data (for development/testing)
  const handleResetData = () => {
    if (confirm("Are you sure you want to reset all patient data? This cannot be undone.")) {
      localStorage.removeItem('hospital-patients');
      setPatients(getDefaultPatients());
      toast.success("Data reset successfully!", {
        description: "All patient data has been reset to default.",
      });
      setActiveTab("dashboard");
    }
  };

  const handleAddPatient = (patientData: any) => {
    const newPatient: Patient = {
      ...patientData,
      id: `P${String(patients.length + 1).padStart(3, "0")}`,
    };
    setPatients([...patients, newPatient]);
    toast.success("Patient registered successfully!", {
      description: `${newPatient.name} has been added to the system.`,
    });
    setActiveTab("patients");
  };

  const handleUpdatePatient = (patientData: any) => {
    setPatients(
      patients.map((p) =>
        p.id === editingPatient?.id ? { ...patientData, id: p.id } : p
      )
    );
    toast.success("Patient updated successfully!", {
      description: `${patientData.name}'s information has been updated.`,
    });
    setEditingPatient(null);
    setActiveTab("patients");
  };

  const handleViewPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setViewMode("details");
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setActiveTab("register");
  };

  const handleSendReminder = (patient: Patient) => {
    setReminderPatient(patient);
  };

  const handleReschedule = (patient: Patient) => {
    setReschedulePatient(patient);
  };

  const handleCloseDetails = () => {
    setSelectedPatient(null);
    setViewMode("list");
  };

  const handleMarkCompleted = (patientId: string) => {
    setPatients(
      patients.map((p) =>
        p.id === patientId ? { ...p, nextVisit: undefined } : p
      )
    );
    const patient = patients.find((p) => p.id === patientId);
    toast.success("Appointment marked as completed!", {
      description: `${patient?.name}'s appointment has been marked as completed.`,
    });
  };

  const handleConfirmReschedule = (patientId: string, newDate: Date) => {
    setPatients(
      patients.map((p) =>
        p.id === patientId ? { ...p, nextVisit: newDate } : p
      )
    );
    const patient = patients.find((p) => p.id === patientId);
    toast.success("Appointment rescheduled!", {
      description: `${patient?.name}'s appointment has been rescheduled.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Toaster />

      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL
                </h1>
                <p className="text-sm text-gray-600">
                  Dr. Kiran Magar (BMS, MD) - Dharashiv
                </p>
              </div>
            </div>

            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col gap-2 mt-8">
                  <Button
                    variant={activeTab === "dashboard" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => {
                      setActiveTab("dashboard");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant={activeTab === "register" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => {
                      setActiveTab("register");
                      setEditingPatient(null);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    New Patient
                  </Button>
                  <Button
                    variant={activeTab === "patients" ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => {
                      setActiveTab("patients");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    All Patients
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="hidden lg:grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              {editingPatient ? "Edit Patient" : "New Patient"}
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              All Patients
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard
              patients={patients}
              onMarkCompleted={handleMarkCompleted}
              onReschedule={handleReschedule}
              onSendReminder={handleSendReminder}
            />
          </TabsContent>

          <TabsContent value="register">
            <PatientRegistration
              onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
              initialData={editingPatient || undefined}
              isEdit={!!editingPatient}
            />
          </TabsContent>

          <TabsContent value="patients">
            {viewMode === "list" ? (
              <PatientList
                patients={patients}
                onEdit={handleEditPatient}
                onView={handleViewPatient}
                onSendReminder={handleSendReminder}
                onReschedule={handleReschedule}
                onMarkCompleted={handleMarkCompleted}
              />
            ) : (
              selectedPatient && (
                <PatientDetails
                  patient={selectedPatient}
                  onClose={handleCloseDetails}
                  onEdit={() => handleEditPatient(selectedPatient)}
                />
              )
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* WhatsApp Reminder Dialog */}
      <WhatsAppReminder
        patient={reminderPatient}
        isOpen={!!reminderPatient}
        onClose={() => setReminderPatient(null)}
      />

      {/* Reschedule Dialog */}
      <RescheduleDialog
        patient={reschedulePatient}
        isOpen={!!reschedulePatient}
        onClose={() => setReschedulePatient(null)}
        onConfirm={handleConfirmReschedule}
      />

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © 2026 KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL, Dharashiv. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;