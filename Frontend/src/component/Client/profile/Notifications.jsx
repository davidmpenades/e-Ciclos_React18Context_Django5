import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  Typography,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useNotifications } from "../../../hooks/useNotifications";
import "./Notifications.css";

export function Notifications() {
  const { notifications, useSeeNotification } = useNotifications();
  const TABLE_HEAD = [
    "Identificador Notificación",
    "Descripción",
    "Visto",
    "Acciones",
  ];

  const handleMarkAsRead = (notificationId) => {
    useSeeNotification(notificationId); // Pasa el ID de la notificación a la función useSeeNotification
  };

  return (
    <Card className="h-full w-full">
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left table">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notifications.map(({ id, desc, seen }) => (
              <tr key={id}>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {desc}
                  </Typography>
                </td>
                <td className="p-4">
                  <Chip
                    size="sm"
                    variant="ghost"
                    value={seen ? "Visto" : "No visto"}
                    color={seen ? "green" : "red"}
                  />
                </td>
                <td className="p-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleMarkAsRead(id)}
                  >
                    Marcar como leído
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

