import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Patient } from "./PatientList";
import { Button } from "./ui/button";
import {
  Users,
  Calendar,
  AlertCircle,
  TrendingUp,
  IndianRupee,
  MessageCircle,
  CheckCircle,
  CalendarClock,
} from "lucide-react";
import { format, isToday, isTomorrow, addDays } from "date-fns";

interface DashboardProps {
  patients: Patient[];
  onMarkCompleted?: (patientId: string) => void;
  onReschedule?: (patient: Patient) => void;
  onSendReminder?: (patient: Patient) => void;
}

export function Dashboard({ patients, onMarkCompleted, onReschedule, onSendReminder }: DashboardProps) {
  const totalPatients = patients.length;

  const upcomingAppointments = patients.filter((p) => {
    if (!p.nextVisit) return false;
    const nextVisit = new Date(p.nextVisit);
    const today = new Date();
    const threeDaysLater = addDays(today, 3);
    return nextVisit >= today && nextVisit <= threeDaysLater;
  });

  const todayAppointments = patients.filter((p) => {
    // If patient has a nextVisit, only check that (ignore visitDate)
    if (p.nextVisit) {
      return isToday(new Date(p.nextVisit));
    }
    // If no nextVisit scheduled, check if first visit is today
    return p.visitDate && isToday(new Date(p.visitDate));
  });

  const tomorrowAppointments = patients.filter(
    (p) => p.nextVisit && isTomorrow(new Date(p.nextVisit))
  );

  const overdueAppointments = patients.filter((p) => {
    if (!p.nextVisit) return false;
    return new Date(p.nextVisit) < new Date();
  });

  const totalRevenue = patients.reduce(
    (sum, p) => sum + (parseFloat(p.fees) || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalPatients}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered patients
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Scheduled for today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Upcoming (3 Days)</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Next 3 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{overdueAppointments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Need follow-up
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {todayAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No appointments scheduled for today
              </p>
            ) : (
              <div className="space-y-3">
                {todayAppointments.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{patient.age} yrs</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.gender}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tomorrow's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {tomorrowAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No appointments scheduled for tomorrow
              </p>
            ) : (
              <div className="space-y-3">
                {tomorrowAppointments.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{patient.age} yrs</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.gender}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {overdueAppointments.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">
              Overdue Appointments - Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueAppointments.slice(0, 5).map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg border border-red-200"
                >
                  <div className="flex-1">
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.phone}
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      {patient.nextVisit
                        ? format(new Date(patient.nextVisit), "dd MMM yyyy")
                        : ""}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:text-green-700 border-green-300"
                      onClick={() => onMarkCompleted?.(patient.id)}
                      title="Mark as Completed"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 hover:text-blue-700 border-blue-300"
                      onClick={() => onReschedule?.(patient)}
                      title="Reschedule Appointment"
                    >
                      <CalendarClock className="h-4 w-4 mr-1" />
                      Reschedule
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-orange-600 hover:text-orange-700 border-orange-300"
                      onClick={() => onSendReminder?.(patient)}
                      title="Send WhatsApp Reminder"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Remind
                    </Button>
                  </div>
                </div>
              ))}
              {overdueAppointments.length > 5 && (
                <p className="text-sm text-center text-muted-foreground">
                  +{overdueAppointments.length - 5} more overdue appointments
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}