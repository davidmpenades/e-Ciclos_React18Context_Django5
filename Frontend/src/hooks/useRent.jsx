import { useEffect, useState, useContext } from "react";
import RentService from "../services/RentService";
import SlotsContext from "../context/SlotsContext";
import { toast } from "react-toastify";

export function useRent() {
    const [rents, setRents] = useState([]);
    const { slots, updateSlotStatus } = useContext(SlotsContext); 
    const [isCorrect, setIsCorrect] = useState(false);

    const useRentBike = (slot) => {
        RentService.rentBike(slot)
        .then(({data, status}) => {
            if (status === 200) {
                toast.success("¡Bicicleta alquilada, gracias! Disfruta tu paseo.");  
                setRents(data);
                updateSlotStatus(slot.id, "vacant"); 
                setIsCorrect(true);
                setTimeout(() => { setIsCorrect(false); }, 1000);
            }
        })
        .catch(() => {
            toast.error("Ya tiene una bicicleta alquilada. Devuelva la bicicleta para alquilar otra.");

        });
    };
    const getOneRent = () => {
        RentService.getOneRent()
        .then(({data}) => {
            if(data.end_slot_id === '') {
                return true
            }else {
                return false
            }
        })
        .catch(e => console.log(e),)
    }

    const useBackRent = (slot) => {
        RentService.backRent(slot)
        .then(({data, status}) => {
            if (status === 200) {
                toast.success("¡Bicicleta devuelta, gracias!.");
                setRents(data);
                updateSlotStatus(slot.id, "in_use"); 
                setIsCorrect(true);
                setTimeout(() => { setIsCorrect(false); }, 1000);
            }
        })
        .catch(() => {
            toast.error("Ha habido un error al devolver la bicicleta. Puede que no tenga una bicicleta alquilada.");
        });
    }
    return  { rents, setRents, useRentBike, getOneRent, useBackRent }
}
