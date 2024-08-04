import { useState, useMemo } from "react";
import { Label, Checkbox, TextInput} from "flowbite-react";
import cartLogo from "../../assets/cartLogo.jpg";
import ProductCards from "../components/products/ProductCards";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const products = [
    {
      id: 1,
      name: "Manzanas Gala",
      price: 2.99,
      image: cartLogo,
      category: "Frutas",
    },
    {
      id: 2,
      name: "Leche Entera",
      price: 3.5,
      image: cartLogo,
      category: "Lácteos",
    },
  ];
  
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, selectedCategories]);
  
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const categories = [...new Set(products.map((product) => product.category))];
  
  return (
    <div className="grid md:grid-cols-[240px_1fr] gap-6 p-4 md:p-6">
      <div className="bg-muted/40 rounded-lg p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4">Categorías</h2>
        <div className="grid gap-2">
          {categories.map((category) => (
            <Label key={category} className="flex items-center gap-2 font-normal">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </Label>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-4">
        <TextInput id="search" type="search" placeholder="Buscar productos..." required />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCards
              key={product.id}
              imgSrc={product.image}
              imgAlt={product.name}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
