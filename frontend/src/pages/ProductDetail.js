import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api.products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>

    return (
        <div>
            <img src={product.imageUrl} alt={product.name} />
            <h1>[product.name]</h1>
            <p>{product.description}</p>
            <p>&{product.price}</p>
        </div>
    );
};

export default ProductDetail;