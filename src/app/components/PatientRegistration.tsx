import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface PatientFormData {
  id?: string;
  name: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  complaint: string;
  visitDate: Date | undefined;
  nextVisit: Date | undefined;
  treatment: string;
  fees: string;
}

interface PatientRegistrationProps {
  onSubmit: (patient: PatientFormData) => void;
  initialData?: PatientFormData;
  isEdit?: boolean;
}

export function PatientRegistration({
  onSubmit,
  initialData,
  isEdit = false,
}: PatientRegistrationProps) {
  const [formData, setFormData] = useState<PatientFormData>(
    initialData || {
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      complaint: "",
      visitDate: new Date(),
      nextVisit: undefined,
      treatment: "",
      fees: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof PatientFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEdit ? "Edit Patient Information" : "New Patient Registration"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                placeholder="Enter patient name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                required
                placeholder="Enter age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleChange("gender", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="patient@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Visit Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.visitDate
                      ? format(formData.visitDate, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.visitDate}
                    onSelect={(date) => handleChange("visitDate", date)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Next Visit Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.nextVisit
                      ? format(formData.nextVisit, "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.nextVisit}
                    onSelect={(date) => handleChange("nextVisit", date)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fees">Consultation Fees</Label>
              <Input
                id="fees"
                type="number"
                value={formData.fees}
                onChange={(e) => handleChange("fees", e.target.value)}
                placeholder="₹"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter patient address"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="complaint">Chief Complaint *</Label>
            <Textarea
              id="complaint"
              value={formData.complaint}
              onChange={(e) => handleChange("complaint", e.target.value)}
              required
              placeholder="Describe the main complaint"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="treatment">Treatment/Prescription</Label>
            <Textarea
              id="treatment"
              value={formData.treatment}
              onChange={(e) => handleChange("treatment", e.target.value)}
              placeholder="Enter treatment details and prescription"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full">
            {isEdit ? "Update Patient" : "Register Patient"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
