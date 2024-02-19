import { useEffect, useState } from "react";
import RentService from "../services/RentService";
import { toast } from "react-toastify";

export function useRent() {
    const [rents, setRents] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    // useEffect(() => {
        // const path = pathname.split('/')[1]
        // if (path === 'dashboard') {
            // RentService.allRents()
            // .then(({data, status}) => {
            //     if(status === 200) {
            //         setRents(data)
            //     }
            // })
            // .catch(e => console.log(e))
        // }
    // },[])

    const useRentBike = (slot) => {
        RentService.rentBike(slot)
        .then(({data, status}) => {
            if (status === 200) {
                toast.success("¡Bicicleta alquilada, gracias! Disfruta tu paseo.");  
                setRents(data);
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
        .then(({data, status}) => {
            if(status === 200) {
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

