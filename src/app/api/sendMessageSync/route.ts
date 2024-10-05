import { NextRequest, NextResponse } from "next/server";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  try {
    console.log("simulating a long process");
    console.log("exporting data...");

    const start = new Date().getTime();
    await sleep(10000);
    let elapsed = new Date().getTime() - start;
    const elapsedInt = Math.floor(elapsed / 1000);

    console.log("data exported successfully!");
    console.log("time taken to process: " + elapsedInt + " seconds");

    return NextResponse.json(
      {
        message: "data exported successfully in " + elapsedInt + " seconds",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error exporting data: ", error);
    return NextResponse.json(
      { error: "failed to export data" },
      { status: 500 }
    );
  }
}
