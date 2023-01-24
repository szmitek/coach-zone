import { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import SportCategoryStyles from "./styles/SportCategoryStyles";

const CATEGORIES_QUERY = gql`
    query CATEGORIES_QUERY {
        allSportCategories {
            id
            name
        }
    }
`;

export default function SportCategories({ selectedCategory }) {
    const [category, setCategory] = useState(selectedCategory);
    const { data, loading, error } = useQuery(CATEGORIES_QUERY);

    if (loading) return 'Loading...';
    if (error) return <p>Error: {error.message}</p>;

    return (
        <SportCategoryStyles>
            <div>
                <p>
                    Choose sport category:
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">All</option>
                    {data.allSportCategories.map(category => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                </p>
            </div>
        </SportCategoryStyles>
    );
}
