import { useRouter } from 'next/dist/client/router';
import Exercises from '../../components/Exercises';
import Pagination from '../../components/Pagination';
import SportCategories from '../../components/SportCategory'

export default function OrderPage() {
    const { query } = useRouter();
    const page = parseInt(query.page) || 1;
    const sportCategory = query.sportCategory || 'All';
    console.log(sportCategory, page)
    return (
        <div>
            <Pagination page={page || 1} sportCategory={sportCategory} />
            <SportCategories selectedCategory={sportCategory} />
            <Exercises page={page || 1} sportCategory={sportCategory} />
            <Pagination page={page || 1} sportCategory={sportCategory} />
        </div>
    );
}
