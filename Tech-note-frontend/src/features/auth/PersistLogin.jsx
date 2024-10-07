import { Outlet, Link  } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useRefreshMutation } from "./authAPISlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import  PulseLoader  from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";


const PersistLogin = () => {
    useTitle("Persist Login");
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError, 
        error
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                
                try { 
                    await refresh();
                  
                    setTrueSuccess(true);
                } catch (err) {
                    console.error(err, ' shahrokh -> Persist login');
                }
            }
            if (!token && persist) verifyRefreshToken();
        }
        return () => effectRan.current = true;
        // eslint-disable-next-line
    }, []);

    let content;

    if (!persist) {   
        content = <Outlet />
    } else if (isLoading) {
        content = <PulseLoader color={'#FFF'} />
    } else if (isError) {
        content = (
            <p className="errmsg">
                {`${error?.data?.message} - `}
                <Link to='/login'> Please login again </Link>
            </p>
        )
    } else if (isSuccess && trueSuccess) {
        
        content = <Outlet />
    } else if (token && isUninitialized) {
        content = <Outlet /> 
    }


    return content;
}

export default PersistLogin;