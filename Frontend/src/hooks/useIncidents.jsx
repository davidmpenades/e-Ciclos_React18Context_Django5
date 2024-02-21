import { useCallback, useState, useContext, useEffect } from "react";
import IncidentsContext from "../context/IncidentsContext";
import IncidentsService from "../services/IncidentsService";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

export function useIncidents() {
  const { isAuth, isAdmin } = useContext(AuthContext);
  const { incidentsSlots, setIncidentsSlots } = useContext(IncidentsContext);
  const [isCorrect, setIsCorrect] = useState(false);

  const useAddSlotIncidence = useCallback(
    (data) => {
      if (isAuth) {
        IncidentsService.createIncidentSlot(data)
          .then(({ data, status }) => {
            if (status === 200) {
              setIncidentsSlots([...incidentsSlots, data])
              toast.success("Incidencia enviada, gracias por su colaboración!");
              setIsCorrect(true);
              setTimeout(() => {
                setIsCorrect(false);
              }, 1000);
            }
          })
          .catch((e) => console.error(e));
      }
    },
    [setIncidentsSlots, isAuth]
  );

  const useDeleteIncidence = useCallback(
    (id) => {
      if (isAdmin) {
        IncidentsService.deleteIncidentSlot(id)
          .then(({ status, data }) => {
            if (status === 200) {
              setIncidentsSlots((prevIncidents) =>
                prevIncidents.filter((incident) => incident.id !== id)
              );
              toast.success("Incidencia eliminada correctamente");
            }
          })
          .catch((e) => console.error(e));
      }
    },
    [setIncidentsSlots]
  );

  const useUpdateIncidence = useCallback((id, data) => {
    if (isAdmin) {
      IncidentsService.UpdateIncidence(id, data)
        .then(({ status, data }) => {
          if (status === 200) {
            setIncidentsSlots((prevIncidents) => {
              return prevIncidents.map((incident) => {
                if (incident.id === id) {
                  return data;
                }
                return incident;
              });
            });
            toast.success("Incidencia modificada correctamente");
          }
        })
        .catch((e) => console.error(e));
    }
  }, [setIncidentsSlots]);

  return {
    incidentsSlots,
    setIncidentsSlots,
    useAddSlotIncidence,
    isCorrect,
    useDeleteIncidence,
    useUpdateIncidence,
  };
}
