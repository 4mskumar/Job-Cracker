"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { createJob, fetchAllJobs } from "@/lib/actions/job-actions";
import {
  Edit,
  LoaderCircleIcon,
  MoreHorizontal,
  MoreHorizontalIcon,
  MoreVertical,
} from "lucide-react";
import EditJobDialog from "./EditJobDialog";
import { Skeleton } from "./ui/skeleton";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

const statusColors: any = {
  APPLIED: "bg-blue-500/20 border-blue-800/60 text-blue-500",
  INTERVIEW: "bg-yellow-500/20 border-yellow-800/60 text-yellow-500",
  OFFER: "bg-green-500/20 border-green-800/60 text-green-500",
  REJECTED: "bg-red-500/20 border-red-800/60 text-red-500",
};
const statusBadgeColors: any = {
  APPLIED: "bg-blue-200 border-blue-800/60 text-blue-800",
  INTERVIEW: "bg-yellow-200 border-yellow-800/60 text-yellow-800",
  OFFER: "bg-green-200 border-green-800/60 text-green-800",
  REJECTED: "bg-red-200 border-red-800/60 text-red-800",
};

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
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [section, setSection] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  console.log(searchInput);

  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "",
    appliedDate: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      setSubmitting(true);
      const newJob = await createJob(form);

      setAllJobs((prev) => [newJob, ...prev]);

      if (section === "ALL" || section === newJob.status) {
        setJobs((prev) => [newJob, ...prev]);
      }

      toast.success("New job added", {
        position: "top-center",
      });

      setOpen(false);
      setForm({
        company: "",
        role: "",
        status: "",
        appliedDate: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to add job", {
        position: "top-center",
      });
    } finally {
      setSubmitting(false);
    }
  }

  // useEffect(() => {
  //   async function handleSearch(searchInput: string) {
  //     setLoading(true);
  //     if (searchInput.trim() === "") return setJobs(allJobs);
  //     const filteredJobs = allJobs.filter((job) => {
  //       return (
  //         job.company.toLowerCase().includes(searchInput.toLowerCase()) ||
  //         job.role.toLowerCase().includes(searchInput.toLowerCase())
  //       );
  //     });
  //     console.log(filteredJobs);

  //     setJobs(filteredJobs);
  //   }
  //   setTimeout(() => {
  //     handleSearch(searchInput);
  //     setLoading(false);
  //   }, 1000);

  //   return () => clearTimeout();
  // }, [searchInput, allJobs]);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      let filtered = allJobs;

      // filter by section
      if (section !== "ALL") {
        filtered = filtered.filter((job) => job.status === section);
      }

      // filter by search
      if (searchInput.trim() !== "") {
        filtered = filtered.filter(
          (job) =>
            job.company.toLowerCase().includes(searchInput.toLowerCase()) ||
            job.role.toLowerCase().includes(searchInput.toLowerCase()),
        );
      }

      setJobs(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [section, searchInput, allJobs]);

  useEffect(() => {
    async function loadJobs() {
      const fetchedJobs = await fetchAllJobs();
      setAllJobs(fetchedJobs);
      setJobs(fetchedJobs); // replace, not append
    }

    loadJobs();
  }, []); // only once on mount

  return (
    <div className="min-h-[80vh] px-20 bg-zinc-900 text-white p-6">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Jobs</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="cursor-pointer" variant={"secondary"}>
                Add Job
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-900 text-white border border-zinc-800">
              <DialogHeader>
                <DialogTitle>Add New Job</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-4">
                  <Label>Company</Label>
                  <Input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Role</Label>
                  <Input
                    required
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Status</Label>
                  <Select
                    required
                    value={form.status}
                    onValueChange={(value) =>
                      setForm({ ...form, status: value })
                    }
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 text-zinc-100 border-zinc-700">
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
                    required
                    type="date"
                    name="appliedDate"
                    value={form.appliedDate}
                    onChange={handleChange}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Notes</Label>
                  <Textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>

                <Button
                  className="w-full cursor-pointer"
                  variant={"secondary"}
                  onClick={handleSubmit}
                >
                  {submitting ? (
                    <LoaderCircleIcon
                      className="animate-spin mx-auto"
                      size={18}
                    />
                  ) : (
                    "Add Job"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex space-x-3 my-4">
          <Input
            placeholder="serach jobs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-zinc-800  border-0 border-l-2 border-zinc-600 rounded-md max-w-84"
          />
          <Select
            required
            value={section}
            onValueChange={(value) => setSection(value)}
          >
            <SelectTrigger className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 text-zinc-100 border-zinc-700">
              <SelectItem value="APPLIED">Applied</SelectItem>
              <SelectItem value="INTERVIEW">Interview</SelectItem>
              <SelectItem value="OFFER">Offer</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="ALL">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* JOB LIST */}
      <div className="">
        <div>
          {jobs.length === 0 && (
            <p className="text-zinc-400">No jobs added yet.</p>
          )}
        </div>
        <div
          className={`${loading ? "hidden" : ""} grid md:grid-cols-3  gap-4`}
        >
          {loading && (
            <Card>
              <CardHeader>
                <LoaderCircleIcon className="animate-spin mx-auto" size={48} />
              </CardHeader>
            </Card>
          )}
          {jobs.map((job) => (
            <Card
              key={job.id}
              className={`border-zinc-700 ${statusColors[job.status]} border-2 text-white`}
            >
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-2xl font-semibold tracking-tight">
                      {job.role}
                    </CardTitle>
                    <p className="text-md text-zinc-300 font-medium">
                      {job.company}
                    </p>
                  </div>
                  <div>
                    <EditJobDialog
                      jobId={job.id}
                      onUpdated={(result) => {
                        if (result.deleted) {
                          setJobs((prev) =>
                            prev.filter((j) => j.id !== result.id),
                          );
                        } else {
                          setJobs((prev) =>
                            prev.map((j) => (j.id === result.id ? result : j)),
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <p>
                  <Badge
                    className={`${statusBadgeColors[job.status]} font-bold tracking-tight`}
                  >
                    {job.status}
                  </Badge>
                </p>
                <p className="text-zinc-300 font-medium">
                  {new Date(job.appliedDate).toISOString().split("T")[0]}
                </p>

                {job.notes && (
                  <p className="text-sm italic text-zinc-300">{job.notes}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
