import { useEffect } from "react";
import toast from "react-hot-toast";

import { useDashboardSocket } from "../../context/WebSocketContext";

export default function NotificationListener() {

    const socket = useDashboardSocket();

    const lastEvent = socket?.lastEvent;

    useEffect(() => {

        if (!lastEvent) return;

        switch (lastEvent.event) {

            case "resume_uploaded":

                toast.success(
                    `Resume uploaded: ${lastEvent.filename}`
                );

                break;

            case "candidate_created":

                toast.success(
                    `New candidate: ${lastEvent.name}`
                );

                break;

            case "candidate_hired":

                toast.success(
                    `🎉 ${lastEvent.name} hired`
                );

                break;

            case "interview_completed":

                toast(
                    `Interview completed for ${lastEvent.name}`
                );

                break;

            default:

                break;

        }

    }, [lastEvent]);

    return null;
}