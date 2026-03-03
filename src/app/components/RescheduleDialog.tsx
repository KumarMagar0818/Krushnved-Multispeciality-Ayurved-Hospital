import { useState } from "react";
import { Patient } from "./PatientList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface RescheduleDialogProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (patientId: string, newDate: Date) => void;
}

export function RescheduleDialog({
  patient,
  isOpen,
  onClose,
  onConfirm,
}: RescheduleDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    patient?.nextVisit ? new Date(patient.nextVisit) : undefined
  );

  const handleConfirm = () => {
    if (patient && selectedDate) {
      onConfirm(patient.id, selectedDate);
      onClose();
    }
  };

  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogDescription>
            Select a new date for {patient.name}'s appointment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-md space-y-1">
            <p className="text-sm font-medium">Patient: {patient.name}</p>
            <p className="text-sm text-muted-foreground">
              Phone: {patient.phone}
            </p>
            <p className="text-sm text-muted-foreground">
              Last Visit:{" "}
              {patient.visitDate && format(new Date(patient.visitDate), "dd MMMM yyyy")}
            </p>
            {patient.nextVisit && (
              <p className="text-sm text-red-600">
                Current Next Visit:{" "}
                {format(new Date(patient.nextVisit), "dd MMMM yyyy")}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          {selectedDate && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-md">
              <p className="text-sm text-green-800">
                <strong>New Appointment Date:</strong>{" "}
                {format(selectedDate, "PPPP")}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedDate}>
            Confirm Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}