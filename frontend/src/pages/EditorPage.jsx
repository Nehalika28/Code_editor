
import { useState, useRef, useEffect } from "react";
import {
    useLocation,
    useParams,
    useNavigate,
    Navigate,
} from "react-router-dom";
import logo from "../assets/logo.jpeg";
import Editor from "./Editor";
import "../App.css";
import Avatar from "react-avatar";
import { initSocket } from "../utils/socket";
import { ACTIONS } from "../actions";
import toast from "react-hot-toast";

export default function EditorPage() {
    const reactNavigator = useNavigate();
    const location = useLocation();
    const { roomId } = useParams();
    const username = location.state?.username;

    const socketRef = useRef(null);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const socket = initSocket();
        socketRef.current = socket;

        function handleErrors(err) {
            console.error("Socket error:", err);
            toast.error("Socket connection failed. Try again later.");
            reactNavigator("/");
        }

        socket.on("connect_error", handleErrors);

        socket.on("connect", () => {
            console.log("Connected:", socket.id);

            socket.emit(ACTIONS.JOIN, {
                roomId,
                username,
            });
        });

        socket.on(
            ACTIONS.JOINED,
            ({ clients, username: joinedUsername, socketId }) => {
                setClients(clients);

                if (joinedUsername !== username) {
                    toast.success(`${joinedUsername} joined the room`);
                    console.log(`${joinedUsername} joined`);
                }
            }
        );

        return () => {
            socket.off("connect_error", handleErrors);
            socket.off(ACTIONS.JOINED);
            socket.disconnect();
            socketRef.current = null;
        };
    }, [roomId, username, reactNavigator]);

    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (
        <div className="mainwrap">
            <div className="aside">
                <div className="asideinner">
                    <div className="logo">
                        <img src={logo} alt="Logo" className="logoimage" />
                    </div>

                    <h3>Connected</h3>

                    <div className="clientslist">
                        {clients.map((client) => (
                            <div className="client" key={client.socketId}>
                                <Avatar
                                    name={client.username}
                                    size="50"
                                    round="14px"
                                />
                                <span>{client.username}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="btn copybtn">Copy Room ID</button>
                <button className="btn leavebtn">Leave</button>
            </div>

            <div className="editorwrap">
                <Editor />
            </div>
        </div>
    );
}
