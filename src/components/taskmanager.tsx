"use client";
import { useState } from 'react';
import { CSSProperties } from 'react';  

export default function TaskManager() {
  const [message, setMessage] = useState(''); 
  const [entry, setEntry] = useState('')


  const handleSubmit = async () => {

    const response = await fetch('/api/sendMessageAsync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message, 
      }),
    });

    if (response.ok) {
      alert("Message sent to SQS");
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
      body: JSON.stringify({
        entryContent: entry, 
      }),
    });

    if (response.ok) {
      const text = await new Response(response.body).text();
      alert(text);
    } else {
      alert("failed to export data");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.containerTwo}>
      <div style={styles.container}>
        <h1 style={styles.title}>Export Data Asynchronously:</h1>

         <div style={styles.inputGroup}>
          <label style={styles.label}>Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
            style={styles.input}
          />
        </div> 
        
        <button style={styles.button} onClick={handleSubmit}>Send</button> 
        </div>

        <div style={styles.container}>
        <h1 style={styles.title}>Export Data Synchronously:</h1>
        <div style={styles.inputGroup}>
      
          <label style={styles.label}>Message:</label>
          <input
            type="text"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Enter some text here..."
            style={styles.input}
          />
        </div>
        <button style={styles.button} onClick={handleSubmitSync}>Send</button>
        </div>


       

        </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', 
    backgroundColor: '#eaeaea',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    height:'292.2px',
    width: '200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  containerTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: '1em',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    width: '700px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  

  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#000000'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    width: '100%',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#000000'
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    color: 'black',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
  },
};