import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {authUser} from "../store/slices/AuthSlice";

const useAuth = () => {
    const dispatch = useDispatch();
    const {token, loading, isAuthenticated} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(authUser({token}));
    }, [dispatch]);


    return { isAuthenticated, loading };
};

export default useAuth;