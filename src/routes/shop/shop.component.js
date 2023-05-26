import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/category/categories.action";

export default function Shop() {
const dispatch = useDispatch();
  useEffect(() => {
    
     
      dispatch(fetchCategoriesStart());
  }, []);

      return (
                  <Routes>
                        <Route index element={<CategoriesPreview />} />
                        <Route path=":category" element={<Category />} />
                  </Routes>
      );
}
