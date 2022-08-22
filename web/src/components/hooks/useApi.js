import { useState, useRef, useEffect} from 'react';


export function useApi(call, ...args) {
    console.log("hello from useApi")
    const loadingRef = useRef(false)
    const [data, setData] = useState(null);
    useEffect(()=>{
        if(loadingRef.current === false){
            loadingRef.current = true
            call(...args).then(setData).catch(err => {
                console.error(err)
                loadingRef.current = false
            })
        } else if(data && loadingRef.current) {
            loadingRef.current = false
        }
        return ()=> {}
    }, [data, ...args])
    return data
}
