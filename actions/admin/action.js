"use server";

import prisma from "@/libs/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function getData(startDate, endDate, year) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request" },
      { status: 403 }
    );
  }

  // console.log(startDate, endDate, year);
  try {
    const data = await prisma.Request.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: new Date(startDate),
              lt: new Date(endDate),
            },
          },
          {
            examyear: {
              examyear: year,
            },
          },
        ],
      },
    });

    return data;
  } catch (err) {
    return { error: "Something went wrong" };
  }
}

export async function getSummarizedData(examYear) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request" },
      { status: 403 }
    );
  }

  try {
    const data = await prisma.Request.findMany({
      where: {
        examyear: {
          examyear: examYear,
        },
      },
    });

    // console.log(data);

    const count = await prisma.Request.count({
      where: {
        examyear: {
          examyear: examYear,
        },
      },
    });

    const questionCount = {};

    data.forEach((entry) => {
      entry.rows.forEach((row) => {
        const { hmName, main, sub } = row;
        const question = `${hmName} - (${main}) - ${sub}`;
        // console.log("question =>", question);
        questionCount[question] = (questionCount[question] || 0) + 1;
        // console.log("question count =>  ", questionCount[question]);
      });
    });

    const questionCountArray = Object.keys(questionCount).map((question) => {
      const [hmName, main, sub] = question.split(" - ");
      return {
        question,
        count: questionCount[question],
        hmName,
        main,
        sub,
      };
    });

    const sortedQuestions = questionCountArray.sort(
      (a, b) => b.count - a.count
    );

    return { data: sortedQuestions, count: count, allData: data };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}

export async function deleteData(examYear) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request" },
      { status: 403 }
    );
  }

  try {
    const data = await prisma.Request.deleteMany({
      where: {
        examyear: {
          examyear: examYear,
        },
      },
    });

    console.log(data);

    if (data) {
      return { success: "Deleted successful!" };
    } else {
      return { error: "Something went wrong" };
    }
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}

export async function changeWebStatus(status) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthenticated Request" },
      { status: 403 }
    );
  }

  try {
    const update = await prisma.WebsiteStatus.update({
      where: {
        id: "65abe3b4d13747393061e33f",
      },
      data: {
        status: status,
      },
    });

    if (update) {
      revalidatePath("/admin/dashboard");
      return { success: "Update successful!" };
    } else {
      return { error: "Something went wrong" };
    }
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}

export async function getWebStatus() {
  try {
    const status = await prisma.WebsiteStatus.findUnique({
      where: {
        id: "65abe3b4d13747393061e33f",
      },
    });

    return status;
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}

export async function addNewYear(year) {
  try {
    const examYear = await prisma.ExamYear.create({
      data: {
        examyear: year,
      },
    });

    revalidatePath("/admin/dashboard");

    if (examYear) {
      return { success: "The year has been added successfully." };
    }
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}
