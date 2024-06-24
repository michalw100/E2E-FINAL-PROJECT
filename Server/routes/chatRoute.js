// const WebSocket = require('ws');
// const chatController = require('../controllers/chatController');

// function initializeWebSocket(server) {
//   const wss = new WebSocket.Server({ server });

//   wss.on('connection', async (ws) => {
//     console.log('New client connected');

//     // Sending chat history to the new client
//     try {
//       const messages = await chatController.getMessages();
//       ws.send(JSON.stringify({ type: 'history', messages }));
//     } catch (err) {
//       console.error("Error retrieving chat history", err);
//     }

//     ws.on('message', async (data) => {
//       const { userId, message } = JSON.parse(data);

//       try {
//         // Calling controller function to handle the message
//         await chatController.handleMessage(userId, message);

//         // Sending the message to all connected clients
//         wss.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ type: 'message', userId, message }));
//           }
//         });
//       } catch (err) {
//         console.error("Error handling message", err);
//       }
//     });

//     ws.on('close', () => {
//       console.log('Client disconnected');
//     });
//   });

//   return wss;
// }

// module.exports = initializeWebSocket;

// routes/chat.js
const express = require('express');
const router = express.Router();
const { createChatController, getChatByIdController, getChatByNameController } = require('../controllers/chatController');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
  try {
    const chat = await createChatController(req, res);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const chat = await getChatByIdController(req, res);
    if (chat) {
      res.json(chat);
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/name/:name', async (req, res) => {
  try {
    const chat = await getChatByNameController(req, res);
    if (chat) {
      res.json(chat);
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

