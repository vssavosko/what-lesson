export interface IProps {
  socket: SocketIOClient.Socket;
}

export interface IEventInfo {
  target: HTMLInputElement;
  keyCode: number;
}
