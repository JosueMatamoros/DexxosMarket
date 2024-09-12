import React from 'react';
import LoginButton from '../components/logIn/LoginButton';
import LogInImage from '../../assets/LogIn.webp';
import { useTranslation } from 'react-i18next';

export default function LogIn() {
    const { t } = useTranslation(); // Hook de i18next para traducciones

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl mx-auto h-screen">
            <div className="bg-primary hidden md:block">
                <img
                    src={LogInImage}
                    alt={t('login.loginImageAlt')} // Puedes agregar traducción para el alt si es necesario
                    width={800}
                    height={800}
                    className="object-cover w-full h-full rounded-lg"
                    style={{ aspectRatio: "800/800", objectFit: "cover" }}
                />
            </div>
            <div className="flex flex-col justify-center items-center p-8 md:p-12 bg-background">
                <div className="space-y-4 w-full max-w-md">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">{t('login.welcomeBack')}</h1>
                        <p className="text-muted-foreground">{t('login.signInToContinue')}</p>
                    </div>
                    <div className="grid gap-4">
                        <LoginButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
