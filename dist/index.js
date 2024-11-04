"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const server = (0, http_1.createServer)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 5000;
let masterTabId = null;
// Helper function to emit delayed drag events
const emitDelayedDragEvent = (socket, eventName, data) => {
    setTimeout(() => {
        socket.broadcast.emit(eventName, data);
    }, 5); // 5ms delay
};
io.on('connection', (socket) => {
    socket.on('REGISTER_MASTER', (data) => {
        masterTabId = data.tabId;
        // console.log(`Master tab registered: ${data.accessToken}`);
    });
    socket.on('MOUSE_POSITION', (data) => {
        // console.log("Mouse data: ", data)
        socket.broadcast.emit('MOUSE_POSITION_UPDATE', {
            position: data.position,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('SCROLL_POSITION', (data) => {
        // console.log("Scroll: ",data)
        socket.broadcast.emit('SCROLL_POSITION_UPDATE', {
            position: data.position,
            masterTabId: data.masterTabId,
            timestamp: data.timestamp,
            accessToken: data.accessToken
        });
    });
    socket.on('CLICK_EVENT', (data) => {
        console.log("Click event");
        socket.broadcast.emit('CLICK_EVENT_UPDATE', {
            clickData: data.clickData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('CONTEXT_MENU_EVENT', (data) => {
        socket.broadcast.emit('CONTEXT_MENU_EVENT_UPDATE', {
            contextMenuData: data.contextMenuData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('INPUT_CHANGE', (data) => {
        socket.broadcast.emit('INPUT_CHANGE_UPDATE', {
            inputData: data.inputData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('MOUSE_DOWN', (data) => {
        console.log("mouse down");
        socket.broadcast.emit('MOUSE_DOWN_UPDATE', {
            mouseDownData: data.mouseDownData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('MOUSE_UP', (data) => {
        console.log("mouse up");
        socket.broadcast.emit('MOUSE_UP_UPDATE', {
            mouseUpData: data.mouseUpData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('DOUBLE_CLICK', (data) => {
        socket.broadcast.emit('DOUBLE_CLICK_UPDATE', {
            doubleClickData: data.doubleClickData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('WHEEL_ZOOM', (data) => {
        socket.broadcast.emit('WHEEL_ZOOM_UPDATE', {
            zoomData: data.zoomData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    // Modified drag events with delay
    socket.on('DRAG_MOVE', (data) => {
        console.log("drag move");
        emitDelayedDragEvent(socket, 'DRAG_MOVE_UPDATE', {
            dragMoveData: data.dragMoveData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('DRAG_START', (data) => {
        console.log("drag start");
        emitDelayedDragEvent(socket, 'DRAG_START_UPDATE', {
            dragStartData: data.dragStartData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('DRAG_END', (data) => {
        console.log("drag end");
        emitDelayedDragEvent(socket, 'DRAG_END_UPDATE', {
            dragEndData: data.dragEndData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('MOUSE_OVER', (data) => {
        socket.broadcast.emit('MOUSE_OVER_UPDATE', {
            mouseOverData: data.mouseOverData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
    socket.on('MOUSE_OUT', (data) => {
        socket.broadcast.emit('MOUSE_OUT_UPDATE', {
            mouseOutData: data.mouseOutData,
            masterTabId: data.masterTabId,
            accessToken: data.accessToken
        });
    });
});
server.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
});
