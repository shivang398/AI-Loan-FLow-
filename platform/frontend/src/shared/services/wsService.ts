import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();

  public connect(url: string, onConnect: () => void) {
    if (this.client?.connected) return;

    const token = localStorage.getItem('token');
    this.client = new Client({
      webSocketFactory: () => new SockJS(url),
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      debug: () => { /* suppress noise */ },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = () => {
      console.log('STOMP Connected');
      onConnect();
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP Error:', frame.headers['message']);
    };

    this.client.activate();
  }

  public subscribe(topic: string, callback: (message: IMessage) => void) {
    if (!this.client?.connected) {
      console.error('WebSocket not connected');
      return;
    }

    if (this.subscriptions.has(topic)) return;

    const subscription = this.client.subscribe(topic, callback);
    this.subscriptions.set(topic, subscription);
  }

  public unsubscribe(topic: string) {
    const subscription = this.subscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
    }
  }

  public sendMessage(destination: string, body: any) {
    if (this.client?.connected) {
      this.client.publish({
        destination,
        body: JSON.stringify(body),
      });
    }
  }

  public disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      this.subscriptions.clear();
    }
  }
}

export const wsService = new WebSocketService();
