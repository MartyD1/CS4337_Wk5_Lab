"use client";
import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';

export default function TaskManager() {
  const [batchId, setBatchId] = useState<string | null>(null);
  const [batchStatus, setBatchStatus] = useState<string>("idle");
  const [batchContent, setBatchContent] = useState<string>("");

  const checkStatus = async () => {
    if (batchId) {
      const response = await fetch(`/api/checkStatus?batchId=${batchId}`);
      const data = await response.json();

      if (data.status === "Complete") {
        alert("Done!");
        setBatchStatus("complete");
        setBatchContent(data.content_from_queue);
      }
    }
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/sendMessageAsync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(data => data.json());

    if (response.batchId) {
      setBatchId(response.batchId);
      setBatchStatus("in-progress");
      alert(`Message sent: ${response.batchId}`);
    } else {
      alert("Failed to send message to SQS");
    }
  };

  const handleSubmitSync = async () => {

    const response = await fetch('/api/sendMessageSync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(data => data.json());
      alert(JSON.stringify(response));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (batchStatus === "in-progress") {
      interval = setInterval(checkStatus, 2500); // Poll every 2.5 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [batchId, batchStatus]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.containerTwo}>
        <div style={styles.container}>
          <h1 style={styles.title}>Export Data Asynchronously:</h1>

          <button style={styles.button} onClick={handleSubmit}>Send</button>
          {batchStatus === "in-progress" && <p style={styles.title}>Processing...</p>}
          {batchStatus === "complete" && <p style={styles.title}>Data: {batchContent}</p>}

        </div>

        <div style={styles.container}>
          <h1 style={styles.title}>Export Data Synchronously:</h1>
          <button style={styles.button} onClick={handleSubmitSync}>Send</button>
        </div>

      </div>
    </div>
  );
}
const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  containerTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: '2rem',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: '30px',
    borderRadius: '12px',
    width: '350px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#005bb5',
  },
  statusInProgress: {
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#FFA500', // Orange for "in-progress"
  },
  statusComplete: {
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#28a745', // Green for "complete"
  },
};