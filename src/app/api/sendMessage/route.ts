import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { NextRequest, NextResponse } from 'next/server';


const sqs = new SQSClient({ region: 'eu-west-1' });

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { message } = body;
  
      const queueUrl = ''; // ADD YOUR QUEUE URL HERE
  
      const command = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: `New user created: ${message}`,
      });
  
      const response = await sqs.send(command);
  
      return NextResponse.json({ message: 'Message sent to SQS', messageId: response.MessageId });
    } catch (error) {
      console.error('Error sending message to SQS:', error);
      return NextResponse.json({ error: 'Failed to send message to SQS' }, { status: 500 });
    }
  }
