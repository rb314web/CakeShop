import { useContext, useEffect} from 'react';
import { Context, UserContext } from './context';
import { useNavigate } from "react-router-dom";

import './usersettings.scss'

const UserSettings = () => {

    const [userContext, setUserContext] = useContext<any>(UserContext);

    const navigate = useNavigate();

    useEffect( () => {
        if (!userContext.providerData) navigate("/")

    },[])

    return(
        <div className='usersettings'> 
        <form>
            <label>Imię: </label>

            {!!userContext?.providerData && (   <input disabled value={userContext.providerData[0].displayName}></input> )}


            <label>Nazwisko</label>
            {!!userContext?.providerData && (   <input disabled value={userContext.providerData[0].lastname}></input> )}
            <label>Email:</label>
            {!!userContext?.providerData && (   <input disabled value={userContext.providerData[0].email}></input> )}

        </form>
        </div>
    )
}

export default UserSettings