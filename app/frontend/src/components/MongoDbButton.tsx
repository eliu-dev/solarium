import { Storage } from '@mui/icons-material';
import { Button, Toolbar } from '@mui/material';
/* Interim experiment for Mongo connections */
async function handleMongoPing() {
  try {
    const response = await fetch(`/db/mongo/ping`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.status);
    console.log(response.body);
  } catch (err) {
    console.log(err);
  }
}

function MongoDbButton() {
  return (
    <Toolbar variant="dense">
      <Storage />
      <Button onClick={handleMongoPing}>Ping</Button>
      <Button>Save</Button>
    </Toolbar>
  );
}

export default MongoDbButton;
