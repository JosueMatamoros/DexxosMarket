import React, { useContext, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function Thanks() {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const { cartItems, fetchCartItems } = useContext(CartContext); // Usa el contexto para obtener los datos del carrito
    const { t } = useTranslation(); // Hook de i18next para traducciones

    useEffect(() => {
        console.log('Thanks component mounted');
        const processOrder = async () => {
            try {
                // Envía la solicitud POST para crear la orden
                const response = await axios.post(`http://localhost:5000/orders/${user.sub}`, {});
                console.log("Orden creada con éxito:", response.data);
                // Espera 3 segundos antes de redirigir al usuario al perfil
                setTimeout(() => {
                    navigate('/account');
                }, 4000);
            } catch (error) {
                console.error('Error procesando la orden!', error);
                // Redirige al perfil inmediatamente si hay un error
                navigate('/account');
            }
        };

        // Llama a la función para procesar la orden
        processOrder();
    }, [user, navigate]);

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                {/* Imagen antes del mensaje */}
                <img
                    src="\assets\parachute-box.png"
                    alt="Thank you"
                    className="mx-auto h-48 w-48"
                />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {t('thanks.thankYou')}
                </h1>
                <p className="mt-4 text-muted-foreground">
                    {t('thanks.appreciation')}
                </p>
            </div>
            <div role="status" className='mt-5'>
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">{t('thanks.loading')}</span>
            </div>
        </div>
    );
}
