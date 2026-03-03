import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Search,
  Edit,
  Eye,
  MessageCircle,
  Calendar,
  Phone,
  Check,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { format } from "date-fns";

export interface Patient {
  id: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  complaint: string;
  visitDate: Date;
  nextVisit?: Date;
  treatment: string;
  fees: string;
  status?: "completed" | "pending" | "scheduled";
}

interface PatientListProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onView: (patient: Patient) => void;
  onSendReminder: (patient: Patient) => void;
  onReschedule?: (patient: Patient) => void;
  onMarkCompleted?: (patientId: string) => void;
}

export function PatientList({
  patients,
  onEdit,
  onView,
  onSendReminder,
  onReschedule,
  onMarkCompleted,
}: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  const getStatusBadge = (patient: Patient) => {
    if (!patient.nextVisit) {
      return <Badge variant="secondary">Completed</Badge>;
    }
    const today = new Date();
    const nextVisit = new Date(patient.nextVisit);
    if (nextVisit < today) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else if (
      nextVisit.toDateString() === today.toDateString() ||
      (nextVisit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 3
    ) {
      return <Badge variant="default">Upcoming</Badge>;
    }
    return <Badge variant="outline">Scheduled</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Records</CardTitle>
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Next Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>
                      {patient.age} / {patient.gender}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(patient.visitDate), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      {patient.nextVisit ? (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(patient.nextVisit), "dd MMM yyyy")}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(patient)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onView(patient)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(patient)}
                          title="Edit Patient"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {patient.nextVisit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSendReminder(patient)}
                            title="Send WhatsApp Reminder"
                            className="text-green-600 hover:text-green-700"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {onReschedule && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onReschedule(patient)}
                            title="Reschedule Visit"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                        )}
                        {onMarkCompleted && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onMarkCompleted(patient.id)}
                            title="Mark as Completed"
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}