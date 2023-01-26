import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import SportCategoryStyles from "./styles/SportCategoryStyles";

const ALL_SPORT_CATEGORIES_QUERY = gql`
    query ALL_SPORT_CATEGORIES_QUERY {
        allSportCategories {
            id
            name
        }
    }
`;

export default function SportCategories() {
    const router = useRouter();
    const [selectedSportCategory, setSelectedSportCategory] = useState(null);

    const { data, error, loading } = useQuery(ALL_SPORT_CATEGORIES_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleSportCategoryChange = (event) => {
        setSelectedSportCategory(event.target.value);
        router.push({
            pathname: '/exercises',
            query: { page: 1, sportCategory: event.target.value },
        });
    }

    return (
        <SportCategoryStyles>
            <div>
                <p>
                    Choose sport category:
                    <select value={selectedSportCategory} onChange={handleSportCategoryChange}>
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
