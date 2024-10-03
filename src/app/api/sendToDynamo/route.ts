import { NextRequest, NextResponse } from "next/server";
import "@aws-sdk/client-dynamodb";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const dynamoTable = new DynamoDBClient({ region: "eu-west-1" }); //Make sure this region is the same as the one you created your table in

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { entryContent } = body;

    const input = {
      TableName: "", //Replace this with your TABLE-NAME e.g. 'my-dev-table'
      Item: {
        entryContent: {  //this should have the same name as the partition key you created when creating your table 
          S: entryContent,
        },
      },
    };

    const addEntry = new PutItemCommand(input);
    const responseFromEntry = await dynamoTable.send(addEntry);

    return NextResponse.json({
      message:
        "row added to dynamo table successfully! consumed capactity: " +
        responseFromEntry.ConsumedCapacity,
    });
  } catch (error) {
    console.error("error adding row to dynamo table:", error);
    return NextResponse.json(
      { error: "failed to add row in dynamo table" },
      { status: 500 }
    );
  }
}
