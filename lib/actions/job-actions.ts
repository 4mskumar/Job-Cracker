'use server'

import { auth } from "@/auth";
import { prisma } from "../prisma";

import { revalidatePath } from "next/cache";
import { JobStatus, Prisma } from "@prisma/client";

export async function createJob(
  data: {
  company: string;
  role: string;
  status: JobStatus;
  appliedDate: Date;
  notes?: string;
}
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const userId = Number(session.user.id);
    const appliedDateUpdated = new Date(data.appliedDate)
    
    const newJob = await prisma.job.create({
      data: {
        company: data.company,
        role: data.role,
        appliedDate: appliedDateUpdated,
        status: data.status,
        notes: data.notes,
        user: {
          connect: { id: userId },
        },
      },
    });

    revalidatePath('/dashboard')

    return newJob;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}

export async function fetchAllJobs() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const userId = Number(session.user.id);

    const allJobs = await prisma.job.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return allJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

export async function getJobById(jobId: number){
    try {
        return await prisma.job.findUnique({
            where: {id:jobId}
        })
    } catch (error) {
        console.log('error in finding job by id ', error);
        
    }
}

export async function updateJob(
  jobId: number,
  data: Prisma.JobUpdateInput
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }

    const userId = Number(session.user.id);

    // Check job belongs to this user
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob || existingJob.userId !== userId) {
      throw new Error("Not allowed to update this job");
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        company: data.company,
        role: data.role,
        status: data.status,
        notes: data.notes,
        appliedDate: data.appliedDate
          ? new Date(data.appliedDate as string)
          : undefined,
      },
    });

    return updatedJob;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
}

export async function deleteJob(jobId: number){
  try {
    const session = await auth()
    if(!session || !session.user){
      throw new Error('unauthorized')
    }
    const userId = Number(session.user.id)
    const existingJob = await prisma.job.findUnique({
      where: {id: jobId}
    })
    if(!existingJob || existingJob.userId !== userId){
      throw new Error('not allowed to delete this job')
    }
    await prisma.job.delete({
      where: {id: jobId}
    })
    revalidatePath('/dashboard')
  } catch (error) {
    console.log(error, " error in deleting");    
  }
}

