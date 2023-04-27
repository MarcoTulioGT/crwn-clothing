import { createContext, useState, useEffect } from 'react';

import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

//import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap : {},  
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setcategoriesMap ] = useState([]);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments({});
            setcategoriesMap(categoriesMap);
        };

        getCategoriesMap();

    }, []);

   /* useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    }, []);*/

    const value = {categoriesMap};
    return (
        <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>
    )
}