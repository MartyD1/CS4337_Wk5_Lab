import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { NextRequest, NextResponse } from "next/server";

const dynamodb = new DynamoDBClient({ region: "eu-west-1" });

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get("batchId");

    if (!batchId) {
        return NextResponse.json(
            { error: "batchId is required" },
            { status: 400 }
        );
    }

    try {
        const command = new GetItemCommand({
            TableName: "my-logs-table",
            Key: {
                requestID: { S: batchId },
            },
        });

        const response = await dynamodb.send(command);

        if (!response.Item) {
            return NextResponse.json({ error: "Batch not found" }, { status: 404 });
        }

        const status = response.Item.status.S;
        const data = {
            status: status,
            content_from_queue: response.Item.content_from_queue.S,
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching batch status:", error);
        return NextResponse.json(
            { error: "Failed to fetch batch status" },
            { status: 500 }
        );
    }
}
