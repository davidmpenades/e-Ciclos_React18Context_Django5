import SlotsContext from '../context/SlotsContext';
import { useCallback, useContext, useState } from 'react';
import SlotService from '../services/SlotService';

export function useSlots() {
    const { slots, setSlots } = useContext(SlotsContext);
    const [oneSlot, setOneSlot] = useState({});

    const useOnteSlot = useCallback((id) => {
        SlotService.getOneSlot(id)
            .then(({ data }) => {
                setOneSlot(data);
            })
            .catch((e) => console.error(e));
    }, [setOneSlot]);
    
    return { slots, setSlots, useOnteSlot, oneSlot, setOneSlot };
    };
    
    
    