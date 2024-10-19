import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let masterTabId: number | null = null;

io.on('connection', (socket) => {
  // console.log('New client connected');

  socket.on('REGISTER_MASTER', (data) => {
    masterTabId = data.tabId;
    console.log(`Master tab registered: ${masterTabId}`);
  });

  socket.on('MOUSE_POSITION', (data) => {
    socket.broadcast.emit('MOUSE_POSITION_UPDATE', {
      position: data.position,
      masterTabId: data.masterTabId
    });
  });

  socket.on('SCROLL_POSITION', (data) => {
    // console.log("Scroll: ",data)
    socket.broadcast.emit('SCROLL_POSITION_UPDATE', {
      position: data.position,
      masterTabId: data.masterTabId,
      timestamp: data.timestamp
    });
  });

  socket.on('CLICK_EVENT', (data) => {
    // console.log("click: ",data)
    socket.broadcast.emit('CLICK_EVENT_UPDATE', {
      clickData: data.clickData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('CONTEXT_MENU_EVENT', (data) => {
    socket.broadcast.emit('CONTEXT_MENU_EVENT_UPDATE', {
      contextMenuData: data.contextMenuData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('INPUT_CHANGE', (data) => {
    // console.log("Input: ",data)
    socket.broadcast.emit('INPUT_CHANGE_UPDATE', {
      inputData: data.inputData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('MOUSE_DOWN', (data) => {
    socket.broadcast.emit('MOUSE_DOWN_UPDATE', {
      mouseDownData: data.mouseDownData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('MOUSE_UP', (data) => {
    socket.broadcast.emit('MOUSE_UP_UPDATE', {
      mouseUpData: data.mouseUpData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('DOUBLE_CLICK', (data) => {
    socket.broadcast.emit('DOUBLE_CLICK_UPDATE', {
      doubleClickData: data.doubleClickData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('WHEEL_ZOOM', (data) => {
    // console.log("Wheel: ", data);
    socket.broadcast.emit('WHEEL_ZOOM_UPDATE', {
      zoomData: data.zoomData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('DRAG_MOVE', (data) => {
  // console.log("DRAG MOVE: ",data)
    socket.broadcast.emit('DRAG_MOVE_UPDATE', {
      dragMoveData: data.dragMoveData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('DRAG_START', (data) => {
    socket.broadcast.emit('DRAG_START_UPDATE', {
      dragStartData: data.dragStartData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('DRAG_END', (data) => {
  
    socket.broadcast.emit('DRAG_END_UPDATE', {
      dragEndData: data.dragEndData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('MOUSE_OVER', (data) => {
    socket.broadcast.emit('MOUSE_OVER_UPDATE', {
      mouseOverData: data.mouseOverData,
      masterTabId: data.masterTabId
    });
  });

  socket.on('MOUSE_OUT', (data) => {
    socket.broadcast.emit('MOUSE_OUT_UPDATE', {
      mouseOutData: data.mouseOutData,
      masterTabId: data.masterTabId
    });
  });
  
});

server.listen(4000, () => {
  console.log('WebSocket server listening on port 4000');
});