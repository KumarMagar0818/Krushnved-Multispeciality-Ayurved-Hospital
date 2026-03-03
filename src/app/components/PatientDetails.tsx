import { Patient } from "./PatientList";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Stethoscope,
  IndianRupee,
  X,
} from "lucide-react";
import { format } from "date-fns";

interface PatientDetailsProps {
  patient: Patient;
  onClose: () => void;
  onEdit: () => void;
}

export function PatientDetails({
  patient,
  onClose,
  onEdit,
}: PatientDetailsProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Patient Details</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl mb-1">{patient.name}</h3>
            <div className="flex gap-2">
              <Badge variant="outline">
                {patient.age} years / {patient.gender}
              </Badge>
              <Badge variant="secondary">ID: {patient.id}</Badge>
            </div>
          </div>
          <Button onClick={onEdit}>Edit Patient</Button>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{patient.phone}</span>
              </div>
              {patient.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.email}</span>
                </div>
              )}
              {patient.address && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{patient.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Visit Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="text-muted-foreground">Last Visit: </span>
                  <span>{format(new Date(patient.visitDate), "PPP")}</span>
                </div>
              </div>
              {patient.nextVisit && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Next Visit: </span>
                    <span>{format(new Date(patient.nextVisit), "PPP")}</span>
                  </div>
                </div>
              )}
              {patient.fees && (
                <div className="flex items-center gap-2 text-sm">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Fees: </span>
                    <span>₹{patient.fees}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Chief Complaint
          </h4>
          <p className="text-sm bg-muted p-3 rounded-md">{patient.complaint}</p>
        </div>

        {patient.treatment && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Treatment & Prescription
              </h4>
              <p className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
                {patient.treatment}
              </p>
            </div>
          </>
        )}

        <Separator />

        <div className="bg-primary/5 p-4 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL, Dharashiv
            <br />
            Dr. Kiran Magar (BMS, MD)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
