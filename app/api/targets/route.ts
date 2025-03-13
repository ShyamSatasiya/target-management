import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const targetsData = JSON.parse(fs.readFileSync(targetsFilePath, "utf-8"));
  return NextResponse.json(targetsData);
}

const targetsFilePath = path.join(process.cwd(), "data", "targets.json");

interface Target {
  id: string;
  pipelineStatus: string;
  lastUpdated: string;
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const { id, pipelineStatus } = await request.json();

  // Read the existing targets
  const targetsData: Target[] = JSON.parse(
    fs.readFileSync(targetsFilePath, "utf-8")
  );

  // Find the target by id
  const targetIndex: number = targetsData.findIndex(
    (target: Target) => target.id === id
  );
  console.log(targetIndex);
  if (targetIndex === -1) {
    return NextResponse.json({ message: "Target not found" }, { status: 404 });
  }

  // Update the target's pipeline status and last updated time
  targetsData[targetIndex].pipelineStatus = pipelineStatus;
  targetsData[targetIndex].lastUpdated = new Date().toISOString();

  // Write the updated targets back to the file
  fs.writeFileSync(targetsFilePath, JSON.stringify(targetsData, null, 2));

  return NextResponse.json(targetsData[targetIndex]); // Respond with the updated target
}
