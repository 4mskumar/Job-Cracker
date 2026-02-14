"use client";

import { deleteJob, getJobById, updateJob } from "@/lib/actions/job-actions";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Edit, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  jobId: number;
  onUpdated: (job: any) => void;
};

export default function EditJobDialog({ jobId, onUpdated }: Props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "",
    appliedDate: "",
    notes: "",
  });

  useEffect(() => {
    async function loadJob() {
      const job = await getJobById(jobId);

       if (!job) {
      console.error("Job not found");
      setLoading(false);
      return;
    }

      setForm({
        company: job.company,
        role: job.role,
        status: job.status,
        appliedDate: job.appliedDate.toISOString().split("T")[0],
        notes: job.notes || "",
      });

      setLoading(false);
    }

    loadJob();
  }, [jobId]);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const updatedJob = await updateJob(jobId, form);
      setOpen(false);
      toast.success("Job updated successfully!", {
  position: "top-center",
  className:
    "bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-pink-500/80 text-white backdrop-blur-md border border-white/20 shadow-lg",
});

      onUpdated(updatedJob); // realtime update parent
    } finally {
      setSubmitting(false);
    }
  }
  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteJob(jobId);
      toast.error("Job deleted successfully!", {
  position: "top-center",
  className:
    "bg-gradient-to-r from-red-600 via-rose-500 to-pink-600 text-white border border-red-400/30 shadow-lg",
});

      onUpdated({ deleted: true, id: jobId });
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger>
        <Edit className="hover:text-zinc-300 border-none outline-none cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
        <DialogTitle>Edit your job</DialogTitle>
        <div className="space-y-4">
          <div className="space-y-4">
            <Label>Company</Label>
            <Input
              className="border-zinc-700"
              name="company"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-4">
            <Label>Role</Label>
            <Input
              className="border-zinc-700"
              name="role"
              value={form.role}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-4">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v })}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-zinc-700">
                <SelectItem value="APPLIED">Applied</SelectItem>
                <SelectItem value="INTERVIEW">Interview</SelectItem>
                <SelectItem value="OFFER">Offer</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Applied Date</Label>
            <Input
              className="border-zinc-700"
              type="date"
              name="appliedDate"
              value={form.appliedDate}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-4">
            <Label>Notes</Label>
            <Textarea
              className="border-zinc-700"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <Button
          disabled={submitting || deleting}
            className="w-full cursor-pointer"
            variant={"secondary"}
            onClick={handleSubmit}
          >
            {submitting ? (
              <LoaderCircleIcon className="animate-spin mx-auto" size={18} />
            ) : (
              "Save Changes"
            )}
          </Button>
          <Button
          disabled={submitting || deleting}
            onClick={handleDelete}
            variant={"destructive"}
            className="w-full cursor-pointer"
          >
            {deleting ? (
              <LoaderCircleIcon className="animate-spin mx-auto" size={18} />
            ) : (
              "Delete Job"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
