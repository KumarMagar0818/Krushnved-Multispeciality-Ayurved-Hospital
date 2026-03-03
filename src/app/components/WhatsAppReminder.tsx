import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Patient } from "./PatientList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface WhatsAppReminderProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppReminder({
  patient,
  isOpen,
  onClose,
}: WhatsAppReminderProps) {
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const generateDefaultMessage = () => {
    if (!patient || !patient.nextVisit) return "";

    const nextVisitDate = format(new Date(patient.nextVisit), "dd MMMM yyyy");
    const nextVisitTime = "10:00 AM"; // You can make this dynamic

    return `नमस्कार ${patient.name},

आपली पुढील भेट ${nextVisitDate} रोजी ${nextVisitTime} वाजता निश्चित केली आहे.

कृष्णवेद मल्टीस्पेशॅलिटी आयुर्वेद हॉस्पिटल, धाराशिव
डॉ. किरण मागर (BMS, MD)

कृपया वेळेवर उपस्थित राहा.

Hello ${patient.name},

Your next appointment is scheduled for ${nextVisitDate} at ${nextVisitTime}.

KRUSHNVED MULTISPECIALITY AYURVED HOSPITAL, Dharashiv
Dr. Kiran Magar (BMS, MD)

Please be present on time.

धन्यवाद / Thank You`;
  };

  const handleSend = async () => {
    setIsSending(true);

    // Simulate sending WhatsApp message
    // In production, this would integrate with WhatsApp Business API or similar service
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSent(true);
    setIsSending(false);

    toast.success("WhatsApp reminder sent successfully!", {
      description: `Reminder sent to ${patient?.name} at ${patient?.phone}`,
    });

    setTimeout(() => {
      setSent(false);
      onClose();
      setCustomMessage("");
    }, 2000);
  };

  const message = customMessage || generateDefaultMessage();

  if (!patient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Send WhatsApp Reminder
          </DialogTitle>
          <DialogDescription>
            Send appointment reminder to {patient.name} ({patient.phone})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Patient Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span>{patient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{patient.phone}</span>
              </div>
              {patient.nextVisit && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Visit:</span>
                  <span>{format(new Date(patient.nextVisit), "PPP")}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message Preview</label>
            <Textarea
              value={message}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={12}
              placeholder="Message will be auto-generated..."
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Edit the message above to customize it before sending
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSend}
              disabled={isSending || sent}
              className="flex-1"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Sent Successfully
                </>
              ) : isSending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send WhatsApp Message
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={isSending}>
              Cancel
            </Button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> To send actual WhatsApp messages, you need
              to integrate with WhatsApp Business API or a service like Twilio.
              This is a demo interface showing the message preview and flow.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
