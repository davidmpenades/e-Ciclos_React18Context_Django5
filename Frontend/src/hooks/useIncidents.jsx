import {  useCallback, useState, useContext } from "react";
import IncidentsContext from '../context/IncidentsContext';
import IncidentsService from '../services/IncidentsService';
import { toast } from 'react-toastify'
import AuthContext from "../context/AuthContext";

export function useIncidents() {
    const { isAuth } = useContext(AuthContext);
    const { incidentsSlots, setIncidentsSlots } = useContext(IncidentsContext);
    const [userIncidents, setUserIncidents] = useState({});
    const [isCorrect, setIsCorrect] = useState(false);

    const useAddSlotIncidence = useCallback((data) => {
        if (isAuth) {
            IncidentsService.createIncidentSlot(data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setUserIncidents([...userIncidents, data]);
                        // setIncidentsSlots([...incidentsSlots, data]);
                        toast.success('Incidencia enviada, gracias por su colaboración!');
                        setIsCorrect(true);
                        setTimeout(() => { setIsCorrect(false); }, 1000);
                    }
                })
                .catch(e => console.error(e));
        }
    }, [setUserIncidents]);

    return { incidentsSlots, setIncidentsSlots, userIncidents, setUserIncidents, useAddSlotIncidence, isCorrect };
}