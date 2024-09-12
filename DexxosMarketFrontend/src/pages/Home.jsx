import React from "react";
import FooterComponent from "../footer/Footer";
import { FaShoppingBasket, FaTruck, FaGift } from "react-icons/fa";
import { Card } from "flowbite-react";
import DexxosLogo from "../../assets/DexxosLogo.webp";
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation(); // Hook de i18next para traducciones

  return (
    <div>
      <main className="flex-1">
        <section className="w-full px-12 md:py-24 lg:py-32">
          <div className="container grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <img
              src={DexxosLogo}
              width="550"
              height="550"
              alt={t('home.headline')} // Puedes agregar traducción para el alt si es necesario
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {t('home.headline')}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t('home.subheadline')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección adicional con tarjetas */}
        <section className="w-full md:py-24 lg:py-32 bg-muted">
          <div className="flex justify-between md:grid-cols-3 md:gap-8 md:px-6">
            <Card className="flex-1 mx-2">
              <div className="flex flex-col items-center justify-center gap-4 p-6 h-full">
                <FaTruck className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">{t('home.deliveryTitle')}</h3>
                <p className="text-muted-foreground text-center">
                  {t('home.deliveryDescription')}
                </p>
              </div>
            </Card>
            <Card className="flex-1 mx-2">
              <div className="flex flex-col items-center justify-center gap-4 p-6 h-full">
                <FaShoppingBasket className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">{t('home.pickupTitle')}</h3>
                <p className="text-muted-foreground text-center">
                  {t('home.pickupDescription')}
                </p>
              </div>
            </Card>
            <Card className="flex-1 mx-2">
              <div className="flex flex-col items-center justify-center gap-4 p-6 h-full">
                <FaGift className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-semibold">{t('home.rewardsTitle')}</h3>
                <p className="text-muted-foreground text-center">
                  {t('home.rewardsDescription')}
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <FooterComponent />
    </div>
  );
}
