"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Job = {
  id: number;
  company: string;
  role: string;
  status: string;
  appliedDate: string;
  notes?: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "APPLIED",
    appliedDate: "",
    notes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    const newJob: Job = {
      id: Date.now(),
      ...form,
    };

    setJobs([...jobs, newJob]);
    setOpen(false);

    setForm({
      company: "",
      role: "",
      status: "APPLIED",
      appliedDate: "",
      notes: "",
    });
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Jobs</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Job</Button>
          </DialogTrigger>

          <DialogContent className="bg-zinc-900 text-white border border-zinc-800">
            <DialogHeader>
              <DialogTitle>Add New Job</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Company</Label>
                <Input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <Label>Role</Label>
                <Input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm({ ...form, status: value })
                  }
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="APPLIED">Applied</SelectItem>
                    <SelectItem value="INTERVIEW">Interview</SelectItem>
                    <SelectItem value="OFFER">Offer</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Applied Date</Label>
                <Input
                  type="date"
                  name="appliedDate"
                  value={form.appliedDate}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>

              <Button className="w-full" onClick={handleSubmit}>
                Save Job
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* JOB LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {jobs.length === 0 && (
          <p className="text-zinc-400">No jobs added yet.</p>
        )}

        {jobs.map((job) => (
          <Card
            key={job.id}
            className="bg-zinc-800 border border-zinc-700 text-white"
          >
            <CardHeader>
              <CardTitle>{job.role}</CardTitle>
              <p className="text-sm text-zinc-400">{job.company}</p>
            </CardHeader>

            <CardContent className="space-y-2">
              <p>
                <span className="text-zinc-400">Status:</span> {job.status}
              </p>
              <p>
                <span className="text-zinc-400">Applied:</span>{" "}
                {job.appliedDate}
              </p>
              {job.notes && (
                <p className="text-sm text-zinc-300">{job.notes}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
