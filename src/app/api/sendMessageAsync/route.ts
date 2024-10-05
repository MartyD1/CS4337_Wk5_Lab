import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { NextRequest, NextResponse } from "next/server";

const sqs = new SQSClient({ region: "eu-west-1" });

const generateRandomLongID = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function POST(req: NextRequest) {
  try {
    const queueUrl = process.env.QUEUE_URL
    const randomId = generateRandomLongID()

    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: randomId,
    });

    const response = await sqs.send(command);

    return NextResponse.json({
      message: "Message sent to SQS",
      messageId: response.MessageId,
      batchId: randomId,
    });
  } catch (error) {
    console.error("Error sending message to SQS:", error);
    return NextResponse.json(
      { error: "Failed to send message to SQS" },
      { status: 500 }
    );
  }
}
