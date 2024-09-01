import { useState, useEffect } from "react";
import { Label, Checkbox, TextInput, Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import ProductCards from "../components/products/ProductCards";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { deeplApiKey } from '../../API/deeplConfig';

export default function Shop() {
  const { t, i18n } = useTranslation(); // Hook de i18next para manejar el idioma seleccionado
  const { user } = useAuth0();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [translatedCategories, setTranslatedCategories] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);

        // Obtener categorías únicas y traducirlas
        const categories = [...new Set(response.data.map((product) => product.category))];
        const translated = await Promise.all(categories.map(async (category) => {
          const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
            params: {
              auth_key: deeplApiKey,
              text: category,
              target_lang: i18n.language.toLowerCase(),
            },
          });
          return { original: category, translated: response.data.translations[0].text };
        }));

        setTranslatedCategories(translated);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [i18n.language]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <>
      <div className="ml-3 mt-3">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="/" icon={HiHome}>
            {t('shop.home')}
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/account">{t('shop.shop')}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="grid md:grid-cols-[240px_1fr] gap-6 p-4 md:p-6">
        <div className="bg-muted/40 rounded-lg p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">{t('shop.categories')}</h2>
          <div className="grid gap-2">
            {translatedCategories.map(({ original, translated }) => (
              <Label key={original} className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedCategories.includes(original)}
                  onChange={() => handleCategoryChange(original)}
                />
                {translated}
              </Label>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <TextInput
              id="search"
              type="search"
              placeholder={t('shop.searchPlaceholder')}
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.filter(product => {
              if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
                return false;
              }
              return product.name.toLowerCase().includes(searchTerm.toLowerCase());
            }).map((product) => (
              <ProductCards
                key={product.product_id}
                imgSrc={product.image}
                imgAlt={product.name}
                name={product.name}
                price={product.price}
                reviews_count={product.reviews_count}
                product_id={product.product_id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
