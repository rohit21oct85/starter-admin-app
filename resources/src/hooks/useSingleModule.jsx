import {useParams} from 'react-router-dom'
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext.jsx';
import API_URL from '../helper/APIHelper'

export default function useSingleModule() {
    const params = useParams();
    const module_id = params?.module_id
    const {state } = useContext(AuthContext);
    return useQuery(`single-module-${module_id}`, async () => {
        if(module_id !== undefined){
            const result = await axios.get(`${API_URL}v1/module/view/${module_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            });
            
            return result.data.data; 
        }
        
    });
    
}
