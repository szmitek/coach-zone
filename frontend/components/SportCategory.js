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

export default function SportCategories({selectedCategory}) {
    const router = useRouter();
    const [selectedSportCategory, setSelectedSportCategory] = useState(selectedCategory || 'All');
    const [currentPage, setCurrentPage] = useState(1);

    const { data, error, loading } = useQuery(ALL_SPORT_CATEGORIES_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleSportCategoryChange = async (event) => {
        setSelectedSportCategory(event.target.value);
        setCurrentPage(1);
        await router.push({
            pathname: '/exercises',
            query: {
                sportCategory: event.target.value === 'All' ? undefined : event.target.value
            },
        });
    };


    return (
        <SportCategoryStyles>
            <div>
                <p>
                    Choose sport category:
                    <select value={selectedSportCategory} onChange={handleSportCategoryChange}>
                        <option value="All">All</option>
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
