using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using SuperWebSocket;
using SuperSocket.SocketBase.Config;
using SuperSocket.SocketEngine;
using SuperSocket.SocketBase;

namespace FaytWeb
{
    public class Global : System.Web.HttpApplication
    {

        private List<WebSocketSession> m_Sessions = new List<WebSocketSession>();
        private object m_SessionSyncRoot = new object();
        WebSocketServer socketServer;

        void Application_Start(object sender, EventArgs e)
        {
            socketServer = new WebSocketServer();
            socketServer.Setup(new RootConfig(),
                new ServerConfig
                {
                    Name = "SuperWebSocket",
                    Ip = "Any",
                    Port = 2011,
                    Mode = SocketMode.Async
                }, SocketServerFactory.Instance);

            socketServer.NewMessageReceived += new SessionEventHandler<WebSocketSession, string>(socketServer_NewMessageReceived);
            socketServer.NewSessionConnected += new SessionEventHandler<WebSocketSession>(socketServer_NewSessionConnected);
            socketServer.SessionClosed += new SessionEventHandler<WebSocketSession, CloseReason>(socketServer_SessionClosed);

            socketServer.Start();
        }

        void socketServer_NewMessageReceived(WebSocketSession session, string e)
        {
            SendToAll(session.SessionID + ": " + e, session.SessionID);
        }

        void socketServer_NewSessionConnected(WebSocketSession session)
        {
            lock (m_SessionSyncRoot)
                m_Sessions.Add(session);

            SendToAll("System-connected:" + session.SessionID);
        }

        void socketServer_SessionClosed(WebSocketSession session, CloseReason reason)
        {
            lock (m_SessionSyncRoot)
                m_Sessions.Remove(session);

            if (reason == CloseReason.ServerShutdown)
                return;

            SendToAll("System-disconnected:" + session.SessionID);
        }

        void SendToAll(string message, string exceptSesssionId = "")
        {
            lock (m_SessionSyncRoot)
            {
                foreach (var s in m_Sessions)
                {
                    //s.SendResponse(message);

                    if (exceptSesssionId != s.SessionID)
                        s.SendResponseAsync(message);
                }
            }
        }

        void Application_End(object sender, EventArgs e)
        {
            if (socketServer != null)
            {
                socketServer.Stop();
            }

        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs

        }

        void Session_Start(object sender, EventArgs e)
        {
            // Code that runs when a new session is started

        }

        void Session_End(object sender, EventArgs e)
        {
            // Code that runs when a session ends. 
            // Note: The Session_End event is raised only when the sessionstate mode
            // is set to InProc in the Web.config file. If session mode is set to StateServer 
            // or SQLServer, the event is not raised.

        }

    }
}
