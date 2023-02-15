import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import SportCategoryStyles from "./styles/SportCategoryStyles";

// define a GraphQL query to fetch all sport categories
const ALL_SPORT_CATEGORIES_QUERY = gql`
    query ALL_SPORT_CATEGORIES_QUERY {
        allSportCategories {
            id
            name
        }
    }
`;

export default function SportCategories({selectedCategory}) {
    // use the `useRouter` hook to access the router object
    const router = useRouter();

    // use the `useState` hook to initialize the `selectedSportCategory` and `currentPage` state variables
    const [selectedSportCategory, setSelectedSportCategory] = useState(selectedCategory || 'All');
    const [currentPage, setCurrentPage] = useState(1);

    // use the `useQuery` hook to execute the `ALL_SPORT_CATEGORIES_QUERY` and fetch the data
    const { data, error, loading } = useQuery(ALL_SPORT_CATEGORIES_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // define a function to handle sport category changes
    const handleSportCategoryChange = async (event) => {
        // update the `selectedSportCategory` state variable with the selected value
        setSelectedSportCategory(event.target.value);
        // reset the `currentPage` state variable to 1
        setCurrentPage(1);
        // use the router object to update the URL with the selected sport category
        await router.push({
            pathname: '/exercises',
            query: {
                sportCategory: event.target.value === 'All' ? undefined : event.target.value
            },
        });
    };

    // render the `SportCategoryStyles` component and a select element with all the available sport categories
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
