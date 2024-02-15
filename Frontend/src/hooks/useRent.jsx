import { useEffect, useState } from "react";
import RentService from "../services/RentService";
import { toast } from "react-toastify";

export function useRent() {
    const [rents, setRents] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    // useEffect(() => {
    //     const path = pathname.split('/')[1]
    //     if (path === 'dashboard') {
    //         RentService.getAllRents()
    //         .then(({data, status}) => {
    //             if(status === 200) {
    //                 setRents(data)
    //             }
    //         })
    //         .catch(e => console.log(e))
    //     }
    // })

    const useRentBike = (slot) => {
        RentService.rentBike(slot)
        .then(({data, status}) => {
            console.log(data, status);
            if (status === 200) {
                toast.success("¡Bicicleta alquilada, gracias! Disfruta tu paseo.");
                setIsCorrect(true);
                setTimeout(() => { setIsCorrect(false); }, 1000);
            }
        })
        .catch(() => {
            console.log("Ya tiene una bicicleta alquilada");
        });
    };
    const getOneRent = () => {
        RentService.getOneRent()
        .then(({data, status}) => {
            console.log(data, status);
            if(status === 200) {
                return true
            }else {
                return false
            }
        })
        .catch(e => console.log(e),)
    }

    const useBackRent = (slot) => {
        console.log(slot);
        RentService.backRent(slot)
        .then(({data, status}) => {
            console.log(data, status);
            if (status === 200) {
                toast.success("¡Bicicleta devuelta, gracias!.");
                setIsCorrect(true);
                setTimeout(() => { setIsCorrect(false); }, 1000);
            }
        })
        .catch(() => {
            console.log("Ha habido un error al devolver la bicicleta.");
        });
    }
    return  { rents, setRents, useRentBike, getOneRent, useBackRent }
}

