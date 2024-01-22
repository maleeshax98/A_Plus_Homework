"use server";
import prisma from "@/libs/db";

export async function addData(rows, FormData) {
  const studentName = FormData.get("studentName");
  const examYear = FormData.get("examYear");
  if (!studentName.trim()) {
    console.log("name");
    return { error: "Please enter your name" };
  }

  if (!examYear.trim()) {
    return { error: "Please enter Exam Year" };
  }

  if (rows.length <= 0) {
    return { error: "Please enter Data" };
  }

  try {
    const examYearId = await prisma.ExamYear.findFirst({
      where: {
        examyear: examYear,
      },
      select: {
        id: true,
      },
    });

    if (!examYearId) {
      return { error: "Something went wrong!" };
    }

    const webStatus = await prisma.WebsiteStatus.findUnique({
      where: {
        id: "65abe3b4d13747393061e33f",
      },
    });

    if (webStatus.status === false) {
      return { error: "Something went wrong!" };
    }

    const request = await prisma.Request.create({
      data: {
        rows: rows,
        userName: studentName,
        examyearId: examYearId.id,
      },
    });

    console.log(request);

    if (!request) {
      return { error: "Something went wrong!" };
    }

    return { success: true, statusCode: 200 };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
}

export async function getExamYears() {
  try {
    const years = await prisma.ExamYear.findMany();

    return { years: years, statusCode: 200 };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
}
