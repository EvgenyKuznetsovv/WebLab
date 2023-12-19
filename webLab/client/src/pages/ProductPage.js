import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userApi } from "../components/Api";
import "../css/ProductPage.css"

export default function ProductPage() {
    const {id} = useParams();
    const [product, setProduct] = useState({})
    const [nameBrand, setBrand] = useState("")
    const [nameType, setType] = useState("")


   useEffect(() => {
			const effect = async () => {
				const { data: newProduct } = await userApi.getProductById(id)
				const [brands, types] = await Promise.all([
					userApi.getAllBrands(),
					userApi.getAllTypes(),
				])

				const brand = brands.data.find(({ id }) => newProduct.brandId === id)
				const type = types.data.find(({ id }) => newProduct.typeId === id)
				setType(type.name)
				setBrand(brand.name)
				setProduct(newProduct)
			}
			effect().catch(console.error)
		}, [id])
    return (
			<div>
				<h2>{product.name}</h2>
				<img src={'http://localhost:5000/' + product.img} alt={product.name} className="Image-About-Product" />
                <div className="Info-about-product">
				    <p>
					    <b>Описание: </b>
					    {product.description}
				    </p>
				    <p>
					    <b>Цена: </b> {product.price}
				    </p>
				    <p>
					    <b>Бренд: </b> {nameBrand}
				    </p>
				    <p>
					    <b>Категория: </b> {nameType}
				    </p>
                </div>
			</div>
		)
}